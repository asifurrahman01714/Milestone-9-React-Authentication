import './App.css';

// Importing firebase services
import { initializeApp } from 'firebase/app';
import { getAuth, updateProfile,FacebookAuthProvider, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider,signOut,createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from './firebase.config';
import { useState } from 'react/cjs/react.development';


const provider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const app = initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
  // Passing object in state
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: '',
    password: '',
    newUser: false
  });
  const [newUser, setNewuser] = useState(false);

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
    const {email,password, name} = user;
    console.log(email, password, name)
    if(newUser && email && password){
      console.log('Submitting');
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          setUser({...user, error:""});
          updateUserInfo(name); // direct user.name dile hocchilona..but name property evhabe ber kore dile hocche.
          console.log(user);
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
    if (!newUser && email && password) {
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        console.log("Signed In")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
    }
    
    e.preventDefault();
  }


    const handleBlur =(e) =>{
      const {name, value} = e.target;
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
        console.log(user);
      }
      if(isFormValid === false){
        setUser({...user, [name]: "This is wrong"});
      
      }
  }

  const updateUserInfo = (name) => {
    updateProfile(auth.currentUser, {
      displayName: name 
    }).then(() => {
      // Profile updated!
      console.log('Progile Updated');
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });  
  }
  
  const newUserCheck =()=> {
    const newSignUpUser = {...user}
    newSignUpUser.newUser = !newSignUpUser.newUser;
    console.log(newSignUpUser.newUser);
    setUser(newSignUpUser);
    console.log(newSignUpUser);
    
  }
  const handlefacebookLogIn = () => {
    signInWithPopup(auth, facebookProvider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential.accessToken;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = FacebookAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage);
    });
  }
  return (
    <div className="App">
      <div style={{display:'none'}}>
        
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
          <input type="checkbox" name="newUser" onClick={()=> setNewuser(!newUser)} id="" />
          <label htmlFor="newUser">New User</label>
          <br />
          <br />
          {
            newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name" required id="" />
          }
          <br />
          <br />
          <input type="email" name="email" onBlur={handleBlur} placeholder="Enter Your Email" id="" required/>
          <br />
          <br />
          <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" id="" required/>
          <br />
          <br />
          <input type="submit" value={newUser ? 'Sign Up' : 'Sign In'} />
        </form>
      
      { user.error && <h2 style={{color:"red", fontWeight:"800"}}>{user.error}</h2>}
      <h2 style={{color:"green", fontWeight:"800"}}>You have successfully {!newUser ?"Logged In in" :"created"} your account</h2>
        
      </div>
      <div>
        <h1>Facebook Login</h1>
        <button onClick={handlefacebookLogIn}>Facebook Login</button>
      </div>
    </div>
  );
}

export default App;
