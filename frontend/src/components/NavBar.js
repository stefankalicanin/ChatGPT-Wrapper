import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TokenService } from "../services/TokenService";
import { AuthenticationService } from "../services/AuthenticationService";

const NavBar = () => {
  const token=TokenService.getToken()
  const decodedToken=TokenService.decodeToken(token)
  const mode = localStorage.getItem('chakra-ui-color-mode')
  return (
    <Navbar class="navbar navbar-light" style={{backgroundColor: '#e3f2fd'}}>
      {!token && <Navbar.Brand as={Link} to="/">
        ChatGPT Wrapper
      </Navbar.Brand>}
      {token && <h3 style={{paddingLeft: '20px', paddingRight: '30px'}}>Welcome, {decodedToken.username}</h3>}
      {token && <Button className="btn btn-danger" onClick={() => AuthenticationService.logout()}>Log out</Button>}
    
    </Navbar>
  );
};

export default NavBar;
