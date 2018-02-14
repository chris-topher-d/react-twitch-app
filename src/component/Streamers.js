import React, {Component} from 'react';
import Header from './Header';
import AddChannel from './AddChannel';
import StreamerInfo from './StreamerInfo';
import Footer from './Footer';
const APIURL = 'https://wind-bow.glitch.me/twitch-api/channels/';
const statusURL = 'https://wind-bow.glitch.me/twitch-api/streams/';
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
      }
    }
    this.addStreamer = this.addStreamer.bind(this);
    this.filterStreamers = this.filterStreamers.bind(this);
  }

  componentWillMount() {
    channels.forEach(channel => {
      this.addStreamer(channel);
    });
  }

  addStreamer(e) {
    fetch(statusURL + e)
    .then(response => response.json())
    .then(info => {
      if (info.stream !== null) {
        let parsedInfo = {
          'name': info.stream.channel.display_name,
          'url': info.stream.channel.url,
          'logo': info.stream.channel.logo,
          'game': info.stream.game,
          'status': info.stream.channel.status,
          '_id': info.stream.channel._id
        };
        this.setState({online: [...this.state.online, parsedInfo]});
      } else {
        fetch(APIURL + e)
        .then(response => response.json())
        .then(info => {
          let offlineInfo = {};
          if (info.error === 'Not Found') {
            offlineInfo = {
              'name': e,
              'url': 'https://www.twitch.tv/' + e,
              'logo': 'https://dummyimage.com/55x55/ea3a40/fff.png&text=!',
              'status': 'Unable to find channel for ' + e,
              '_id': e
            };
          } else {
            offlineInfo = {
              'name': info.display_name,
              'url': info.url,
              'logo': info.logo,
              'status': 'offline',
              '_id': info._id
            };
          }
          this.setState({offline: [...this.state.offline, offlineInfo]})
        })
      }
    })
    .catch(error => console.log('parsing failed', error));
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

  render() {
    const online = this.state.filter === 'all' || 'online' ?
      this.state.online.map(channel => (
        <StreamerInfo
          id={'online'}
          key={channel._id}
          channelName={channel.name}
          channelLink={channel.url}
          logo={channel.logo}
          status={channel.game + ' : ' + channel.status}
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
