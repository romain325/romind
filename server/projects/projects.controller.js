const path = require("path");
const fs = require("fs");
const gh_data = require("../data/github/githubApi");
const allTopics = require("./allTopics.json");

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

async function getAll(req, res){
    const test = await gh_data.getProjects(allTopics);
    console.log(test);
    return res.json(test);
}

async function getFromTopics(req, res){

}

module.exports = { getAll, getFromTopics };