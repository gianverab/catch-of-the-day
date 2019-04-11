import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';

class Inventory extends Component {
  static propTypes = {
    fishes: PropTypes.object.isRequired,
    addFish: PropTypes.func.isRequired,
    updateFish: PropTypes.func.isRequired,
    deleteFish: PropTypes.func.isRequired,
    loadSampleFishes: PropTypes.func.isRequired,
    storeId: PropTypes.string.isRequired,
  };

  state = {
    uid: null,
    owner: null,
  };
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authHandler({ user });
      }
    });
  }

  authHandler = async authData => {
    const { storeId } = this.props;
    // 1. Look up the current store in the firebase database
    const store = await base.fetch(storeId, { context: this });
    console.log(store);
    // 2. Claim if there is no owner
    if (!store.owner) {
      // save it as our own
      await base.post(`${storeId}/owner`, {
        data: authData.user.uid,
      });
    }
    // 3. Set the state of the inventory component to reflect the current user
    this.setState({
      uid: authData.user.uid,
      owner: store.owner || authData.user.uid,
    });
  };

  authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp
      .auth()
      .signInWithPopup(authProvider)
      .then(this.authHandler);
  };

  logOut = async () => {
    console.log('logged out!!!!');
    await firebase.auth().signOut();
    this.setState({
      uid: null,
    });
  };

  render() {
    const { uid, owner } = this.state;
    const { fishes, addFish, updateFish, deleteFish, loadSampleFishes } = this.props;

    const logout = <button onClick={this.logOut}>Log Out!</button>;

    // 1. Check if they are logged in
    if (!uid) {
      return <Login authenticate={this.authenticate} />;
    }

    // 2. Check if they are the owner of the store
    if (uid !== owner) {
      return (
        <div>
          <p>Sorry you are not the owner!</p>
          {logout}
        </div>
      );
    }

    // 3. They must be the owner, just render the inventory
    return (
      <div className="inventory">
        <h2>Inventory!</h2>
        {logout}
        {Object.keys(fishes).map(key => (
          <EditFishForm updateFish={updateFish} deleteFish={deleteFish} fish={fishes[key]} key={key} index={key} />
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
