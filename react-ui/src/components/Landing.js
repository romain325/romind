import React from "react";
import { Container } from "reactstrap";
import Particles from "react-tsparticles";
import PartConfig from "../assets/json/particleConfig.json";
import NavBar from "./NavBar"

class PageHeader extends React.Component {

  render() {
    return (
      <div className="page-header header-filter">
      <NavBar />
        <Container>
          <Particles options={PartConfig} style={
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
            <h1 className="h1-seo">[romind.]</h1>
            <h4 className="d-none d-sm-block">
              New version of my website build with 
              React/NodeJS on Heroku
            </h4>
          </div>
        </Container>
      </div>
    );
  }
}

export default PageHeader;