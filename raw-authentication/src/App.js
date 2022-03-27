import './App.css';

// Importing firebase services
import * as firebase from 'firebase/app';
import 'firebase/auth';


import { firebaseConfig } from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react/cjs/react.development';

// Initializing firebase App with firebase config
// This initializing always be outside of main function
firebase.initializeApp(firebaseConfig);


function App() {
  
  // Sign in provider
  // This provider always be inside of main function
  const provider = new GoogleAuthProvider(); 
  const auth = getAuth();
  
  // Passing object in state
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
  });
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const {email, photoURL,displayName} = result.user;
      const newUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
      }
      setUser(newUser);
      console.log(user);
    })
  };

  const handleSignOut =() =>{
    firebase.auth().signOut().then(() => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
      };
      setUser(signOutUser);
    }).catch((error) => {
      console.log(error)
    });
  }
  return (
    <div className="App">
      <img src={user.photo} alt={user.name} />
      <br />
      {/* Ternary operator */}
      {
        user.name ? 
        <div>
          <h2 style={{fontWeight: 'bold'}}>Welcome, {user.name}</h2>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
        : 
        <div>
          <h2>No user signed yet !!!</h2>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      }
      
    </div>
  );
}

export default App;
