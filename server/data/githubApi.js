const https = require('http');
const axios = require('axios')
const holder = require('./holder.json');

async function getFolder(path){   
    const res = await axios.get("https://" + holder.github_endpoint + "/repos/" + holder.user + "/" + holder.repo + "/contents" + path);
    
    const result = [];
    for(let e in res.data) {
        result.push(res.data[e].name);
    }

    return result;
}

async function getFile(path){
    const res = await axios.get("https://" + holder.github_endpoint + "/repos/" + holder.user + "/" + holder.repo + "/contents" + path);

    return Buffer.from(res.data.content, 'base64').toString("utf8");
}

async function mdToHtml(text){
    const res = await axios.post("https://" + holder.github_endpoint + "/markdown", {
        mode: "markdown",
        text: text
    })
    return res.data;
}

module.exports = {
    getFolder,
    getFile,
    mdToHtml
}