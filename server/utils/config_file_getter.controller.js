const fs = require("fs");
const path = require("path");
const gh_data = require("../data/github/githubApi");

async function getParticlesConfig(req,res){
    const files = await gh_data.getFolder("/particles").catch(err => {return err});
    const data = JSON.parse(await gh_data.getFile("/particles/" + files[Math.floor(Math.random() * files.length)]).catch(err => { return err }));

    return res.json({
        result: 'Success',
        content: data
    });
}

async function getNoodleProfile(req,res){
    const data = JSON.parse(await gh_data.getFile("/json/noodelData.json").catch(err => {return err} ));
    return res.json({result:"Success", content:data});
}

module.exports = {getNoodleProfile, getParticlesConfig};