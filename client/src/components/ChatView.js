import React, {useEffect, useState} from "react";
import '../styles/ChatView.css';
import Tabs from "react-bootstrap/Tabs";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";
import {createSession, url} from "../util/utils";
import Form from "react-bootstrap/Form";
import {w3cwebsocket as W3CWebSocket} from "websocket/lib/websocket";


const ChatView = (props) => {
    const [chatToSend, setChatToSend] = useState("");

    const appState = props.appState;
    const setAppState = props.setAppState;
    const client = appState.client;

    // need to add prev chats to chatArea
    const createSessionOnClick = async () => {
        // post to /create-session
        const session = {hostUsername: appState.user.username || "user1"};

        const sessionResponse = await createSession(session);
        // update state
        console.log(JSON.stringify(sessionResponse));
        setAppState({
            ...appState,
            joinCode: sessionResponse.joinCode
        })

        // console.log("jc: "+appState.joinCode);
        // await joinSession(appState.joinCode);

    }

    // how to connect to socket
    const joinSession = async () => {
        // no http, all sockets?
        let newClient = new W3CWebSocket(url+"/chat/"+appState.user.username+"/"+appState.joinCode);
        console.log(newClient);

        setAppState({
            ...appState,
            client: newClient
        })


    }

    const sendChat = () => {
        const chatArea = document.getElementById("chat-area");
        // need to call upstream function to actually send thru socket
        console.log(chatToSend);
        console.log(chatArea);

        // chatArea.innerHTML += chatToSend + "\n";
        // need to put each chat in a separate array entry
        setAppState({
            ...appState,
            messages: [chatToSend],
        })
        // client isn't updated
        console.log(JSON.stringify(appState.client, null, 2))
        client.send(chatToSend);
        setChatToSend("");
    }


    useEffect(() => {
        console.log("use effect...");

        appState.client.onopen = () => {
            console.log("open socket1");
        }

        appState.client.onmessage = (message) => {
            console.log("message receiv3ed: "+ message);
        }

        appState.client.onclose = () => {
            console.log("connectioen closing..");
        }
    })

    return (
        <div className="chat-view">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="session" title="Session">
                    <div className="session-content">
                        {appState.joinCode !== 0 ?
                            <p>{"Join Code: "+appState.joinCode}</p>
                            :
                            <>
                                <Button className="mr-sm-2" onClick={createSessionOnClick}>{"Create Session"}</Button>
                                <Form inline >
                                    <FormControl type="text" placeholder="Join Code" className="mr-sm-2" />
                                    <Button variant="outline-success" className="mr-sm-2"
                                            onClick={joinSession}>{"Join Session"}</Button>
                                </Form>
                            </>
                        }
                    </div>

                </Tab>
                <Tab eventKey="chat" title="Chat">
                    <textarea id="chat-area" rows="27" cols="60" readOnly="true"/>
                    <InputGroup className="mb-3">
                        <FormControl
                            placeholder="Chat"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={chatToSend}
                            onChange={e => setChatToSend(e.target.value)}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={() => sendChat()}>{"Send"}</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </Tab>
                <Tab eventKey="playlist" title="Playlist" >
                    {"Playlist"}
                </Tab>
            </Tabs>
        </div>
    );
}

export default ChatView;