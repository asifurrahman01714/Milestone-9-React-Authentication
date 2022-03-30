import './App.css';

// Importing firebase services
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider,signOut,createUserWithEmailAndPassword } from "firebase/auth";
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
    password: ''
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
    const {email,password} = user;
    if(email && password){
      console.log('Submitting');
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          setUser({...user, error: "Please Enter Your Valid Email and Password"});
          console.log(user);
          // ..
        });
    }
    setUser({...user, error:""});
    e.preventDefault();
  }
    const handleBlur =(e) =>{
    const {name, value, placeholder} = e.target;
    console.log(name, value);
    let isFormValid = true;
  
    if(name === "email"){
      const regex = /\S+@\S+\.\S+/;
      isFormValid = regex.test(value);
      console.log(isFormValid);
    }
    if(name === "password"){
      const regex =  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      isFormValid = regex.test(value);
      console.log(isFormValid)
    }
// debugger;
    if(isFormValid){
      // setUser({...user, [name]: value});
      const newUser = {...user};
      newUser[name] = value;
      setUser(newUser);
    }
    if(isFormValid === false){
      setUser({...user, [name]: "This is wrong"});
    
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
      <h3>User Name: {user.name}</h3>
      <h3>User Email: {user.email}</h3>
      <h3>User Password: {user.password}</h3>

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name" required id="" />
        <br />
        <br />
        <input type="email" name="email" onBlur={handleBlur} placeholder="Enter Your Email" id="" required/>
        <br />
        <br />
        <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" id="" required/>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
      {
        user.error ? <h2 style={{color:"red", fontWeight:"800"}}>{user.error}</h2> : 
        <h2 style={{color:"green", fontWeight:"800"}}>You have successfully created your account</h2>
      }
    </div>
  );
}

export default App;
