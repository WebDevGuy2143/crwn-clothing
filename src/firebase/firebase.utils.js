import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBPQO_xxOcyG8uR7rYroR7xXJnNDZ5HRMM",
    authDomain: "crwn-db-3c05e.firebaseapp.com",
    databaseURL: "https://crwn-db-3c05e.firebaseio.com",
    projectId: "crwn-db-3c05e",
    storageBucket: "crwn-db-3c05e.appspot.com",
    messagingSenderId: "1086471108292",
    appId: "1:1086471108292:web:6be7e152554aecbf9cbb91",
    measurementId: "G-15EYBB4CWV"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch(error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  // gives access to the GoogleAuthProvider Class from the auth library
  const provider = new firebase.auth.GoogleAuthProvider();

  // when we call the Google auth, we want to trigger the Google sign in popup
  provider.setCustomParameters({ prompt: 'select_account' });

  // send the information in provider to signInWithPopup method from auth library
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;