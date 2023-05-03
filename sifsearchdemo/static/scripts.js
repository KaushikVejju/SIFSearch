let search_entries = []; /* variable to store entries, not needed */

/* API Endpoints */
const hostName = location.hostname;
const port = location.port;
let add_link_endpoint = `http://${hostName}:${port}/addentrylink/`;
let add_file_endpoint = `http://${hostName}:${port}/addentryfile/`;
let update_endpoint =`http://${hostName}:${port}/update/`;
let delete_endpoint = `http://${hostName}:${port}/delete/`

let regHits = 0;

/* instant search config */
const searchClient = algoliasearch('MAPEN2F6CS', '798b08e289835be9a469bb40430a66c6');

const search = instantsearch({
  indexName: 'SearchEntry',
  searchClient
});

/* Adding Widgets for InstantSearch.js */
search.addWidget(
  instantsearch.widgets.searchBox({
    container:'#searchbardiv',
  })

);

search.addWidgets([
  /* number of hits per page (needed for pagination feature) */
  instantsearch.widgets.configure({
    hitsPerPage: 4,
  }),
  /* refinement list, which will filter the search entries based on adding tags */
  instantsearch.widgets.refinementList({
    container: '#refinement-list',
    attribute: 'tag',
  }),
  /* defining template for a hit */
  instantsearch.widgets
  .index({ indexName: 'SearchEntry' })
  .addWidgets([
    instantsearch.widgets.hits({
      container:'#hits', 
      templates: {
        empty: '',
        item: 
        `<div class = "hit-item">
            <button id = "edit-btn" type="button" onclick="openUpdate(this)"> Edit <i class="fa-solid fa-pen-to-square"></i></button>
            <button id = "delete-btn" type="button" onclick="openDelete(this)"><i class="fa-solid fa-trash"></i>
            </button>
            <p id = "testing" class = "testing"><b>Name: </b>{{{_highlightResult.name.value}}}</p>
            <p id = "descript"><b>Description: </b>{{{_highlightResult.description.value}}}</p>
            <p id = "tag"><b>Tag: </b>{{{tag}}}</p>
            <button onclick="showMedia('{{link}}', '{{file}}')" class = "view-media"> View Media </button>
        </div>
        `,
      }

    }),

  ]),

  instantsearch.widgets
  .index({ indexName: 'CodeBlockEntry' })
  .addWidgets([
    instantsearch.widgets.hits({
      container: '#hits-codeblocks',
      templates: {
        empty: '',
        item: 
        `<div class = "hit-item">
          <button id = "edit-btn" type="button" onclick="openUpdate(this)"> Edit <i class="fa-solid fa-pen-to-square"></i></button>
          <button id = "delete-btn" type="button" onclick="openDelete(this)"><i class="fa-solid fa-trash"></i>
          </button>
          <p id = "testing" class = "testing"><b>Notebook: </b>{{{_highlightResult.notebook.value}}}</p>
          <p id = "descript"><b>Code: </b>{{{_highlightResult.code.value}}}</p>
          <p id = "explanation"><b>Explanation: </b>{{{_highlightResult.explanation.value}}}</p>
        </div>
        `,
      },
    }),    
  ]),
    
  /* adding the pagination feature */
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
])

/* start the search process */
search.start();
/*console.log(search.renderState["SearchEntry"].searchBox);/**/

/* Some conditions when the home page is loaded */
window.addEventListener('DOMContentLoaded', (event) => {
  document.documentElement.setAttribute('data-theme', "light")
  document.querySelector('.ais-SearchBox-input').placeholder = "Search Something Cool."
  document.getElementById("pagination").style.display = "none";

  document.getElementById("searchbardiv").style.display = "none";
  document.getElementById("upload-success").style.display = "none";
  document.getElementById("hits").style.display = "none";
  document.getElementById("hits-codeblocks").style.display = "none";
  document.getElementById('display-refinement').style.display = "none";
  document.getElementById('refinement-list').style.display = "none";

  document.getElementById("upload-btn-mode").style.backgroundColor = "rgb(74, 7, 103)";
  document.getElementById("paste-link").style.backgroundColor = "rgb(74, 7, 103)";

  document.getElementById("show-file").style.display = "none";
  document.getElementById("add-tag").style.display = "none";
});

/* code for the light and dark mode button functionality */
function changeMode() {
  let theme= document.documentElement.getAttribute('data-theme');
  if (theme == "dark") {
    document.documentElement.setAttribute('data-theme', "light");
    document.getElementById("dark-light-btn").innerHTML = "<i class='fa-solid fa-moon'></i>"

  } else {
    document.documentElement.setAttribute('data-theme', "dark");
    document.getElementById("dark-light-btn").innerHTML = "<i class='fa-solid fa-sun'></i>"

  }
}

/* Function For Opening the Media for a Hit (different based on if it is a link or file) */
function showMedia(link, file) {
  if (link=="") {
    window.open(file)
  } else {
    window.open(link)
  }
}

/* Style changes when the user pastes a link */
function pasteLink () {
  document.getElementById("upload-file").style.backgroundColor = "rgb(96, 72, 192)";
  document.getElementById("paste-link").style.backgroundColor = "rgb(74, 7, 103)";
  document.getElementById("show-link").style.display = "block";
  document.getElementById("show-file").style.display = "none";
}

/* Style changes when the user uploads a file */
function uploadFile () {
  document.getElementById("upload-file").style.backgroundColor = "rgb(74, 7, 103)";
  document.getElementById("paste-link").style.backgroundColor = "rgb(96, 72, 192)";
  document.getElementById("show-link").style.display= "none";
  document.getElementById("show-file").style.display = "block";
}

/* code copied from django docs (dealing with CRSF token) */
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

/* function to display the hits list */
function displayList() {
  document.getElementById("hits").style.display = "block";
  document.getElementById("hits-codeblocks").style.display = "block";
}

/* If user wants to enter a tag */
function addTag() {
  addTagInput = document.getElementById("add-tag");
  if (addTagInput.style.display == "none") {
    addTagInput.style.display = "block"
  } else {
    addTagInput.style.display = "none"
  }
}

/* Options for the upload mode */
function uploadMode() {
  document.getElementById("upload-form").reset();
  document.getElementById("paste-link").style.backgroundColor = "rgb(74, 7, 103)";

  let uploadDiv = document.getElementById('upload-div');
  let uploadSuccess = document.getElementById('upload-success');
  if (uploadDiv.style.display=='none' || uploadSuccess.style.display == 'none' ) {
    pasteLink();
    document.getElementById("upload-btn-mode").style.backgroundColor = "rgb(74, 7, 103)";
    document.getElementById("search-btn-mode").style.backgroundColor = "rgb(96, 72, 192)";
    uploadDiv.style.display = "block";
    document.getElementById("searchbardiv").style.display = "none";
    document.getElementById("hits").style.display = "none";
    document.getElementById("hits-codeblocks").style.display = "none";
    document.getElementById("pagination").style.display = "none";
    document.getElementById('display-refinement').style.display = "none";

  }
}

/* Options for the search mode */
function searchMode() {
  let searchbarDiv = document.getElementById('searchbardiv');
  let hits = document.getElementById('hits');
  let hitsCodeblocks = document.getElementById('hits-codeblocks');
  let refinementList = document.getElementById('display-refinement');
  if (searchbarDiv.style.display=='none' && hits.style.display == 'none' ) {
    document.getElementById("search-btn-mode").style.backgroundColor = "rgb(74, 7, 103)";
    document.getElementById("upload-btn-mode").style.backgroundColor = "rgb(96, 72, 192)";
    searchbarDiv.style.display = "block";
    hits.style.display = "block";
    hitsCodeblocks.style.display = "block";
    refinementList.style.display = "block";
    document.getElementById("pagination").style.display = "block";
    document.getElementById("upload-div").style.display = "none";
    document.getElementById("upload-success").style.display = "none";
  }
}
 
/* API CALL for uploading */
function uploadFunction() {
  const csrftoken = getCookie('csrftoken');

  let fileList = document.getElementById("myFile");
  let fileEntry = fileList.files[0]; /* obtains the file that the user uploaded */
  let tagValue = document.getElementById("tag-form").value
  if (document.getElementById("add-tag").style.display != "none") {
    tagValue = document.getElementById("add-tag-input").value;
  }
  console.log(tagValue)
  /* If the user does not fill out one the fields, send an alert, and do not complete the upload */
  if (document.getElementById('title').value == "" || document.getElementById('description').value == ""
  || (document.getElementById("show-link").style.display !="none" && document.getElementById('link-entry').value=="")
  ||(document.getElementById("add-tag").style.display !="none"  && tagValue == "")) {
    window.alert("Please Fill Out ALL Fields");
  } else {
    /* If the user enters all the fields, proceed */
    let entry = {
      name: document.getElementById('title').value,
      description: document.getElementById('description').value,
      link: document.getElementById('link-entry').value,
      tag: tagValue
    }
    
    /* This FormData object will be sent to the backend */
    let formData = new FormData();
    formData.append('name', document.getElementById('title').value);
    formData.append('description', document.getElementById('description').value);
    formData.append('link', document.getElementById('link-entry').value);
    formData.append('tag', tagValue);
    
    /* the form of request is based on the whether or not a div is visible. So, if 
      the paste link  div is visible, then we will be sending that request */
    if (document.getElementById("show-link").style.display !="none") {
      formData.append('link', document.getElementById('link-entry').value);

      /* TO-DO: implement error handling */
      fetch(add_link_endpoint,{
        method:'POST',
        body: formData,
        headers: {
          'X-CSRFToken':csrftoken
        }
       })
      uploadSuccess(entry.name, entry.description)
    }
    /* User decides to upload a file and not a link */
    else {
      formData.append('file',fileEntry);
      console.log(document.getElementById("myFile").value);
      formData.append('file_name', document.getElementById("myFile").value);
      fetch(add_file_endpoint,{
        method:'POST',
        body: formData,
        headers: {
          'X-CSRFToken':csrftoken
        }
       })
      
        console.log("HIT API");
        uploadSuccess(entry.name, entry.description)
    }
    document.forms[0].reset();

  }
  /* Two different API calls: link or file */
  /* entry object defined below is not really needed */

}

/* Showing the Refinement List Options */
function showRefinementList() {
  refinList = document.getElementById('refinement-list');
  refinBtn = document.getElementById('refin-btn');
  if (refinList.style.display == 'none') {
    refinList.style.display ='block';
    refinBtn.innerHTML = "Hide Refinement List <i class='fa-solid fa-eye-slash'></i>";

  } else {
    refinList.style.display ='none';
    refinBtn.innerHTML = "Show Refinement List <i class='fa-solid fa-eye'>";
  }
}

/* When an entry is successfuly uploaded, do this */
function uploadSuccess(title,description) {
  document.getElementById("upload-div").style.display = "none";
  document.getElementById("upload-success").style.display = "block";
  document.getElementById("title-success").innerHTML = title;
  document.getElementById("descr-success").innerHTML = description

}

/* return back to the home page after uploading an entry */
function goBack() {
  document.getElementById("upload-success").style.display = "none";
  document.getElementById("upload-div").style.display = "block";
  document.getElementById("upload-form").reset();

}

/* API Call for Updating an Entry*/
var modal = document.getElementById("myModal");
let nameEntry =""; /* keeps track of the name of the search entry/hit we want to edit */
let currHit = null; /* keeps track of the search entry/hut we want to edit */

/* function for opening the update modal */
function openUpdate(btn) {
  /* need to revise the name entry when the highlight comes in */
  nameEntry = btn.parentElement.querySelector('#testing').innerHTML.replace("<b>Name: </b>","");
  nameEntry = nameEntry.replace("<mark>", "");
  nameEntry = nameEntry.replace("</mark>", "");
  currHit = btn.parentElement;
  console.log(nameEntry);
  let descriptionEntry = btn.parentElement.querySelector('#descript').innerHTML.replace("<b>Description: </b>","");
  descriptionEntry = descriptionEntry.replace("<mark>", "");
  descriptionEntry = descriptionEntry.replace("</mark>", "");
  document.getElementById("new-title").value = nameEntry;
  document.getElementById("new-description").value = descriptionEntry;
  modal.style.display = "block";

}
let modalBtn = document.getElementById("modal-btn");
/* API Call is made when the 'Update' button of the modal is clicked */
modalBtn.addEventListener("click", function() {
  let formData = new FormData();
  let newName = document.getElementById("new-title").value;
  let newDescription = document.getElementById("new-description").value;
  formData.append('name', nameEntry); /* this is needed for Django can find the SearchEntry and update it */
  formData.append('new-name', newName);
  formData.append('new-description',  newDescription); 
  const csrftoken = getCookie('csrftoken');
  fetch(update_endpoint,{
    method:'PUT', /* Note this is a PUT request */
    body: formData,
    headers: {
      'X-CSRFToken':csrftoken, /* is this needed for production? */
    }
  })
  
  modal.style.display = "none";
  currHit.querySelector('#testing').innerHTML = "<b>Name: </b>" + newName;
  currHit.querySelector('#descript').innerHTML = "<b>Description: </b>" + newDescription;
})

/* If we click outside the range of the Edit Modal, it should close */


/* Deleting an Entry Code */
let deleteNameEntry = "";
let currDeleteHit = null;
var deleteModal = document.getElementById("delete-modal");
function openDelete(btn) {
  deleteNameEntry = btn.parentElement.querySelector('#testing').innerHTML.replace("<b>Name: </b>","");
  console.log(deleteNameEntry)
  deleteNameEntry = deleteNameEntry.replace("<mark>", "");
  deleteNameEntry = deleteNameEntry.replace("</mark>", "");
  console.log(deleteNameEntry)
  currDeleteHit = btn.parentElement;
  deleteModal.style.display = "block";
}

function closeDelete() {
  deleteModal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == deleteModal) {
    deleteModal.style.display = "none";
  }
}

document.getElementById("yes-delete").addEventListener("click", function() {
  let formData = new FormData();
  formData.append('name', deleteNameEntry);
  const csrftoken = getCookie('csrftoken');
  fetch(delete_endpoint,{
    method:'DELETE', /* Note this is a PUT request */
    body: formData,
    headers: {
      'X-CSRFToken':csrftoken, /* is this needed for production? */
    }
  })
  currDeleteHit.style.display = "none";
  deleteModal.style.display = "none";

})