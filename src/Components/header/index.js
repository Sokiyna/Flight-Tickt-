import React from 'react';
import {Navbar,Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom';
function Header() {
  return (

    <>
  <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="/">Flight</Navbar.Brand>
    <Nav className="mr-auto">
      <Nav.Link href="/">Home</Nav.Link>
      <Nav.Link href="/admin">Office</Nav.Link>
 
    </Nav>
    
  </Navbar>
</>

  );
}
export default Header;
