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
      <div className={this.props.expanded ? 'twitch-player expanded' : 'twitch-player'}>
          <div id={this.props.targetID}></div>
      </div>
    );
  }
}

TwitchPlayer.defaultProps = {
  targetID: 'twitch-embed',
  width: '490',
  height: '500',
  theme: 'dark'
};

export default TwitchPlayer;
