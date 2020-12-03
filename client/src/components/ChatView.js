import React, {useState} from "react";
import '../styles/ChatView.css';
import Tabs from "react-bootstrap/Tabs";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Tab from "react-bootstrap/Tab";


const ChatView = (props) => {
    const [chatToSend, setChatToSend] = useState("");

    const appState = props.appState;
    const setAppState = props.setAppState;
    const client = appState.client;


    // need to add prev chats to chatArea

    // have join code if not in session

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
        client.send(chatToSend);
        setChatToSend("");
    }

    return (
        <div className="chat-view">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="session" title="Session">
                    {"Log in to Create or Join a Session"}
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