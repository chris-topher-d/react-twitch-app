import React from 'react';
import './StreamerInfo.css';

const StreamerInfo = ({channelName, channelLink, logo, status, onDelete, id}) => (
  <div className='streamer-info' id={id}>
    <div className='logo'>
      <a href={channelLink} target='_blank'>
        <img id='player-logo' src={logo} alt='player-logo' />
      </a>
    </div>
    <div id='channel'>
      <a href={channelLink} target='_blank'>
        <h4>{channelName}</h4>
      </a>
    </div>
    <div className='status'>
      <a href={channelLink} target='_blank'>
        {status}
      </a>
    </div>
    <span id='delete-button' onClick={onDelete}> x </span>
  </div>
)

export default StreamerInfo;
