import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import District from "./Districts";
import Representatives from "./Representatives";
import Legislation from "./Legislations";
import SplashPage from "./SplashPage";
import AboutUs from "./AboutUs";
import { Navbar, Nav } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">FoodMeOnce</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/Districts">Districts</Nav.Link>
            <Nav.Link href="/Representatives">Representatives</Nav.Link>
            <Nav.Link href="/Legislations">Legislation</Nav.Link>
            <Nav.Link href="/About Us">About Us</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <BrowserRouter>
        <Route exact path="/" component={SplashPage} />
        <Route path="/Districts" component={District} />
        <Route path="/Representatives" component={Representatives} />
        <Route path="/Legislations" component={Legislation} />
        <Route path="/About Us" component={AboutUs} />
      </BrowserRouter>
    </div>
  );
}

export default App;
