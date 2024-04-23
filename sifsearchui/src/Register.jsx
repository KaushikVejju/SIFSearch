import React, {useState}from 'react';
import './styles/Register.css'
// need to embed login into the App component to ensure that everything works
const Register = ({handleRegister}) => {

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

    const [errorMessage, setErrorMessage] = useState(""); // New state for error message
    const handleInput=(e)=>{
        const {name, value} = e.target;
        setFormValue({...formValue, [name]:value})
    }
    const registerUser = async() => {
        console.log(JSON.stringify({name: formValue.registername, email: formValue.registeremail , password: formValue.registerpassword}))
        const csrftoken = getCookie('csrftoken'); // CORS Token
        let res =  await fetch("http://127.0.0.1:8000/api/register", {
            mode: 'cors',
            method: "POST",
            credentials: 'include',
            headers: {'X-CSRFToken':csrftoken,  "Content-Type": "application/json", },
            body: JSON.stringify({email: formValue.registeremail , password: formValue.registerpassword})
        });
        if (res.ok) {
            handleRegister()
        } else {
            setErrorMessage("Unable to register. Please check your credentials.")
        }
    }
    return (
        <div class="register-div">
            <h2>Create Your Account</h2>
            <form class="register-form">
                <div class="register-form-items">
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                    <input type="text" id="register-email" name="registeremail" placeholder='Enter your email' required value={formValue.registeremail} onChange={handleInput}></input><br></br>
                    <input type="password" id="register-password" name="registerpassword" placeholder='Enter your password' required value={formValue.registerpassword} onChange={handleInput}></input><br></br>
                    <br></br>
                    <div class="register-submit-div">
                        <input class="register-submit-btn" type="button" value="Create Account" onClick={registerUser}></input>
                    </div>
                    <button onClick={handleRegister}> Back To Login </button>
                </div>
            </form>
        </div>
    )
}

export default Register;