import React, {useState} from "react";
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




    const onStateChange = (event) => {
        // this affects state in this component AND parent
        setAppState({...appState, playState: event.data});
    }

    // CHANGE THIS
    // need to move chatview to below video after certain size threshhold (how?)
    const options = {
        width: '100%',
        height: '750px'
    }

    // based on youtube iframe api
    // need to update video when playState changes
    return (
        <div className="video-player">
            <YouTube videoId="2g811Eo7K8U" opts={options} onStateChange={onStateChange} onReady={handleVideoUpdate}/>
        </div>
    );


};

export default VideoPlayer;