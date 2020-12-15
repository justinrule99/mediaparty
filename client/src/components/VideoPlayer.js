import React, {useEffect, useState} from "react";
import '../styles/VideoPlayer.css';
import YouTube from 'react-youtube';


// provide onClick as prop to video player
// event.target.playVideo(), event.target.pauseVideo()

const VideoPlayer = (props) => {
    // handle new state change
    const [player, setPlayer] = useState(null);

    /*
    UNSTARTED: -1
    ENDED: 0
    PLAYING: 1
    PAUSED: 2
    BUFFERING: 3
    VIDEO CUED: 5 */
    // these will be sent thru the websocket and (hopefull) resent on new info
    const appState = props.appState;
    const setAppState = props.setAppState;
    const client = appState.client;


    const handleVideoUpdate = (event) => {
        setPlayer(event.target);
        if (appState.playState === -1) {
            event.target.playVideo();
        }
    }

    if (appState.playState === 1) {
        player.playVideo();
    }

    if (appState.playState === 2) {
        player.pauseVideo();
    }



    useEffect(() => {
        console.log("CLIENT");
        console.log(JSON.stringify(client, null,2));
    })

    const onStateChange = (event) => {
        // this affects state in this component AND parent
        // client is always empty here
        // can send in parent?
        if (client) {

            // client.send(event.data);
        }
        setAppState({
            ...appState,
            playState: event.data,
            updatePlayState: true
        });
    }

    // CHANGE THIS
    // need to move chatview to below video after certain size threshhold (how?)
    const options = {
        width: '100%',
        height: '750px'
    }

    // need to update video when playState changes
    return (
        <div className="video-player">
            <YouTube videoId={appState.videoId} opts={options} onStateChange={onStateChange} onReady={handleVideoUpdate}/>
        </div>
    );


};

export default VideoPlayer;