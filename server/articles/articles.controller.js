const path = require("path");
const fs = require("fs");
const gh_data = require("../data/githubApi");

if(process.env.NODE_ENV !== 'production'){
    require("dotenv").config();
    console.log(".env Var Loaded");
}

/*** UTILS ***/
function writeToFile(path, content){
    fs.writeFile(path, content, (err) => {
        if (err) throw err;
        console.log("File Written to "+ path);
    });
}


async function listFolder(req,res){
    const returnObj = {
        result : 'Success',
        fileType: 'folder',
        type: 'data',
        content: []
    };

    const folder = await gh_data.getFolder("/articles");
    returnObj.content = folder;

    return res.json(returnObj);
}

async function listFiles(req,res){
    const ext = req.params.folder;// (req.headers.referer.split('/').slice(-1)[0]);
    const returnObj = {
        result : 'Success',
        fileType: 'markdown',
        type: ext,
        content: []
    };

    const files = await gh_data.getFolder("/articles/" + ext);
    returnObj.content = files;

    return res.json(returnObj);
}

async function getFile(req,res){
    const folder = req.params.folder, file = req.params.file;

    let text = await gh_data.getFile("/articles/" + folder + "/" + file);

    text = await gh_data.mdToHtml(text);

    return res.json({result: "Success", content: text});
}

/**
 * DEPRECATED
 */
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