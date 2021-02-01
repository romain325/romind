import { Container } from "reactstrap";
import Particles from "react-tsparticles";
import PartConfig from "../../assets/json/headerPartConfig.json"
import ReactMarkdownWithHtml from "react-markdown/with-html";
import { remarkGfm } from "remark-gfm"
import React, { useCallback, useEffect, useState } from 'react';
import NavBar from "../../components/NavBar"
import { 
    useParams, useHistory
} from 'react-router-dom';

function mdImage(props){
    return <img {...props} style={{maxWidth: '100%'}} />
}

function MarkdownRenderer(){

  let  topicId  = useParams();
  const [Article, setArticle] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [url, setUrl] = useState(`/api/articles/${topicId.type}/${topicId.id}`);

  let searchBarVal = "";
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
          if(json.result == "Error"){
            throw 'What are you doing here ?';
          }
          console.log(json.content)
          setArticle(json.content);        
          setIsFetching(false);
      }).catch(e => {
        setArticle(`API call failed: ${e}`);
        setIsFetching(false);
        redirectTo404();
      })
  }, [url]);

  useEffect(() => {
    setIsFetching(true);
    fetchData();
  }, [fetchData]);


  return (
      <div>
        <NavBar />

        <Particles options={PartConfig} style={{
            position: "absolute",
            marginTop: "-10%",
            zIndex: "-99"
        }}/>
        <Container style={{
            background: "#b48ead",
            borderRadius:"15px",
            marginTop: "10%",
            padding: "20px",
            opacity: "0.9",
            zIndex: "99"
        }}>
            <ReactMarkdownWithHtml plugins={[remarkGfm]} children={Article}  renderers={{image: mdImage}} allowDangerousHtml />
        </Container>
      </div>
    );
}

export default MarkdownRenderer;