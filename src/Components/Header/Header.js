import React, {Component} from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      all: 'btn active',
      online: 'btn',
      offline: 'btn',
    }
  }

  handleSelection = (e) => {
    this.props.filterStreamers(e.target.id);
    this.setActiveButtonClass(e.target.id);
  }

  setActiveButtonClass = (id) => {
    if (id === 'all-btn') {
      this.setState({
        all: 'btn active',
        online: 'btn',
        offline: 'btn'
      });
    } else if (id === 'online-btn') {
      this.setState({
        all: 'btn',
        online: 'btn active',
        offline: 'btn'
      });
    } else if (id === 'offline-btn') {
      this.setState({
        all: 'btn',
        online: 'btn',
        offline: 'btn active'
      });
    }
  }

  render() {
    return (
      <header>

        <div className='buttons'>
          <li><button className={this.state.all} id='all-btn' onClick={this.handleSelection}>ALL</button></li>
          <li><button className={this.state.online} id='online-btn' onClick={this.handleSelection}>ONLINE</button></li>
          <li><button className={this.state.offline} id='offline-btn' onClick={this.handleSelection}>OFFLINE</button></li>
        </div>
      </header>
    )
  }
}

export default Header;
