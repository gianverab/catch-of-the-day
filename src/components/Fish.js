import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../helpers';

class Fish extends Component {
  static propTypes = {
    details: PropTypes.shape({
      status: PropTypes.string,
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      price: PropTypes.number,
    }).isRequired,
    handleOrder: PropTypes.func,
    index: PropTypes.string,
  };

  render() {
    const { details, handleOrder, index } = this.props;
    const isAvailable = details.status === 'available';
    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button
          type="button"
          onClick={() => {
            handleOrder(index);
          }}
          disabled={!isAvailable}
        >
          {isAvailable ? 'Add to Cart' : 'Sold Out!'}
        </button>
      </li>
    );
  }
}

export default Fish;
