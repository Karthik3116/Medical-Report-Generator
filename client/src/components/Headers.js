import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

const Headers = () => {
  return (
    <>
      <Navbar style={{ backgroundColor: 'lightblue' }} variant="light">
        <Container>
          <NavLink to="/" className="navbar-brand custom-title">Medical Image Captioning</NavLink>
          <Nav className="">
            <NavLink to="/register" className="mt-3 mx-2 text-light text-decoration-none"></NavLink>
          </Nav>
        </Container>
      </Navbar>
      <style jsx>{`
        .custom-title {
          color: green !important;
          font-size: 2rem;
        }
      `}</style>
    </>
  )
}

export default Headers;
