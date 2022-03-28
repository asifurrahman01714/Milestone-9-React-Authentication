import './App.css';

// Importing firebase services
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { useState } from 'react/cjs/react.development';


const provider = new GoogleAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
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
 
  return (
    <div className="App">
      <img src={user.photo} alt={user.name} />
      <br />
      <h2 style={{fontWeight: 'bold'}}>Welcome, {user.name}</h2>
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default App;
