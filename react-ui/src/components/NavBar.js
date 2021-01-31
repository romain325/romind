import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/themes/theme-bojack.css";


import { GoMarkGithub } from 'react-icons/go';
import { FaInstagram } from 'react-icons/fa';
import { FaTwitter } from 'react-icons/fa';
import { GiBookAura } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai'
import { ImProfile } from 'react-icons/im';
import { GiAllSeeingEye } from 'react-icons/gi'

class ComponentsNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseOpen: false,
      color: "navbar-transparent",
      modal: false
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.changeColor);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.changeColor);
  }
  changeColor = () => {
    if (
      document.documentElement.scrollTop > 99 ||
      document.body.scrollTop > 99
    ) {
      this.setState({
        color: "bg-info"
      });
    } else if (
      document.documentElement.scrollTop < 100 ||
      document.body.scrollTop < 100
    ) {
      this.setState({
        color: "navbar-transparent"
      });
    }
  };
  toggleCollapse = () => {
    document.documentElement.classList.toggle("nav-open");
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  onCollapseExiting = () => {
    this.setState({
      collapseOut: "collapsing-out"
    });
  };
  onCollapseExited = () => {
    this.setState({
      collapseOut: ""
    });
  };

  toggleModal = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  render() {
    return (
      <Navbar
        className={"fixed-top " + this.state.color}
        color-on-scroll="100"
        expand="lg"
      >
        <Container>
          <div className="navbar-translate">
            <NavbarBrand
              to="/"
              tag={Link}
              id="navbar-brand"
            >
              <span>[romind.]• </span>
              basic website
            </NavbarBrand>
            <UncontrolledTooltip placement="bottom" target="navbar-brand">
              Created by Romain Olivier
            </UncontrolledTooltip>
            <button
              aria-expanded={this.state.collapseOpen}
              className="navbar-toggler navbar-toggler"
              onClick={this.toggleCollapse}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <Collapse
            className={"justify-content-end " + this.state.collapseOut}
            navbar
            isOpen={this.state.collapseOpen}
            onExiting={this.onCollapseExiting}
            onExited={this.onCollapseExited}
          >
            <div className="navbar-collapse-header">
              <Row>
                <Col className="collapse-close text-right" xs="6">
                  <button
                    aria-expanded={this.state.collapseOpen}
                    className="navbar-toggler"
                    onClick={this.toggleCollapse}
                  >
                    <i className="tim-icons icon-simple-remove" />
                  </button>
                </Col>
              </Row>
            </div>
            <Nav navbar>
              <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  href="https://twitter.com/the_weird_weeb"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Follow me on Twitter"
                >
                  <FaTwitter />
                  <p className="d-lg-none d-xl-none">Twitter</p>
                </NavLink>
              </NavItem>
              <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  href="https://www.instagram.com/rooomaaaiiiiin"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Follow us on Instagram"
                >
                  <FaInstagram />
                  <p className="d-lg-none d-xl-none">Instagram</p>
                </NavLink>
              </NavItem>
              <NavItem className="p-0">
                <NavLink
                  data-placement="bottom"
                  href="https://www.github.com/romain325"
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Follow me on GitHub"
                >
                  <GoMarkGithub />
                  <p className="d-lg-none d-xl-none">Github</p>
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  data-toggle="dropdown"
                  href="#"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i className="fa fa-cogs d-lg-none d-xl-none" />
                  DropDown
                </DropdownToggle>
                <DropdownMenu className="dropdown-with-icons">
                  <DropdownItem tag={Link} to="/">
                    <AiFillHome />  Home
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/article">
                    <GiBookAura />  Articles
                  </DropdownItem>
                  <DropdownItem /*tag={Link} to="/pdf/cv"*/ onClick={this.toggleModal}>
                    <ImProfile />  Resume/CV
                    <Modal isOpen={this.state.modal} toggle={this.toggleModal}>
                      <ModalHeader toggle={this.toggleModal}><h1>Which Resume/CV do you want?</h1></ModalHeader>
                      <ModalBody className="d-flex flex-column align-items-center justify-content-center">
                        <Button tag={Link} to="/pdf/cv_long_en">Long CV/Resume(English)</Button>
                        <Button tag={Link} to="/pdf/cv_fr">Long CV/Resume(French)</Button>
                        <Button tag={Link} to="/pdf/cv_en">Basic Short Resume(English)</Button>
                        <Button tag={Link} to="https://romain-olivier.welovedevs.com/">Interactive WeLoveDevs page</Button>
                      </ModalBody>
                      <ModalFooter>
                        <Button onClick={this.toggleModal}>None Of Them</Button>
                      </ModalFooter>
                    </Modal>
                  </DropdownItem>
                  <DropdownItem tag={Link} to="/ThatsMe">
                    <GiAllSeeingEye />  More About Me !
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}


export default ComponentsNavbar;
