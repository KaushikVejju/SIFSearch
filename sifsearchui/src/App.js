import React, { useState, useEffect } from 'react';
import Welcome from './Welcome';
import Login from './Login';
import Register from './Register';
import NavBar from './NavBar';

function App() {
  const [userEmail, setUserEmail] = useState("");
  const [loggedIn, setLoggedIn] = useState("login");
  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


  const validateToken = async () => {
    try {
      const csrftoken = getCookie('csrftoken'); // CORS Token
      const response = await fetch(`${process.env.REACT_APP_HOSTNAME}/api/user`, {
        mode:'cors',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 'X-CSRFToken':csrftoken,
        },
        credentials: 'include' // Ensures cookies are included with the request
      });

      if (response.ok) {
        const res = await response.json();
        setUserEmail(res["email"]);
        setLoggedIn("welcome");
      } else {
        setLoggedIn("login");
      }
    } catch (error) {
      console.error('Error during token validation', error);
      setLoggedIn("login");
    }
  };
  useEffect(() => {
    validateToken();
  }, []);

  const setPage = (page) => {
    setLoggedIn(page);
  };

  const handleLogin = () => {
    setPage("welcome");
  };

  const handleLogout = () => {
    setPage("login");
  };

  const handleRegister = () => {
    setPage("login");
  };

  const showRegister = () => {
    setPage("register");
  };

  const renderContent = () => {
    switch (loggedIn) {
      case "login":
        return (<div><NavBar showLogout={false} handleLogout={handleLogout} /><br /><Login handleLogin={handleLogin} showRegister={showRegister} /></div>);
      case "welcome":
        validateToken();
        return (<div><NavBar showLogout={true} userEmail = {userEmail} handleLogout={handleLogout} /><br /><Welcome userEmail = {userEmail} /></div>);
      case "register":
        return (<div><NavBar showLogout={false} handleLogout={handleLogout} /><br /><Register handleRegister={handleRegister} /></div>);
      default:
        return (<div><NavBar showLogout={false} handleLogout={handleLogout} /><br /><Login handleLogin={handleLogin} showRegister={showRegister} /></div>);
    }
  };

  return (
    <div className="App">
      {renderContent()}
    </div>
  );
}

export default App;
