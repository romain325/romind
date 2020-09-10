import React, { useCallback, useEffect, useState } from 'react';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-bojack.css";
import Loader from '../components/Loader';


import { 
    useParams
} from 'react-router-dom';

function TopicMenu(){
    let  topicId  = useParams();

    const [Articles, setArticles] = useState(null);
    const [message, setMessage] = useState(null);
    const [isFetching, setIsFetching] = useState(false);
    const [url, setUrl] = useState('/api/articles/'+topicId.type);

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
            json.content.forEach((e,n) => {
                let text = e.replace(/_|\.md|\$/gi,' ');
                let link = `/article/${topicId.type}/${e}`;
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

    return(
        <div> 
          <h1 style={{
            fontSize : "3em",
            fontWeight : "bold",
            margin: "20px"
          }}>[ user@Romind &gt;&gt; $Article &gt;&gt; ${topicId.type} ] </h1>

          <label className="d-flex justify-content-center align-items-center"><strong>Recherche: </strong><input type="text" id="searchBar" onChange={handleChange} /></label>

          <div className="d-md-flex flex-row flex-wrap justify-content-around">
            {isFetching
              ? <div>'Fetching Data from API'  <Loader/></div> 
              : message}
          </div>
        </div>

    );

    
}

export default TopicMenu;