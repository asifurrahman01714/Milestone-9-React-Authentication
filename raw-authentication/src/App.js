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

  console.log(user);
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const {email, photoURL,displayName} = result.user;
      const newUser = {
        isSignedIn: true,
        name: 'displayName',
        email: 'email',
        photo: 'photoURL',
      }
      setUser(newUser);
      console.log(user);
    })
  }
  return (
    <div className="App">
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default App;
