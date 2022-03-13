import React from "react";
import { Navbar, Nav } from "react-bootstrap";

export default function Header() {
  return (
    <div>
      <>
        <Navbar bg="dark" variant="info">
          <Navbar.Brand
            href="/"
            className="text-white"
            style={{ marginLeft: "20px" }}
          >
            Ad campaigns
          </Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Navbar>
      </>
    </div>
  );
}