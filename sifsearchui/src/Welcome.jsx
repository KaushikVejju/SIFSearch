// Landing Page for SIFSearch
import React, {useState, useEffect} from 'react';
import './styles/Welcome.css';
import Upload from './Upload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import Search from './Search';
const Welcome = ({handleLogout}) => {

    document.getElementById('logoutBtn').addEventListener("click", function () {
        handleLogout();
    })
    const [currentOption, setCurrentOption] = useState(false);
    const handleButtonClick = (val) => {
        setCurrentOption(val)
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
    }

    
    
    return (
        <div class="welcome-div">
            <h1 class="welcome-title">Welcome to <span class="sif-title">SIFSearch <FontAwesomeIcon icon={faSearch}/></span></h1>
            <h3 class="welcome-subtitle">The Internal Search Engine for SIF</h3>
            <div class="welcome-btns">
                <button type="button" onClick={()=>handleButtonClick(false)}>Upload</button>
                <button type = "button" onClick={()=>handleButtonClick(true)}>Search</button>
            </div>
            <br></br>
            {currentOption === false && (
               <Upload></Upload>
            )}

            {currentOption === true && (
                <Search></Search>
            )}
            <br></br>
        </div>
    );
}
export default Welcome;