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
    return res.json(await gh_data.getProjects(allTopics));
}

async function getFromTopics(req, res){
    if(req.body.topics === undefined){
        res.status(400);
        return res.send("Invalid Request");
    }
    return res.json(await gh_data.getProjects(req.body.topics));
}

async function getOneTopic(req,res){
    return res.json(await gh_data.getProjects([req.params.topic]));
}

module.exports = { getAll, getFromTopics, getOneTopic };