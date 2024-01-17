import Welcome from './Welcome';
import Login from './Login';
import Register from './Register'
import React, {useState} from 'react';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const handleLogin = () => {
    // Perform login logic, and if successful, setLoggedIn(true)
    setLoggedIn(true);
  };

  const handleSignUpClick = () => {
      setShowRegister(true);
  };  

  const handleRegister = () => {
    // Perform register logic, and if successful, setLoggedIn(true)
    setShowRegister(false); // Hide the Register component after successful registration
  };
  const handleLogout = () => {
    setLoggedIn(false);
    document.getElementById('header-login-span').innerHTML = "Please Login"
};
  return (
    <div className="App">
      <br></br>
      <div>
            {loggedIn ? (
                <Welcome handleLogout={handleLogout}/>
            ) : showRegister ? (
                <Register handleRegister={handleRegister}/>
            ) : (
                <Login handleLogin={handleLogin} handleSignUpClick={handleSignUpClick} />
            )}
      </div>
    </div>
  );
}
export default App;
