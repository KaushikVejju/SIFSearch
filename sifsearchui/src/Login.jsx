import React, {useState} from 'react';
import './styles/Login.css'

// need to embed login into the App component to ensure that everything works
const Login = ({handleLogin, showRegister}) => {

    // Login Fields
    var initialFormValues = {loginemail:'', loginpassword:''};
    const [formValue,setFormValue] = useState(initialFormValues);
    const [errorMessage, setErrorMessage] = useState(""); // New state for error message
    const [isLoading, setIsLoading] = useState(false);

    const handleInput=(e)=>{
        const {name, value} = e.target;
        setFormValue({...formValue, [name]:value})
    }

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

   
    // Request to API
    const loginToSifSearch = async() => {
        setIsLoading(true);
        const csrftoken = getCookie('csrftoken'); // CORS Token
        let res =  await fetch("http://127.0.0.1:8000/api/login", {
            mode: 'cors',
            method: "POST",
            headers: {'X-CSRFToken':csrftoken,  "Content-Type": "application/json", },
            body: JSON.stringify({email: formValue.loginemail , password: formValue.loginpassword}),
            credentials: 'include',
        });
        setIsLoading(false);
        if (res.ok) {
            handleLogin();
        } else {
            setErrorMessage("Unable to login. Please check your credentials.")
        }
    }
  
    return (
        <div class="login-div">
            <h1>Login </h1>
            <form class="login-form" onSubmit={(e)=> {e.preventDefault(); loginToSifSearch()}}>
                {isLoading &&
                    <div class = "progress">
                            <div class="color"></div>
                    </div>
                }
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <input type="text" name="loginemail" placeholder='Enter Email' required value={formValue.loginemail} onChange={handleInput}></input><br/>
                <input type="text" name="loginpassword" placeholder='Enter Password' required value={formValue.loginpassword} onChange={handleInput}></input><br/>
                <button class="login-btn" type="submit"> Login</button><br/>
            </form>
                <button class="google-btn" onClick={() => handleLogin()}> Sign In With Google </button><br/>
                Don't have an account? <button class="register-btn" onClick={() => showRegister()}><b>Sign Up Here</b></button>

        </div>
    )
}

export default Login;