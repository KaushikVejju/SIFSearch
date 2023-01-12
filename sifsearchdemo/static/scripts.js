let search_entries = [];
let add_link_endpoint = "http://127.0.0.1:8000/addentrylink/";
let add_file_endpoint = "http://127.0.0.1:8000/addentryfile/";

/* instant search config */
const searchClient = algoliasearch('MAPEN2F6CS', '798b08e289835be9a469bb40430a66c6');
const search = instantsearch({
  indexName: 'SearchEntry',
  searchClient
});


search.addWidget(
  instantsearch.widgets.searchBox({
    container:'#searchbardiv',

  })
);
search.addWidgets([
  instantsearch.widgets.configure({
    hitsPerPage: 4,
  }),
  instantsearch.widgets.refinementList({
    container: '#refinement-list',
    attribute: 'tag',
  }),
  instantsearch.widgets.hits({
    container:'#hits', 
    templates: {
      item: 
      `<div class = "hit-item">
          <p class = "testing"><b>Name: </b>{{{_highlightResult.name.value}}}</p>
          <p><b>Description: </b>{{{_highlightResult.description.value}}}</p>
          
          <button onclick="showMedia('{{link}}', '{{file}}')" class = "view-media"> View Media </button>
       </div>
      `,
    }

  }),
  instantsearch.widgets.pagination({
    container: '#pagination',
  })
])

search.start();
window.addEventListener('DOMContentLoaded', (event) => {
  document.querySelector('.ais-SearchBox-input').placeholder = "Search Something Cool."
  document.getElementById("pagination").style.display = "none";

  document.getElementById("searchbardiv").style.display = "none";
  document.getElementById("upload-success").style.display = "none";
  document.getElementById("hits").style.display = "none";
  document.getElementById('refinement-list').style.display = "none";

  document.getElementById("upload-btn-mode").style.backgroundColor = "rgb(74, 7, 103)";
  document.getElementById("paste-link").style.backgroundColor = "rgb(74, 7, 103)";

  document.getElementById("show-file").style.display = "none";
});
function showMedia(link, file) {
  if (link=="") {
    window.open(file)
  } else {
    window.open(link)
  }
}
function pasteLink () {
  document.getElementById("upload-file").style.backgroundColor = "rgb(96, 72, 192)";
  document.getElementById("paste-link").style.backgroundColor = "rgb(74, 7, 103)";
  document.getElementById("show-link").style.display = "block";
  document.getElementById("show-file").style.display = "none";
}
function uploadFile () {
  document.getElementById("upload-file").style.backgroundColor = "rgb(74, 7, 103)";
  document.getElementById("paste-link").style.backgroundColor = "rgb(96, 72, 192)";
  document.getElementById("show-link").style.display= "none";
  document.getElementById("show-file").style.display = "block";
}


/* code copied from django docs */
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

function openLink() {
  window.open()
}
function displayList() {
  document.getElementById("hits").style.display = "block";
}

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
    document.getElementById("pagination").style.display = "none";
    document.getElementById('refinement-list').style.display = "none";

  }
}

function searchMode() {
  let searchbarDiv = document.getElementById('searchbardiv');
  let hits = document.getElementById('hits');
  let refinementList = document.getElementById('refinement-list');
  if (searchbarDiv.style.display=='none' && hits.style.display == 'none' ) {
    document.getElementById("search-btn-mode").style.backgroundColor = "rgb(74, 7, 103)";
    document.getElementById("upload-btn-mode").style.backgroundColor = "rgb(96, 72, 192)";
    searchbarDiv.style.display = "block";
    hits.style.display = "block";
    refinementList.style.display = "block";
    document.getElementById("pagination").style.display = "block";
    document.getElementById("upload-div").style.display = "none";
    document.getElementById("upload-success").style.display = "none";
  }
}
 
function uploadFunction() {
  let upload_request = new XMLHttpRequest();
  const csrftoken = getCookie('csrftoken');

  let fileList = document.getElementById("myFile");
  let fileEntry = fileList.files[0];

  let entry = {
    name: document.getElementById('title').value,
    description: document.getElementById('description').value,
    link: document.getElementById('link-entry').value,
    tag: document.getElementById("tag-form").value,
  }
  
  let formData = new FormData();
  formData.append('name', document.getElementById('title').value);
  formData.append('description', document.getElementById('description').value);
  formData.append('link', document.getElementById('link-entry').value);
  formData.append('tag', document.getElementById('tag-form').value);
  console.log(document.getElementById("show-link").style.display !="none");
  if (document.getElementById("show-link").style.display !="none") {
    formData.append('link', document.getElementById('link-entry').value);
    fetch(add_link_endpoint,{
      method:'POST',
      body: formData,
      headers: {
        'X-CSRFToken':csrftoken
      }
     })
    
      console.log("HIT API");
      uploadSuccess(entry.name, entry.description)
  }
  else {
    formData.append('file',fileEntry);
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


function uploadSuccess(title,description) {
  document.getElementById("upload-div").style.display = "none";
  document.getElementById("upload-success").style.display = "block";
  document.getElementById("title-success").innerHTML = title;
  document.getElementById("descr-success").innerHTML = description

}

function goBack() {
  document.getElementById("upload-success").style.display = "none";
  document.getElementById("upload-div").style.display = "block";
  document.getElementById("upload-form").reset();

}