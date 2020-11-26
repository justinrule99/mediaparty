import React from "react";
import '../styles/VideoPlayer.css';
import YouTube from 'react-youtube';



const VideoPlayer = () => {
    /*
    UNSTARTED: -1
    ENDED: 0
    PLAYING: 1
    PAUSED: 2
    BUFFERING: 3
    VIDEO CUED: 5 */

    const onStateChange = (event) => {
        console.log(event.data);
    }

    // CHANGE THIS
    const options = {
        width: '1290',
        height: '660'
    }

    // based on youtube iframe api
    return (
        <div className="video-player">
            <YouTube videoId="2g811Eo7K8U" opts={options} onStateChange={onStateChange}/>
        </div>
    );


};

export default VideoPlayer;