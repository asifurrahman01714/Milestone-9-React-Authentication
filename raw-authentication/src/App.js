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
  // Now it is time to send data from the form to Google
  const [logInUser, setLogInUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const handleBlur =(e) =>{
    const {name, value} = e.target;
    console.log(name, value);
    if(name === "name"){
      setLogInUser({...logInUser, name: value});
    }
    if(name === "email"){
      const regex = /\S+@\S+\.\S+/;
      const isEmailValid = regex.test(value);
      console.log(isEmailValid);
      setLogInUser({...logInUser, email: value});
    }
    if(name === "password"){
      const regex =  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      const isPasswordValid = regex.test(value);
      console.log(isPasswordValid);
      setLogInUser({...logInUser, password: value});
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
      <h3>User Name: {logInUser.name}</h3>
      <h3>User Email: {logInUser.email}</h3>
      <h3>User Password: {logInUser.password}</h3>

      <form action={handleSubmit}>
        <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name" required id="" />
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
