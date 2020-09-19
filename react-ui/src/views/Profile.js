import React from "react";
import SkillSet from "react-skillset";
import NavBar from '../components/NavBar';
import ParticlesBackWMessage from '../components/ParticlesWMessage';
import CsvFile from '../assets/csv/mySkills.csv';

const Profile = () => {

  return (
    <div>
      <NavBar />
      <div>
        <ParticlesBackWMessage title="Romain OLIVIER" message="Hello There, Here is my personal profile with useless infos!
        That means this is not the professional version.   
        But still cool !! (i hope)"/>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center mt-md">
        <h1>Skills' Graph</h1>
        <h3 className="font-weight-bold text-light">Use it too via <a href="https://github.com/romain325/ReactSkillSet">GITHUB</a> and <a href="https://www.npmjs.com/package/react-skillset">NPM</a></h3>
        <SkillSet csv={CsvFile} color={"Set1"} />
      </div>
    </div>
  );
};

export default Profile;