import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import React, {useEffect} from "react";
import VideoPlayer from "./VideoPlayer";
import ChatView from "./ChatView";
import {w3cwebsocket as W3CWebSocket} from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8080/direct-message/newuser2/jrule');

const App = () => {

    useEffect(() => {
        // can we connect to a socket here?
        client.onopen = () => {
            console.log("open socket");
        }

        client.onmessage = (message) => {
            console.log(message);
        }
    });

  return (
    <div className="App">
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Media Party</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
        <div className="content">
            <VideoPlayer/>
            <ChatView/>
        </div>

    </div>
  );
}

export default App;
