const path = require("path");
const fs = require("fs");

if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
    console.log("load env Var");
}

/*** UTILS ***/
function writeToFile(path, content){
    fs.writeFile(path, content, (err) => {
        if (err) throw err;
        console.log("File Written to "+ path);
    });
}


function listFolder(req,res){
    const returnObj = {
        result : 'Success',
        fileType: 'folder',
        type: 'data',
        content: []
    };
    fs.readdir( path.join(__dirname, '../data/markdown'), (err, files) => {
        if(err){
            return res.json(JSON.stringify({
                result: 'Error',
                type :'error',
                message : err.message
            }));
        }
        returnObj.content = files;
        return res.json(JSON.stringify(returnObj));
    });
}

function listFiles(req,res){
    const ext = req.params.folder;// (req.headers.referer.split('/').slice(-1)[0]);
    const returnObj = {
        result : 'Success',
        fileType: 'markdown',
        type: ext,
        content: []
    };
    fs.readdir(path.join(__dirname, '../data/markdown/' + ext), (err, files) => {
        if(err){
            return res.json(JSON.stringify({
                result: 'Error',
                type :'error',
                message : err.message
            }));
        }

        returnObj.content = files;
        return res.json(JSON.stringify(returnObj));
    });
}

function getFile(req,res){
    const folder = req.params.folder, file = req.params.file;

    fs.readFile(path.join(__dirname, '../data/markdown/'+folder+'/'+file), 'utf8', (err, data)=>{
        let returnObj = {result:"Success", content:data};
        if(err != null) {
            returnObj = {result: "Error", content: "Unknown File"};
        }
        return res.json(returnObj);
    });

}

function addFile(req,res){
    const header= req.headers['authorization']||'',        // get the header
        token=header.split(/\s+/).pop()||'',            // and the encoded auth token
        auth=Buffer.from(token, 'base64').toString(),    // convert from base64
        parts=auth.split(/:/),                          // split on colon
        username=parts[0],
        password=parts[1];

    try{
        const hashed = require('crypto').createHash('sha512').update(password).digest('hex');
        if(process.env.ARTICLE_PUBLISHER_NAME !== username || process.env.ARTICLE_PUBLISHER_PASSWORD !== hashed){
            throw "Fuck you";
        }

        const folder = req.params.folder, file = req.params.file;

        fs.access(path.join(__dirname, '../data/markdown/'+folder), fs.constants.F_OK, (err) => {
            if(err) {
                fs.mkdir(path.join(__dirname, 'data/markdown/'+folder), (err) => {
                    if (err) throw err
                });
            }
        });

        writeToFile(path.join(__dirname, '../data/markdown/'+folder+'/'+file), req.body);
        res.sendStatus(200);
    }catch(err){
        console.log(err);
        res.sendStatus(401);
    }

}



module.exports = { listFolder, listFiles, getFile, addFile };