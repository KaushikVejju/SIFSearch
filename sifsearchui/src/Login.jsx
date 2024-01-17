import React, {useState} from 'react';
import './styles/Login.css'
// need to embed login into the App component to ensure that everything works
const Login = ({ handleLogin, handleSignUpClick}) => {
    const loader = document.querySelector('#loading')
    // showing loading
    function displayLoading() {
        loader.classList.add("display");
        // to stop loading after some time
        setTimeout(() => {
            loader.classList.remove("display");
        }, 5000);
    }

    // hiding loading 
    function hideLoading() {
        loader.classList.remove("display");
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

    var initialFormValues = {registeremail:'', registerpassword:''};
    const [formValue,setFormValue] = useState(initialFormValues);
    const handleInput=(e)=>{
        const {name, value} = e.target;
        setFormValue({...formValue, [name]:value})
    }
    const loginUser = async() => {
        displayLoading()
        console.log(JSON.stringify({email: formValue.loginemail , password: formValue.loginpassword}))
        const csrftoken = getCookie('csrftoken'); // CORS Token
        let res =  await fetch("http://127.0.0.1:8000/api/login", {
            mode: 'cors',
            method: "POST",
            headers: {'X-CSRFToken':csrftoken, "Content-Type": "application/json", },
            //credentials: 'include', <-- TODO: resolve
            body: JSON.stringify({email: formValue.loginemail , password: formValue.loginpassword}),

        });
        if (res.ok) {
            hideLoading()
            handleLogin()
            document.getElementById('header-login-span').innerHTML = formValue.loginemail + " | ";
            let headerDiv = document.getElementById("header-login-span");
            let logoutBtn = document.createElement('BUTTON');
            let logoutBtnText = document.createTextNode("Logout");
            logoutBtn.appendChild(logoutBtnText);
            headerDiv.appendChild(logoutBtn);
            logoutBtn.setAttribute('id', 'logoutBtn');
        }
    }
    
    return (
        <div class="login-div">
            <h1>Login</h1>
            <div id="loading"></div>
            <form class="login-form">
                <div class="login-form-items">
                    <span class="login-span"> Email: </span>
                    <input type="text" id="login-email" name="loginemail" placeholder='Enter your email' required value={formValue.loginemail} onChange={handleInput}></input><br></br>
                    <span class="login-span"> Password: </span>
                    <input type="password" id="login-password" name="loginpassword" placeholder='Enter your password' required value={formValue.loginpassword} onChange={handleInput}></input><br></br>
                    <br></br>
                    <div class="login-submit-div">
                        <input class="login-submit-btn" type="button" value="Submit"  onClick={loginUser}></input>
                    </div>
                </div>
            </form>
            <div class="no-account-div">
                    Don't have an account?  <button class="sign-up-btn" onClick={handleSignUpClick}>Sign Up Here.</button>
            </div>
        </div>
    )
}

export default Login;