const https = require('http');
const axios = require('axios')
const holder = require('./holder.json');
require('dotenv').config()

const authedHeader = {
    headers: {
        "Authorization": "Basic " + process.env.GITHUB_TOKEN
    }
}

async function getFolder(path){   
    const res = await axios.get("https://" + holder.github_endpoint + "/repos/" + holder.user + "/" + holder.repo + "/contents" + path, authedHeader)

    const result = [];
    for(let e in res.data) {
        result.push(res.data[e].name);
    }

    return result;
}

async function getFile(path){
    const res = await axios.get("https://" + holder.github_endpoint + "/repos/" + holder.user + "/" + holder.repo + "/contents" + path, authedHeader);
    if(res.data.result) return err;
    return Buffer.from(res.data.content, 'base64').toString("utf8");
}

async function mdToHtml(text){
    const res = await axios.post("https://" + holder.github_endpoint + "/markdown", {
        mode: "markdown",
        text: text
    }, authedHeader);
    return res.data;
}

module.exports = {
    getFolder,
    getFile,
    mdToHtml
}