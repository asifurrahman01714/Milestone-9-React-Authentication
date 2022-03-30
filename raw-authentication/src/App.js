import './App.css';

// Importing firebase services
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut } from "firebase/auth";
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
 
  const handleSignOut =() =>{
    signOut(auth).then(() => {
      const signOutUser = {
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
      };
      setUser(signOutUser);
    }).catch((error) => {
      // An error happened.
    });
  }

  const handleSubmit = (e) => {

  }
  const handleBlur =(e) =>{
    const {name, value} = e.target;
    console.log(name, value);
    if(name === "email"){
      const regex = /\S+@\S+\.\S+/;
      const isEmailValid = regex.test(value);
      console.log(isEmailValid);
    }
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
          <button onClick={handleSignOut}>Sign In</button>
        </div>
        : 
        <div>
          <h2>No user signed yet !!!</h2>
          <button onClick={handleSignIn}>Sign In</button>
        </div>
      }
      
      <h1>Our Login Form</h1>
      <form action={handleSubmit}>
        <input type="email" name="email" onBlur={handleBlur} placeholder="Enter Your Email" id="" required/>
        <br />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" id="" required/>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
