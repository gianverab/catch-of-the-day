import React, { Component } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {
  // Creating the Ref
  storeInput = React.createRef();
  handleSubmitStore = event => {
    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. Get the text from that input
    const storeName = this.storeInput.current.value;
    // 3. Change the page to /store/whatever-they-entered
    this.props.history.push(`store/${storeName}`);
  };
  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.handleSubmitStore}>
        <h2>Please enter a Store!</h2>
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={this.storeInput} />
        <button type="submit">Visit Store -&gt;</button>
      </form>
    );
  }
}

export default StorePicker;
