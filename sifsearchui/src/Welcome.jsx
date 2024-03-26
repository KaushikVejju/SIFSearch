// Landing Page for SIFSearch
import React, {useState, useEffect} from 'react';
import './styles/Welcome.css';
import Upload from './Upload';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch} from '@fortawesome/free-solid-svg-icons'
import Search from './Search';
import Discover from './Discover'
const Welcome = ({userEmail}) => {

    const [currentOption, setCurrentOption] = useState("upload");
    const handleButtonClick = (val) => {
        setCurrentOption(val)
    }

    return (
        <div class="welcome-div">
            <h1 class="welcome-title">Welcome to <span class="sif-title">SIFSearch <FontAwesomeIcon icon={faSearch}/></span></h1>
            <h3 class="welcome-subtitle">The Internal Search Engine for SIF</h3>
            <div class="welcome-btns">
                <button type="button" onClick={()=>handleButtonClick("upload")}>Upload</button>
                <button type = "button" onClick={()=>handleButtonClick("search")}>Search</button>
                <button type="button" onClick={()=>handleButtonClick("discover")}> Discover </button>
            </div>
            <br></br>
            {currentOption === "upload" && (
               <Upload userEmail = {userEmail}></Upload>
            )}

            {currentOption === "search" && (
                <Search></Search>
            )}

            {currentOption === "discover" && (
                <Discover></Discover>
            )}
            <br></br>
        </div>
    );
}
export default Welcome;