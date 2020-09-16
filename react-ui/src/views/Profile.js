import React from "react";
import NavBar from '../components/NavBar';
import ParticlesBackWMessage from '../components/ParticlesWMessage';

const Profile = () => {

  return (
    <div>
      <NavBar />
      <ParticlesBackWMessage title="Romain OLIVIER" message="Hello There, Here is my personal profile with useless infos!
      That means this is not the professional version.   
      But still cool !! (i hope)"/>
    </div>
  );
};

export default Profile;