import React, { Component } from 'react';
import { formatPrice } from '../helpers';

class Fish extends Component {
  handleClick = () => {
    this.props.handleOrder(this.props.index);
  };
  render() {
    const { desc, image, name, price, status } = this.props.details;
    const isAvailable = status === 'available';
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button type="button" onClick={this.handleClick} disabled={!isAvailable}>
          {isAvailable ? 'Add to Cart' : 'Sold Out!'}
        </button>
      </li>
    );
  }
}

export default Fish;
