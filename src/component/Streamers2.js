import React, {Component} from 'react';
import Header from './Header';
import AddChannel from './AddChannel';
import StreamerInfo from './StreamerInfo';
import Footer from './Footer';
const APIURL = 'https://wind-bow.glitch.me/twitch-api/channels/';
const statusURL = 'https://wind-bow.glitch.me/twitch-api/streams/';
const callbackURL = '?callback=?';



class Streamers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      channels: [
        "OgamingSC2",
        "ESL_SC2",
        "freecodecamp",
        "storbeck",
        "habathcx",
        "RobotCaleb",
        "noobs2ninjas"
      ],
      channelInfo: [],
      streaming: []
    }
    // this.checkStatus = this.checkStatus.bind(this);
    // this.loadChannels = this.loadChannels.bind(this);
    this.addStreamer = this.addStreamer.bind(this);
    // this.deleteStreamer = this.deleteStreamer.bind(this);
  }

  componentDidMount() {
    // this.checkStatus(this.state.channels);
    this.loadChannels();
    this.checkStatus();
  }

  loadChannels = () => {
    this.state.channels.forEach(channel => (
      fetch(APIURL + channel + callbackURL)
      .then(response => response.text())
      .then(text => String(text).slice(32, -2))
      .then(string => JSON.parse(string))
      // .then(channelInfo => console.log(channelInfo))
      .then(info => this.setState({channelInfo: [...this.state.channelInfo, info]}))
      .catch(error => console.log('parsing failed', error))
    ));
    console.log(this.state.channelInfo);
    // this.setState({channelInfo: channels});
  }

  checkStatus = () => {
    this.state.channels.forEach(channel => (
      fetch(statusURL + channel + callbackURL)
      .then(response => response.text())
      .then(text => String(text).slice(32, -2))
      .then(string => JSON.parse(string))
      .then(parsedJSON => {
        if (parsedJSON.stream === null) {
          this.setState({streaming: [...this.state.streaming, channel]});
          // this.changeStatus();
          console.log(this.state.streaming);
        }
      })
      .catch(error => console.log('parsing failed', error))
    ))
    // this.changeStatus();
  }

  // changeStatus() {
  //   this.state.channelInfo.forEach(channel => {
  //     if (!this.state.streaming.includes(channel.name)) {
  //       // let updatedChannels = this.state.channelInfo.filter(val => val !== channel);
  //       // let updatedStatus = channel;
  //       // channel.status = null;
  //       // this.setState({channelInfo: [...updatedChannels, updatedStatus]})
  //       console.log(this.state.channelInfo);
  //     }
  //   })
  // }

  addStreamer(e) {
    const channelList = this.state.channels.slice();
    fetch(APIURL + e + callbackURL)
    .then(response => response.text())
    .then(text => String(text).slice(32, -2))
    .then(string => JSON.parse(string))
    // .then(channelInfo => console.log(channelInfo))
    .then(info => this.setState({channelInfo: [...this.state.channelInfo, info]}))
    .catch(error => console.log('parsing failed', error))
    this.setState({channels: [...channelList, e]});
    // this.loadChannels();
    // this.checkStatus();
    // console.log(this.state.channels);
  }

  deleteStreamer(channel) {
    const newInfo = this.state.channelInfo.filter(info => info.display_name !== channel);
    const newList = this.state.channels.filter(name => name !== channel);
    this.setState({channels: newList, channelInfo: newInfo});
  }

  render() {
    // console.log(this.state.streaming);
    const channels = this.state.channelInfo.map(channel => (
      <StreamerInfo
        key={channel._id}
        channelName={channel.display_name}
        channelLink={channel.url}
        logo={channel.logo}
        status={channel.status}
        // onDelete={this.deleteStreamer.bind(this, channel.display_name)}
        onDelete={(this.deleteStreamer.bind(this, channel.display_name))}
      />
    ));


    return (
      <div className='container'>
        <Header />
        <AddChannel addStreamer={this.addStreamer}/>
        {channels}
        <Footer />
      </div>
    )
  }
}

export default Streamers;
