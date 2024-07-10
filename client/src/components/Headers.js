import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from "react-router-dom";

const Headers = () => {
  return (
    <>
      <Navbar fixed="top" bg="light" variant="light" className="custom-navbar">
        <Container>
          <NavLink to="/" className="navbar-brand custom-title">Medical Image Captioning</NavLink>
          <Nav className="ml-auto">
            <NavLink to="/register" className="nav-link custom-link">Register</NavLink>
            <NavLink to="/test" className="nav-link custom-link">|  Testing</NavLink>
          </Nav>
        </Container>
      </Navbar>
      <style jsx>{`
        .custom-navbar {
          width: 100%;
          padding: 10px 20px;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-sizing: border-box;
          margin: 10px auto; /* Optional: Adds some margin around the navbar */
        }
        .custom-title {
          color: green !important;
          font-size: 2rem;
          font-weight: bold;
        }
        .custom-link {
          color: green !important;
          font-size: 1.2rem;
          font-weight: 500;
        }
      `}</style>
    </>
  );
}

export default Headers;
