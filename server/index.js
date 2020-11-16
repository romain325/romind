const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const isDev = process.env.NODE_ENV !== 'production';
const PORT = process.env.PORT || 5000;

const jsonParser = bodyParser.json();
const txtParser = bodyParser.text();

// Multi-process to utilize all CPU cores.
if (!isDev && cluster.isMaster) {
  console.error(`Node cluster master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.error(`Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`);
  });

} else {
  const app = express();

  // Priority serve any static files.
  app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

  // Answer API requests.
  app.get('/api', function (req, res) {
    res.set('Content-Type', 'application/json');
    res.send('{"message":"Hello from the custom server!"}');
  });

  app.get('/api/articles/*/*', (req, res) =>{
    res.set('Content-Type', 'application/json');
    var link = req.headers.referer.split('/').slice(-2);
    var folder = link[0], file = link[1];

    const contentPath = path.join(__dirname, 'data/markdown/'+folder+'/'+file);
    fs.readFile(contentPath, 'utf8', (err, data)=>{
      const returnObj = {result:"Success", content:data};
      if(err != null) {
        const returnObj = {result:"Error", content:"Unknown File"};
        res.send(returnObj);
      }
      else{
        res.send(returnObj);
      }
    });

  });
  
  app.get('/api/articles/*', (req, res) => {
    res.set('Content-Type', 'application/json');
    var ext = (req.headers.referer.split('/').slice(-1)[0]);
    const contentPath = path.join(__dirname, 'data/markdown/'+ext);
    const returnObj = {
      result : 'Success',
      fileType: 'markdown',
      type: ext,
      content: []
    };
    fs.readdir(contentPath, (err, files) => {
      if(err){
        res.send(JSON.stringify({
          result: 'Error',
          type :'error',
          message : err.message
        }));
        return console.log('Error Scanning directory\n' + err.message);
      }

      returnObj.content = files;

      res.send(JSON.stringify(returnObj));
    });
  });


  app.get('/api/articles', (req, res) => {
    res.set('Content-Type', 'application/json');
    const contentPath = path.join(__dirname, 'data/markdown');
    const returnObj = {
      result : 'Success',
      fileType: 'folder',
      type: 'data',
      content: []
    };
    fs.readdir(contentPath, (err, files) => {
      if(err){
        res.send(JSON.stringify({
          result: 'Error',
          type :'error',
          message : err.message
        }));
        return console.log('Error Scanning directory\n' + err.message);
      }
      returnObj.content = files;
      res.send(JSON.stringify(returnObj));
    });
  });

  app.get('/api/particlesConfig', (req, res) => {
    res.set('Content-Type', 'application/json');
    const contentPath = path.join(__dirname, 'data/particles');
    const returnObj = {
      result : 'Success',
      content : ''
    };
    fs.readdir(contentPath, (err, files) => {
      if(err){
        res.send(JSON.stringify({
          result: 'Error',
          content : err.message
        }));
        return console.log('Error Scanning directory\n' + err.message);
      }
      fs.readFile(`${contentPath}/${files[Math.floor(Math.random()*files.length)]}`, 'utf8', (err, content) => {
        if(err){
          res.send(JSON.stringify({
            result: 'Error',
            content : err.message
          }));
          return console.log('Error Scanning directory\n' + err.message);
        }
        returnObj.content = JSON.parse(content);
        res.send(JSON.stringify(returnObj));
      }); 

    });
  });

  app.get('/api/noodeljs/profile', (req, res) =>{
    res.set('Content-Type', 'application/json');

    const contentPath = path.join(__dirname, 'data/json/noodelData.json');
    fs.readFile(contentPath, 'utf8', (err, data)=>{
      const returnObj = {result:"Success", content:data};
      if(err != null) {
        const returnObj = {result:"Error", content:"Unknown File"};
        res.send(returnObj);
      }
      else{
        res.send(returnObj);
      }
    });

  });


  function writeToFile(path, content){
    fs.writeFile(path, content, (err) => {
      if (err) throw err;
      console.log("File Written to "+ path);
    });
  }

  app.post('/api/articles/*/*', txtParser,(req, res) => {
    const header=req.headers['authorization']||'',        // get the header
        token=header.split(/\s+/).pop()||'',            // and the encoded auth token
        auth=Buffer.from(token, 'base64').toString(),    // convert from base64
        parts=auth.split(/:/),                          // split on colon
        username=parts[0],
        password=parts[1];

    try{
      const hashed = require('crypto').createHash('sha512').update(password).digest('hex');
      if(process.env.ARTICLE_PUBLISHER_NAME != username || process.env.ARTICLE_PUBLISHER_PASSWORD != hashed){
        throw "Fuck YOU";
      }

      const link = req.url.split('/').slice(-2);
      const folder = link[0], file = link[1];
      const contentPath = path.join(__dirname, 'data/markdown/'+folder+'/'+file);

      fs.access(path.join(__dirname, 'data/markdown/'+folder), fs.constants.F_OK, (err) => {
        if(err) {
          fs.mkdir(path.join(__dirname, 'data/markdown/'+folder), (err) => {
            if (err) throw err
            else {
              writeToFile(contentPath, req.body);
              res.sendStatus(200);
            }
          });
        }else{
          writeToFile(contentPath, req.body);
          res.sendStatus(200);
        }
      });
    }catch(err){
      console.log(err);
      res.sendStatus(501);
    }
  });



  // All remaining requests return the React app, so it can handle routing.
  app.get('*', function(request, response) {
    response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
  });

  app.listen(PORT, function () {
    console.error(`Node ${isDev ? 'dev server' : 'cluster worker '+process.pid}: listening on port ${PORT}`);
  });
}
