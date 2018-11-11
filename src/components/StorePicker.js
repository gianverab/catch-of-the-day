import React, { Component } from 'react';
import { getFunName } from '../helpers';

class StorePicker extends Component {
  storeInput = React.createRef()
  handleSubmitStore = (event) => {
    event.preventDefault();
    const storeName = this.storeInput.current.value;
    this.props.history.push(`store/${storeName}`);
  }
  render() {
    return (
      <form action="" className="store-selector" onSubmit={this.handleSubmitStore}>
        <h2>Please enter a Store!</h2>
        <input
          type="text"
          required
          placeholder="Store Name"
          defaultValue={getFunName()}
          ref={this.storeInput}
        />
        <button type="submit">Visit Store -&gt;</button>
      </form>
    );
  }
}

export default StorePicker;
