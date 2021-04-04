import React, { useCallback, useEffect, useState } from 'react';
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-bojack.css";
import Loader from '../components/Loader';
import Typed from 'react-typed';
import NavBar from "../components/NavBar"
import { 
    useParams, Redirect
} from 'react-router-dom';
import {Row, Jumbotron, Col, Container} from 'reactstrap';
import ProjectCard from '../components/ProjectCard';
import { GiPin } from 'react-icons/gi';
import { IoMdPerson, IoMdSchool } from 'react-icons/io';

const content = (data) => {
    return (
        <Container>
            <Row>
                <Col>
                    <Jumbotron className="m-4">
                        <h1 className="display-3">My Projects</h1>
                        <p className="lead">You'll find some of the project I made!</p>
                        <hr className="my-2" />
                        <p>As you guessed it, I love to develop stuffs and soooo I do have plenty of them</p>
                        <p>They are listed here under three main Topics: Pinned(I really like them), Personal and School</p>
                    </Jumbotron>
                </Col>
            </Row>
            <Row >
                <h1 className="display-3"><GiPin/> Pinned</h1>
                <Row>{data["romind-pinned"]}</Row>
            </Row>
            <Row>
                <h1 className="display-3"><IoMdPerson/> Personal</h1>
                <Row>{data["romind-personal"]}</Row>
            </Row>
            <Row>
                <h1 className="display-3"><IoMdSchool/> School</h1>
                <Row>{data["romind-school"]}</Row>
            </Row>
        </Container>
    );
}


const ProjectsList = () => {
    const url = "/api/projects"
    const [isFetching, setIsFetching] = useState(true);
    const [message, setMessage] = useState({});

    const fetchData = useCallback(async () => {
      fetch(url)
        .then(async response => {
          if (!response.ok) {
            throw new Error(`status ${response.status}`);
          }
          return response.json();
        })
        .then(json => {
            let val = {};
            Object.keys(json).forEach(key =>{
                val[key] = [];
                json[key].forEach(elem => {
                    val[key].push(<ProjectCard {...elem} key={elem.name}/>)
                })
            })

            setMessage(val);
            setIsFetching(false);
        }).catch(e => {
          setMessage(`API call failed: ${e}`);
          setIsFetching(false);
        })
    }, [url]);
  
    useEffect(() => {
      fetchData();
    }, [fetchData]);

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
                    `[ user@Romind ^200 &gt;&gt; ^200 $Projects ^200 &gt;&gt; All ]`
                  ]}
                  smartBackspace={true}
                  typeSpeed={30}
                  showCursor={true}
              />
          </h1>

          <div className="d-md-flex flex-row flex-wrap justify-content-around">
            {isFetching
              ? <div>'Fetching Data from API'  <Loader/></div> 
              : ((message?.length === 0) ? <h1><br/>No Articles Available Yet!</h1> : content(message))}
          </div>
        </div>

    );

    
}

export default ProjectsList;