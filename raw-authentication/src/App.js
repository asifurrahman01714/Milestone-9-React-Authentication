import './App.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebase.config';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

firebase.initializeApp(firebaseConfig);


function App() {
  
  const provider = new GoogleAuthProvider(); 
  const auth = getAuth(); 
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result.user.photoURL);
    })
  }
  return (
    <div className="App">
      <button onClick={handleSignIn}>Sign In</button>
    </div>
  );
}

export default App;
