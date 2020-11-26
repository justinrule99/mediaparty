import React from "react";
import '../styles/ChatView.css';
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";


const ChatView = () => {

    return (
        <div className="chat-view">
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Session">
                    {"Session"}
                </Tab>
                <Tab eventKey="profile" title="Chat">
                    {"Chat"}
                </Tab>
                <Tab eventKey="contact" title="Playlist" >
                    {"Playlist"}
                </Tab>
            </Tabs>
        </div>
    );

}

export default ChatView;