import './App.css';
import React from "react";

import Livre from './Screen/Livre'
import Adherent from './Screen/Adherent';
import Emprunte from './Screen/Emprunte';

import Revue from './Screen/Revue';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dictionnaire from './Screen/Dictionnaire';


function App() {
  return (
    //<Adherent/>
    <Router>
    <div className='App'>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Gestion de bibliothèque </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to={"/adherent"}>Adherent</Nav.Link>
            
            <Dropdown >
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
            <Nav>document</Nav>
            </Dropdown.Toggle>
            <Dropdown.Menu>
        <Dropdown.Item as={Link} to={"/livre"}>Livre</Dropdown.Item>
        <Dropdown.Item as={Link} to={"/revue"}>Revue</Dropdown.Item>
        <Dropdown.Item  as={Link} to={"/dictionnaire"}>Dictionnaire</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
            
            <Nav.Link as={Link} to={"/emprunte"}>Emprunte</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
    </div>
    <div>

    <Switch>
          <Route path="/adherent">
            <Adherent/>
          </Route>
          <Route path="/livre">
            <Livre/>
          </Route>
          <Route path="/revue">
          < Revue/>
          </Route>
          <Route path="/dictionnaire">
          < Dictionnaire/>
          </Route>
          <Route path="/emprunte">
            <Emprunte/>
          </Route>
        </Switch>

    </div>
    </Router>
  );
}

export default App;
