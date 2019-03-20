import React from 'react';

const Order = ({ fishes, order }) => (
  <div className="order-wrap">
    <h2>Order!!!</h2>
    <ul>
      {Object.keys(order).map(key => (
        <li key={key} index={key} details={order[key]}>
          {}
        </li>
      ))}
    </ul>
  </div>
);

export default Order;
