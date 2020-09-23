import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import "./text.css";

export class navbar extends Component {
  render() {
    return (
      <Navbar
        variant="dark"
        bg="dark"
        style={{
          fontFamily: "Oswald",
          backgroundColor: "transparent",
        }
        }
      >
        <Navbar.Brand>Greasing the Groove </Navbar.Brand>
        <Navbar.Brand href="/"> About</Navbar.Brand>
      </Navbar >
    );
  }
}

export default navbar;
