// Landing Page for SIFSearch
import React, {useState, useEffect} from 'react';
import './styles/NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser} from '@fortawesome/free-solid-svg-icons'

const NavBar= ({showLogout, handleLogout,userEmail}) => {

    const logoutSifSearch = async(e) => {
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
        e.preventDefault();
        const csrftoken = getCookie('csrftoken'); // CORS Token
        let res =  await fetch("http://127.0.0.1:8000/api/logout", {
            mode: 'cors',
            method: "POST",
            headers: {'X-CSRFToken':csrftoken,  "Content-Type": "application/json", },
            credentials: 'include',
        });
        if (res.ok) {
            await setTimeout(3000); 
            handleLogout();
        }
    }

    /* add a state to toggle between the logged in and logged out user */
    return (
        <div class="navbar">
            <p>Welcome to SIFSearch<FontAwesomeIcon icon={faSearch}/></p>
            {
                showLogout ? (
                <div>
                    <span class = "user-account"><FontAwesomeIcon icon={faUser}/> {userEmail}</span>
                    <button class="logout-btn" onClick={logoutSifSearch}>Logout</button>
                </div>
                ):(<div></div>)
            }

        </div>
    );
}
export default NavBar;