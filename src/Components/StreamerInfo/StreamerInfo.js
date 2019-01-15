import React, { Component } from 'react';
import { UnmountClosed } from 'react-collapse';
import TwitchPlayer from './TwitchPlayer';

class StreamerInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      delete: false,
      expanded: false
    }
  }

  // Tells the parent div which online streamer div to expand
  focusStreamer = (playerId) => {
    this.props.focusStreamer(playerId);
  }

  onDelete = () => {
    // this.state.delete to true to inform UnmountClosed to perform collapse animation
    this.setState({delete: true});
    // Call delete function once collapse animation is complete
    setTimeout(this.props.onDelete, 1000);
  }

  render() {
    const twitchPlayer = this.props.expanded ? (
        <TwitchPlayer channelName={this.props.channelName} expanded={this.props.expanded}/>
      ) : null;

    const offlineStyle = this.props.status === 'offline' ? {'fontStyle': 'italic'} : null;

    return (
      <UnmountClosed
        isOpened={!this.state.delete}
        hasNestedCollapse={this.props.userId ? true : false}
        springConfig={{stiffness: 500, damping: 50}}
      >
        <div className='streamer-info' style={this.props.expanded ? {'opacity': 1} : null}>
          <div className='info-top'>
            <div className='logo'>
              <a href={this.props.channelLink} target='_blank'>
                <img src={this.props.logo} alt='player-logo' title='View at twitch.tv'/>
              </a>
            </div>
            <div className='channel'>
              <a className='channel-link' href={this.props.channelLink} target='_blank'>
                <h4 className='channel-name' title='View at twitch.tv'>{this.props.channelName}</h4>
              </a>
            </div>
            <div className='status'>
              <p style={offlineStyle}>{this.props.status}</p>
            </div>
            <div className='streamer-btns'>
              <i className='delete-button far fa-times-circle' onClick={() => {this.onDelete()}} title='Delete Streamer'></i>
              {
                this.props.id === 'online' ?
                <i
                  className={this.props.expanded ? 'fas fa-angle-double-up expand-btn' : 'fas fa-angle-double-down expand-btn'}
                  title='Expand'
                  onClick={() => {this.focusStreamer(this.props.userId)}}
                ></i>
                : null
              }
            </div>
          </div>
          <UnmountClosed
            isOpened={this.props.expanded}
            fixedHeight={500}
            className={this.props.expanded ? 'player-container expanded' : 'player-container'}
          >
            <div>
              {twitchPlayer}
            </div>
          </UnmountClosed>
        </div>
      </UnmountClosed>
    );
  }
}

export default StreamerInfo;
