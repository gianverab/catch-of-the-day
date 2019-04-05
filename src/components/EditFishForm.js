import React, { Component } from 'react';

class EditFishForm extends Component {
  handleChange = event => {
    // 1. Take a copy of the current fish
    const updatedFish = {
      ...this.props.fish,
      [event.currentTarget.name]: event.currentTarget.value,
    };
    // 2. Update that fish
    this.props.updateFish(this.props.index, updatedFish);
    // console.log(updatedFish);
  };

  render() {
    const { fish } = this.props;
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
      </div>
    );
  }
}

export default EditFishForm;
