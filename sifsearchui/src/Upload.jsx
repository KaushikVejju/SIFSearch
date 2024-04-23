import React, {useState} from 'react';
import './styles/Upload.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import Select from "react-select";

/* code copied from django docs (dealing with CRSF token) */
const Upload = ({userEmail}) => {

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
        // Options for the tag list
    const tagList  = [
        {value:"crypto", label:"Crypto"},
        {value:"alpha", label:"Alpha Strategies"},
        {value:"research", label:"Research"},
        {value:"infra", label:"Infrastructure"},
        {value:"internal", label:"Internal Tools"},
        {value:"misc", label:"Miscellaneous"}
    ]
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [submissionConfirmed, setSubmissionConfirmed] = useState(false);

    function handleSelect(data) {
        setSelectedOptions(data);
    }
    var initialFormValues = {name:'', description:'', link:'',tags:''};
    const [formValue,setFormValue] = useState(initialFormValues);
    const handleInput=(e)=>{
        const {name, value} = e.target;
        setFormValue({...formValue, [name]:value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('user', userEmail); 
        formData.append('name',formValue.name);
        formData.append('description',formValue.description);
        formData.append('link', formValue.link);
        formData.append('tags_test', selectedOptions.map(x => x.label));
        if (document.getElementById('uploadedFile').files.length === 0) {
            formData.append('file', '');
        } else {
            formData.append('file', document.getElementById('uploadedFile').files[0]);
        }

        const csrftoken = getCookie('csrftoken'); // CORS Token
        let res =  await fetch("http://127.0.0.1:8000/upload", {
            mode: 'cors',
            method: "POST",
            headers: {'X-CSRFToken':csrftoken},
            credentials: 'include',
            body: formData
        });
        if (res.ok) {
            console.log(res.body)
            setSubmissionConfirmed(true) //reset to original values
            setSelectedOptions() // UI changes to tag selection
        }
    }
    const handleGoBack = () => {
        // Set the state to return to the upload form
        setSubmissionConfirmed(false);
        setFormValue(initialFormValues);

    };
    if (submissionConfirmed) {
        return (
          <div>
            <h2>Upload Confirmed!</h2>
            <button class="goback-btn" onClick={handleGoBack}>Go Back to Upload</button>
          </div>
        );
    }

    return (

        // after lunch, work on the tag option, should be a drop down, where users can select mutliple tags at once
        <div class="upload-div">
            <h2>Upload  <FontAwesomeIcon icon={faUpload} /></h2>
            <div class="upload-options">
                <form onSubmit={handleSubmit} enctype = "multipart/form-data">
                    <span class="form-span">Name*</span>
                    <input type="text" id="name" name="name" placeholder='Name your upload' required value={formValue.name} onChange={handleInput}></input><br></br>
                    <span class="form-span">Description*</span>
                    <input type="text" id="description" name="description" placeholder='Describe your upload' required value={formValue.description} onChange={handleInput}></input><br></br>
                    <span class="form-span">File?</span><input type="file" id="uploadedFile" name="uploadedFile" onChange={handleInput}></input> <br></br>
                    <span class="form-span">Link?</span> <input type="text" id="link" name="link" placeholder='Include a link if needed'  value={formValue.link} onChange={handleInput}></input> <br></br>
                    <span class="form-span">Tag*</span><br></br>
                    <div class="dropdown">
                        <Select
                            options={tagList}
                            placeholder="Select tag"
                            value={selectedOptions}
                            onChange={handleSelect}
                            isSearchable={true}
                            isMulti
                        />
                    </div>
                    <div class="submit-div">
                        <input class="submit-btn" type="submit" value="Submit"></input>
                    </div>
                </form>
            </div>            
        </div>

    );
}

export default Upload;