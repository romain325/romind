import React, {useState, useUrl, useCallback, useEffect} from "react";
import SkillSet from "react-skillset";
import NavBar from '../components/NavBar';
import ParticlesBackWMessage from '../components/ParticlesWMessage';
import CsvFile from '../assets/csv/mySkills.csv';
import NoodelTree from '../components/NoodelTree';
import Loader from '../components/Loader';

const Profile = () => {
    const [Data, setData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [url, setUrl] = useState(`/api/noodeljs/profile`);

    const fetchData = useCallback(() => {
        fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error(`status ${response.status}`);
            }
            return response.json();
        })
        .then(json => {
            if(json.result == "Error"){
                throw 'What are you doing here ?';
            }
            setData(JSON.parse(json.content));        
            setIsFetching(false);
        }).catch(e => {
            setData(`API call failed: ${e}`);
            setIsFetching(false);
        })
    }, [url]);

    useEffect(() => {
        setIsFetching(true);
        fetchData();
    }, [fetchData]);


  return (
    isFetching ? <Loader /> : (
    <div>
      <NavBar />
      <div>
        <ParticlesBackWMessage title="Romain OLIVIER" message="Hello There, Here is my personal profile with useless infos!
        That means this is not the professional version.   
        But still cool !! (i hope)"/>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center mt-md" style={{height: "700px"}}>
        <h1>Skills' Graph</h1>
        <h3 className="font-weight-bold text-light">Use it too via <a href="https://github.com/romain325/ReactSkillSet">GITHUB</a> and <a href="https://www.npmjs.com/package/react-skillset">NPM</a></h3>
        <SkillSet csv={CsvFile} color={"Set1"} height={500}/>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-center mt-md">
        <h1>Informations</h1>
        <NoodelTree data={Data}/>    
      </div>
    </div>
    )
  );
};

export default Profile;