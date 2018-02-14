import React, {Component} from 'react';

class AddChannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  handleSubmit(props) {
    this.props.addStreamer(this.state.inputValue);
    this.setState({inputValue: ''});
  }

  render() {
    return (
      <div className='input-streamer'>
        <input
          type='text'
          placeholder='channel name'
          value={this.state.inputValue}
          onChange={this.handleChange}
        />
        <button
          className='btn add-btn'
          onClick={this.handleSubmit}
        >
          ADD STREAMER
        </button>
      </div>
    )
  }
}

export default AddChannel;
