import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

class StorePicker extends Component {
  static propTypes = {
    history: PropTypes.string.isRequired,
  };
  // Creating the Ref
  storeInput = React.createRef();
  handleSubmitStore = event => {
    const { history } = this.props;

    // 1. Stop the form from submitting
    event.preventDefault();
    // 2. Get the text from that input
    const storeName = this.storeInput.current.value;
    // 3. Change the page to /store/whatever-they-entered
    history.push(`store/${storeName}`);
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
