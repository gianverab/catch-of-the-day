import React, { Component } from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends Component {
  static propTypes = {
    fish: PropTypes.shape({
      name: PropTypes.string,
      status: PropTypes.string,
      desc: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.number,
    }).isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    index: PropTypes.string.isRequired,
  };

  handleChange = event => {
    const { fish, updateFish, index } = this.props;
    // 1. Take a copy of the current fish
    const updatedFish = {
      ...fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    // 2. Update that fish
    updateFish(index, updatedFish);
    // console.log(updatedFish);
  };

  render() {
    const { fish, deleteFish, index } = this.props;
    return (
      <div className="fish-edit">
        <input type="text" name="name" onChange={this.handleChange} value={fish.name} />
        <input type="text" name="price" onChange={this.handleChange} value={fish.price} />
        <select type="text" name="status" onChange={this.handleChange} value={fish.status}>
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={fish.desc} />
        <input type="text" name="image" onChange={this.handleChange} value={fish.image} />
        <button type="button" onClick={() => deleteFish(index)}>
          Remove Fish
        </button>
      </div>
    );
  }
}

export default EditFishForm;
