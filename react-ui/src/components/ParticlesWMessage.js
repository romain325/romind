import { Container } from "reactstrap";
import Particles from "react-tsparticles";

import React, { useCallback, useEffect, useState } from 'react';
import { 
    useParams, useHistory
} from 'react-router-dom';

function ParticlesBackWMessage(props){

  const [Back, setBack] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState(`/api/particlesConfig`);

  const history = useHistory();
  const redirectTo404 = () => {
    history.push('/404');
  };
  const fetchData = useCallback(() => {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`status ${response.status}`);
        }
        return response.json();
      })
      .then(json => {
          console.log(json);
          if(json.result == "Error"){
            throw 'What are you doing here ?';
          }
          setBack(json.content);        
          setIsFetching(false);
      }).catch(e => {
        console.log(e);
        setBack(`API call failed: ${e}`);
        setIsFetching(false);
        redirectTo404();
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);

    return(
        <Container>
        <Particles options={Back} style={
          {
            position: 'fixed', 
            width: '100%', 
            height: '100%',
            top: '0',
            left: '0',
            margin: '0',
            zIndex: '0'
          }
        }/>
        <div className="content-center brand" style={
          {
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginLeft: '-113px',
            marginTop: '-48px',
            width: '226px',
            height: '96px'
          }
        }>
          <h1 className="h1-seo">[{props.title}.]</h1>
          <h4 className="d-none d-sm-block">
            {props.message}
          </h4>
        </div>
      </Container>
    )
}

export default ParticlesBackWMessage;
