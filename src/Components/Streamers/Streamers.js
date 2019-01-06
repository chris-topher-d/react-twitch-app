import React, {Component} from 'react';
import Header from '../Header/Header';
import AddChannel from '../AddChannel/AddChannel';
import StreamerInfo from '../StreamerInfo/StreamerInfo';
import Footer from '../Footer/Footer';
import clientID from '../../apiClientId';

const channelInfo = 'https://api.twitch.tv/helix/users?login=';
const streamInfo = 'https://api.twitch.tv/helix/streams?';
const gameInfo = 'https://api.twitch.tv/helix/games?';

let channels = [
  "OgamingSC2",
  "ESL_SC2",
  "freecodecamp",
  'funfunfunction',
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];

class Streamers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      online: [],
      offline: [],
      filter: {
        online: true,
        offline: true
      },
      focusedStreamer: ''
    }
    this.addStreamer = this.addStreamer.bind(this);
    this.filterStreamers = this.filterStreamers.bind(this);
  }

  componentWillMount() {
    channels.forEach(channel => {
      this.addStreamer(channel);
    });
  }

  addStreamer(streamer) {
    fetch(streamInfo + 'user_login=' + streamer, {
      headers: {
        'Client-ID': clientID
      }
    })
    .then(response => response.json())
    .then(info => {
      // If streamer is currently ONLINE
      if (info.data.length > 0) {
        let logo = info.data[0].thumbnail_url.replace('{width}x{height}', '55x55');

        let userInfo = {
          name: info.data[0].user_name,
          url: 'https://www.twitch.tv/' + info.data[0].user_name,
          logo: logo,
          status: info.data[0].title,
          _id: info.data[0].user_id
        };

        // Fetch game title with id
        fetch(gameInfo + 'id=' + info.data[0].game_id, {
          headers: {
            'Client-ID': clientID
          }
        })
        .then(response => response.json())
        .then(gameInfo => {
          userInfo.game = gameInfo.data[0].name;
          this.setState({online: [...this.state.online, userInfo]});
        });

      // If streamer is currently OFFLINE
      } else {
        fetch(channelInfo + streamer, {
          headers: {
            'Client-ID': clientID
          }
        })
        .then(response => response.json())
        .then(info => {
          let offlineInfo = {};
          // If streamer doesn't exist
          if (info.data.length === 0) {
            offlineInfo = {
              'name': streamer,
              'url': 'https://www.twitch.tv/' + streamer,
              'logo': 'https://dummyimage.com/55x55/ea3a40/fff.png&text=!',
              'status': 'Unable to find channel for ' + streamer,
              '_id': streamer
            };
          } else {
            offlineInfo = {
              'name': info.data[0].display_name,
              'url': 'https://www.twitch.tv/' + info.data[0].login,
              'logo': info.data[0].profile_image_url,
              'status': 'offline',
              '_id': info.data[0].user_id
            };
          }
          this.setState({offline: [...this.state.offline, offlineInfo]})
        });
      }

    });
  }

  deleteStreamer(channel) {
    let onlineStreamers = this.state.online.filter(streamer => streamer.name !== channel);
    let offlineStreamers = this.state.offline.filter(streamer => streamer.name !== channel);
    this.setState({online: onlineStreamers, offline: offlineStreamers});
  }

  filterStreamers(id) {
    let filter = {...this.state.filter};
    if (id === "all-btn") {
      filter.online = true;
      filter.offline = true;
      this.setState({filter});
    } else if (id === "online-btn") {
      filter.online = true;
      filter.offline = false;
      this.setState({filter});
    } else if (id === "offline-btn") {
      filter.online = false;
      filter.offline = true;
      this.setState({filter});
    }
  }

  focusedStreamer = (streamerId) => {
    if (this.state.focusedStreamer === streamerId) {
      this.setState({focusedStreamer: ''});
    } else {
      this.setState({focusedStreamer: streamerId});
    }
  }

  render() {
    const online = this.state.filter === 'all' || 'online' ?
      this.state.online.map(channel => (
        <StreamerInfo
          id={'online'}
          key={channel._id}
          userId={channel._id}
          channelName={channel.name}
          channelLink={channel.url}
          logo={channel.logo}
          status={channel.game + ' : ' + channel.status}
          expanded={channel._id === this.state.focusedStreamer ? true : null}
          focusedStreamer={this.focusedStreamer}
          onDelete={(this.deleteStreamer.bind(this, channel.name))}
        />
      ))
      : null;

    const offline = this.state.offline.map(channel => (
      <StreamerInfo
        id={'offline'}
        key={channel._id}
        channelName={channel.name}
        channelLink={channel.url}
        logo={channel.logo}
        status={channel.status}
        onDelete={(this.deleteStreamer.bind(this, channel.name))}
      />
    ));

    return (
      <div className='container'>
        <Header filter={this.filterStreamers} filterStreamers={this.filterStreamers}/>
        <AddChannel addStreamer={this.addStreamer}/>
        {this.state.filter.online && online}
        {this.state.filter.offline && offline}
        <Footer />
      </div>
    )
  }
}

export default Streamers;
