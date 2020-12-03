import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import React, {useEffect, useState} from "react";
import VideoPlayer from "./VideoPlayer";
import ChatView from "./ChatView";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {createUser, logInUser} from "../util/utils";

const client = new W3CWebSocket('ws://127.0.0.1:8080/direct-message/user2/user3');

// need to fix component sizing for different devices
// need user object to pass through components
const App = () => {
    // need video state here
    // const [playState, setPlayState] = useState(-1);
    // const [user, setUser] = useState(null);
    const [appState, setAppState] = useState({
        playState: -1,
        user: null,
        client: client,
        messages: []
    });



    // same as componentDidUpdate
    useEffect(() => {
        async function fetchUser() {
            if (appState.user === null) {
                // log in via http post
                let user = {
                    username: "user2",
                    hashedPassword: "password"
                }
                const login = await logInUser(user);
                console.log(JSON.stringify(user, null, 2));
                setAppState({
                    ...appState,
                    user: login
                });
            }
        }

        fetchUser();


        // can we connect to a socket here?
        // probably. will need to declare global state and pass to child components
        console.log(appState.playState);
        client.onopen = () => {
            console.log("open socket");
        }

        client.onmessage = (message) => {
            // change state
            console.log(message);
            setAppState({
                ...appState,
                messages: [message.data]
            });
            console.log(appState.messages);
        }
    });


  return (
    <div className="App">
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Media Party</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-success" onClick={()=> setAppState({...appState, playState: 1})}>Search</Button>
                </Form>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">{"Sign Up"}</Nav.Link>
                    <Nav.Link href="#link">{"Log In"}</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        <div className="content">
            <VideoPlayer appState={appState} setAppState={setAppState}/>
            <ChatView appState={appState} setAppState={setAppState}/>
        </div>
    </div>
  );
}

export default App;
