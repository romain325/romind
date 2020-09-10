import React from "react";
import { Container } from "reactstrap";
import Particles from "react-tsparticles";
import PartConfig from "../../assets/json/headerPartConfig.json"
import ReactMarkdown from "react-markdown";
import NavBar from "../NavBar"

class MarkdownRenderer extends React.Component {

    constructor(props){
        super();
        console.log(props);
        this.input = props.props.md;
    }
    

  render() {
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
            <ReactMarkdown source={this.input}/>
        </Container>
      </div>
    );
  }
}

export default MarkdownRenderer;