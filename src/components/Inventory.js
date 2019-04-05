import React, { Component } from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

class Inventory extends Component {
  render() {
    const { fishes, addFish, updateFish, loadSampleFishes } = this.props;
    return (
      <div className="inventory">
        <h2>Inventory!</h2>
        {Object.keys(fishes).map(key => (
          <EditFishForm updateFish={updateFish} fish={fishes[key]} key={key} index={key} />
        ))}
        <AddFishForm addFish={addFish} />
        <button type="button" onClick={loadSampleFishes}>
          Load sample fish
        </button>
      </div>
    );
  }
}

export default Inventory;
