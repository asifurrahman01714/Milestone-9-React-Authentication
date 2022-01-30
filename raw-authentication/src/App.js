import './App.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useState } from 'react/cjs/react.development';

firebase.initializeApp(firebaseConfig);


function App() {
  
  const provider = new GoogleAuthProvider(); 
  const auth = getAuth();
  
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
    setUser({
      isSignedIn: false,
      name: '',
      email: '',
      photo: '',
    })
  }
  return (
    <div className="App">
      <img src={user.photo} alt={user.name} />
      <br />
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
