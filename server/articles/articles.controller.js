const path = require("path");
const fs = require("fs");
const gh_data = require("../data/github/githubApi");

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

module.exports = { listFolder, listFiles, getFile };