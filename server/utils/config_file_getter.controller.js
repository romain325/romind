const fs = require("fs");
const path = require("path");

function getParticlesConfig(req,res){
    const contentPath = path.join(__dirname, '../data/particles');
    fs.readdir(contentPath, (err, files) => {
        if(err){
            return res.sendStatus(500);
        }
        fs.readFile(`${contentPath}/${files[Math.floor(Math.random()*files.length)]}`, 'utf8', (err, content) => {
            if(err){
                return res.sendStatus(500);
            }
            return res.json({
                result: 'Success',
                content: JSON.parse(content)
            });
        });
    });
}

function getNoodleProfile(req,res){
    fs.readFile(path.join(__dirname, '../data/json/noodelData.json'), 'utf8', (err, data)=>{
        let returnObj = {result:"Success", content:data};
        if(err) {
            returnObj = {result:"Error", content:"Unknown File"};
        }
        return res.json(returnObj);
    });
}

module.exports = {getNoodleProfile, getParticlesConfig};