import React, { useCallback, useEffect, useState } from 'react';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-bojack.css";
import Loader from '../components/Loader';
import Typed from 'react-typed';
import NavBar from "../components/NavBar"
import { 
    useParams, Redirect
} from 'react-router-dom';



function TopicMenu(){
    let  topicId  = useParams();
    const IsMenu = (topicId.type == undefined);
    const [Articles, setArticles] = useState(null);
    const [message, setMessage] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [url, setUrl] = useState(`/api/articles${IsMenu ? '' : '/' + topicId.type}`);

    let searchBarVal = "";

    const fetchData = useCallback(() => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`status ${response.status}`);
          }
          return response.json();
        })
        .then(json => {
            let val = [];
            if(json.result == "Error"){
              throw 'What are you doing here ?';
            }
            json.content.forEach((e,n) => {
                let text = e.replace(/_|\.md|\$/gi,' ');
                let link = `/article/${IsMenu ? '' : topicId.type + '/'}${e}`;
                val.push(
                  <div key={e}>
                      <AwesomeButton 
                          size="large"
                          type="primary"
                          style={{
                            margin: "20px"
                          }}
                          href={link}
                          >
                              {text}
                      </AwesomeButton>
                  </div>);
            });
            setMessage(val);
            setArticles(val);        
            setIsFetching(false);
        }).catch(e => {
          setMessage(`API call failed: ${e}`);
          setIsFetching(false);
        })
    }, [url]);
  
    useEffect(() => {
      setIsFetching(true);
      fetchData();
    }, [fetchData]);


    function handleChange(arg) {
      let val = arg.target.value;
      let table = [];
      Articles.forEach(elem => {
        if(elem.key.includes(val)){
          table.push(elem);
        }
      });
      setMessage(table)
    }

    if(!Array.isArray(message) && message != null){
      return (<Redirect to={"/404"}/>)
    }
    console.log(message?.length);
    return(
        <div> 
          <NavBar />
          <h1 style={{
            fontSize : "3em",
            fontWeight : "bold",
            margin: "20px",
            marginTop: "100px"
          }}>
              <Typed 
                  strings={[
                    `[ user@Romind ^200 &gt;&gt; ^200 $Articles ^200 ${IsMenu ? ">> ?" : ">> "+topicId.type} ]`
                  ]}
                  smartBackspace={true}
                  typeSpeed={30}
                  showCursor={true}
              />
          </h1>
          <hr className="solid"/>
          <label className="d-flex justify-content-around align-items-center"><strong>Recherche: </strong><input type="text" id="searchBar" onChange={handleChange} /></label>
          <hr className="solidInvert"/>

          <div className="d-md-flex flex-row flex-wrap justify-content-around">
            {isFetching
              ? <div>'Fetching Data from API'  <Loader/></div> 
              : ((message?.length == 0) ? <h1><br/>No Articles Available Yet!</h1> : message)}
          </div>
        </div>

    );

    
}

export default TopicMenu;