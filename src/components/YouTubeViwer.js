import React from 'react';
import YouTube from 'react-youtube';

export default class Example extends React.Component {
    render() {
        const opts = {
            height: '100%',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
            }
        };

        return (
            <YouTube
                videoId="-7dTPYGTk6U"
                opts={opts}
                onReady={this._onReady}
            />
        );
    }

    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
    }
}
