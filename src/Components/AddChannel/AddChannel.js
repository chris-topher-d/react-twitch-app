import React, {Component} from 'react';

class AddChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSubmit = (props) => {
    this.props.addStreamer(this.state.inputValue);
    this.setState({inputValue: ''});
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  render() {
    return (
      <div className='streamer-search'>
        <div id='search-bar'>
          <input
            type='text'
            placeholder='Search for streamer'
            value={this.state.inputValue}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <i className='fas fa-search' onClick={this.handleSubmit}></i>
        </div>
      </div>
    )
  }
}

export default AddChannel;
