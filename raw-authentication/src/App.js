import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './firebase.config';
import { GoogleAuthProvider } from "firebase/auth";

firebase.initializeApp(firebaseConfig);


function App() {
const provider = new GoogleAuthProvider();

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
