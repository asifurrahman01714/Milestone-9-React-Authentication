import logo from './logo.svg';
import './App.css';

function App() {
  const googleSignIn = () => {
    console.log("click");
  }
  return (
    <div className="App">
      <button onClick={googleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
