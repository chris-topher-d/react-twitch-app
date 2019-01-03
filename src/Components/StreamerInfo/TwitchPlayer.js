import React, { Component } from 'react';

class TwitchPlayer extends Component {
  componentDidMount() {
    const script = document.createElement('script');

    script.setAttribute(
      'src',
      'https://embed.twitch.tv/embed/v1.js'
    );

    script.addEventListener('load', () => {
      new window.Twitch.Embed(this.props.targetID, { ...this.props, channel: this.props.channelName });
    });

    document.body.appendChild(script);
  }

  render() {
    return (
      <div className='twitch-player'>
        <h3>StreamerInfo {this.props.targetID} {this.props.width} {this.props.height}</h3>
        <div id={this.props.targetID}>test</div>
      </div>
    );
  }
}

TwitchPlayer.defaultProps = {
  targetID: 'twitch-embed',
  width: '490',
  height: '500'
};

export default TwitchPlayer;
