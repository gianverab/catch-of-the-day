import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        storeId: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    fishes: {},
    order: {},
  };

  componentDidMount() {
    const { match } = this.props;

    // first reinstate our localstorage
    const localStorageRef = localStorage.getItem(match.params.storeId);

    if (localStorageRef) {
      this.setState({
        order: JSON.parse(localStorageRef),
      });
    }
    this.ref = base.syncState(`${match.params.storeId}/fishes`, {
      context: this,
      state: 'fishes',
    });
  }

  componentDidUpdate() {
    const { match } = this.props;
    const { order } = this.state;

    localStorage.setItem(match.params.storeId, JSON.stringify(order));
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = fish => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fishes variable
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({
      fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    // 1. Take a copy of the current state
    const fishes = { ...this.state.fishes };
    // 2. Update that state
    fishes[key] = updatedFish;
    // 3. Set that to state
    this.setState({
      fishes,
    });
  };

  deleteFish = key => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Update the state
    fishes[key] = null;
    // 3. Set that to state
    this.setState({
      fishes,
    });
  };

  loadSampleFishes = () => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  handleOrder = key => {
    // 1. Take a copy of the existing state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({
      order,
    });
  };

  takeFromOrder = key => {
    // 1. Take a copy of the existing state
    const order = { ...this.state.order };
    // 2. Take one item from the order and update the number in our order
    order[key] = order[key] - 1 || null;
    if (order[key] === null) {
      delete order[key];
    }
    // 3. Call setState to update our state object
    this.setState({
      order,
    });
  };

  removeFromOrder = key => {
    // 1. Take a copy of the existing state
    const order = { ...this.state.order };
    // 2. Remove item from the order and update our order
    delete order[key];
    // 3. Call setState to update our state object
    this.setState({
      order,
    });
  };

  render() {
    const { fishes, order } = this.state;
    const { match } = this.props;
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(fishes).map(key => (
              <Fish key={key} index={key} details={fishes[key]} handleOrder={this.handleOrder} />
            ))}
          </ul>
        </div>
        <Order
          fishes={fishes}
          order={order}
          removeFromOrder={this.removeFromOrder}
          takeFromOrder={this.takeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={fishes}
          storeId={match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
