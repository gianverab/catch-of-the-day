import React from 'react';
import PropTypes from 'prop-types';

const Login = ({ authenticate }) => (
  <nav className="login">
    <h2>Inventory</h2>
    <p>Sign in to manage your store's inventory.</p>
    <button className="github" onClick={() => authenticate('Github')}>
      Log In with GitHub
    </button>

    <button className="twitter" onClick={() => authenticate('Twitter')}>
      Log In with Twitter
    </button>

    <button className="facebook" onClick={() => authenticate('Facebook')}>
      Log In with Facebook
    </button>
  </nav>
);

Login.propTypes = {
  authenticate: PropTypes.func.isRequired,
};

export default Login;
