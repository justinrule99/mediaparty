import '../styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";
import React, {useEffect, useState} from "react";
import VideoPlayer from "./VideoPlayer";
import ChatView from "./ChatView";
import {w3cwebsocket as W3CWebSocket} from "websocket";
import {logInUser} from "../util/utils";
import {Modal} from "react-bootstrap";


// need to fix component sizing for different devices
const App = () => {
    // need video state here
    const [appState, setAppState] = useState({
        playState: -1,
        updatePlayState: false,
        videoId: "yuIyN_mii7c",
        user: {},
        client: {},
        messages: [],
        joinCode: 0,
        signedIn:false,
        loginError: false
    });

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [id, setId] = useState("");
    const [showLogin, setShowLogin] = useState(false);

    const handleLoginShow = () => setShowLogin(true);

    // this might remove the user object? what?
    const handleLoginClose = () => setShowLogin(false);

    const handleSignIn = async (event) => {
        event.preventDefault();
        console.log("usename: "+username);
        console.log("pw: "+password);

        // show error if loginResponse null
        const loginResponse = await logInUser({username:username, hashedPassword: password});
        if (loginResponse.status === 400 || loginResponse.status === 404) {
            // show error in modal
            setAppState({
                ...appState,
                loginError: true
            })
            return;
        }

        console.log(JSON.stringify(loginResponse, null, 2));

        setAppState({
            ...appState,
            signedIn: true,
            user: loginResponse,
        });

        handleLoginClose();

    };

    const handleFormChange = (event, isUsername) => {
        event.preventDefault();
        if (isUsername) {
            setUsername(event.target.value);
        } else {
            setPassword(event.target.value);
        }
    }

    const handleVideoChange = (event) => {
        event.preventDefault();
        setId(event.target.value);
    }

    const loadVideo = () => {
        // will check if video exists
        let http = new XMLHttpRequest();

        http.open('HEAD', "http://img.youtube.com/vi/" + id + "/mqdefault.jpg", false);
        http.send();

        if (http.status === 404) {
            console.log("this vidoe doesn't exist");

        } else {
            console.log("exists");
            setAppState({
                ...appState,
                playState: 1,
                videoId: id
            })
        }
    }


    const showState = () => {
        console.log(JSON.stringify(appState, null, 2));
    }

    // same as componentDidUpdate
    // will this run when child components change state??
    // need to send playState through websocket on update
    let newClient;
    let prevState = appState.playState;
    useEffect(() => {
        // how do we get correct url?


        console.log("CLI");
        console.log(appState.client);
        // still in connecting
        if (appState.client.url && appState.client.readyState === 1) {
            // when do we send playState?
            if (appState.updatePlayState) {
                appState.client.send(appState.playState);
                setAppState({
                    ...appState,
                    updatePlayState: false
                });
            }
        }

        // create connection if no connection and is join code
        if (!appState.client.url && appState.joinCode !== 0) {

            newClient = new W3CWebSocket("ws://localhost:8080/chat/"+appState.user.username+"/"+appState.joinCode);

            setAppState({
                ...appState,
                client: newClient
            })
        }

        // can we connect to a socket here?
        appState.client.onopen = () => {
            console.log("open socket");
        }

        // should backend send message object instead of string?
        appState.client.onmessage = (message) => {

            setAppState({
                ...appState,
                messages: [...appState.messages, message.data]
            });

        }

        appState.client.onclose = () => {
            console.log("connection closing..");
        }

        // shows state on any lifecycle

        showState();
    });


    return (
        <div className="App">
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Media Party</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <div className="navbar-content">
                        <Form inline >
                            <FormControl type="text" placeholder="Video ID" className="form-len mr-sm-2"
                                         value={id}
                                         onChange={(e) => {handleVideoChange(e)}} />
                            <Button variant="outline-success" className="mr-sm-4"
                                    onClick={loadVideo}>{"Play"}</Button>
                        </Form>
                        <Nav className="logins">
                            {!appState.signedIn ?
                                <>
                                    <Button className="mr-sm-2" >{"Sign Up"}</Button>
                                    <Button className="mr-sm-2" onClick={handleLoginShow}>{"Log In"}</Button>
                                </>
                                : <Button className="mr-sm-2" onClick={null}>{appState.user.username} </Button>
                            }
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Navbar>
            <div className="content">
                <VideoPlayer appState={appState} setAppState={setAppState}/>
                <ChatView appState={appState} setAppState={setAppState}/>
            </div>
            <Modal show={showLogin} onHide={handleLoginClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Log In"}</Modal.Title>
                </Modal.Header>
                <Form onSubmit={(e) => {
                    handleSignIn(e)
                }}>
                    <Form.Group controlId="formBasicEmail" className="login-modal">
                        <Form.Label>{"Username"}</Form.Label>
                        <Form.Control type="username" placeholder="Enter username" value={username}
                                      onChange={(e) => handleFormChange(e, true)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" className="login-modal">
                        <Form.Label>{"Password"}</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password}
                                      onChange={(e) => handleFormChange(e, false)}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" className="login-button">{"Log In"}</Button>
                    {appState.loginError ?  <Alert key="err" variant="danger" className="login-error"> Error: Could not log in user </Alert>
                        : null}
                </Form>
            </Modal>
        </div>
    );
}

export default App;
