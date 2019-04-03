import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyCHRDZdQ_3IshMuGb3_kwy2-3kn4_uRSqc',
  authDomain: 'catch-of-the-day-b6ef9.firebaseapp.com',
  databaseURL: 'https://catch-of-the-day-b6ef9.firebaseio.com',
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is a default export
export default base;
