const https = require('http');
const axios = require('axios')
const holder = require('../holder.json');
const gh_api_type = require('./ghApiType');
require('dotenv').config()

const authedHeader = {
    headers: {
        "Authorization": "token " + process.env.GITHUB_TOKEN
    }
}

async function getFolder(path){   
    const res = await axios.get(holder.github_endpoint + "/repos/" + holder.user + "/" + holder.repo + "/contents" + path, authedHeader)

    const result = [];
    for(let e in res.data) {
        result.push(res.data[e].name);
    }

    return result;
}

async function getFile(path){
    const res = await axios.get(holder.github_endpoint + "/repos/" + holder.user + "/" + holder.repo + "/contents" + path, authedHeader);
    if(res.data.result) return err;
    return Buffer.from(res.data.content, 'base64').toString("utf8");
}

async function mdToHtml(text){
    const res = await axios.post(holder.github_endpoint + "/markdown", {
        mode: "markdown",
        text: text
    }, authedHeader);
    return res.data;
}

/**
 * 
 * @param {Array} wantedTopics, array of wanted topics 
 */
async function getProjects(wantedTopics){

    const specialHeaders = Object.assign({}, authedHeader);
    specialHeaders.headers["Accept"] = "application/vnd.github.mercy-preview+json";

    let data = await axios.get(
        holder.github_endpoint + "/users/" + holder.user + "/repos", 
        specialHeaders
    ).catch(err => {
        console.log(err);
        return err;
    });

    if(data.status !== 200){
        return data;
    }else{
        data = data["data"];
    }

    const projects = {};
    
    for(let t in wantedTopics){
        projects[wantedTopics[t]] = [];
    }
    
    for(let i in data){
        data[i].topics.filter(v => wantedTopics.includes(v)).forEach(val =>{
            projects[val].push(new gh_api_type.RepoData(data[i]))
        });
    }

    return projects;
}


module.exports = {
    getFolder,
    getFile,
    mdToHtml,
    getProjects
}