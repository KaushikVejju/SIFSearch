let search_entries = [];
let add_endpoint = "http://127.0.0.1:8000/addentry/";
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
search.addWidget(
  instantsearch.widgets.hits({
    container:'#hits', 
    hitsPerPage:4,
    templates: {
      item: 
      `<div class = "hit-item">
          <p class = "testing"><b>Name: </b>{{{_highlightResult.name.value}}}</p>
          <p><b>Description: </b>{{{_highlightResult.description.value}}}</p>
          
          <button onclick="window.open('{{link}}')" class = "view-media"> View Media </button>
       </div>
      `,
    }
  })
)
search.addWidget (
  instantsearch.widgets.pagination({
    container:'#pagination'
  }
  )
)
search.start();
window.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("pagination").style.display = "none";

  document.getElementById("searchbardiv").style.display = "none";
  document.getElementById("upload_success").style.display = "none";
  document.getElementById("hits").style.display = "none";
  document.getElementById("upload-btn-mode").style.backgroundColor = "rgb(74, 7, 103)";

});

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

function upload_mode() {
  let uploadDiv = document.getElementById('upload_div');
  let uploadSuccess = document.getElementById('upload_success');
  if (uploadDiv.style.display=='none' && uploadSuccess.style.display == 'none' ) {
    document.getElementById("upload-btn-mode").style.backgroundColor = "rgb(74, 7, 103)";
    document.getElementById("search-btn-mode").style.backgroundColor = "rgb(96, 72, 192)";
    uploadDiv.style.display = "block";
    document.getElementById("searchbardiv").style.display = "none";
    document.getElementById("hits").style.display = "none";
    document.getElementById("pagination").style.display = "none";

  }
}

function search_mode() {
  let searchbarDiv = document.getElementById('searchbardiv');
  let hits = document.getElementById('hits');
  if (searchbarDiv.style.display=='none' && hits.style.display == 'none' ) {
    document.getElementById("search-btn-mode").style.backgroundColor = "rgb(74, 7, 103)";
    document.getElementById("upload-btn-mode").style.backgroundColor = "rgb(96, 72, 192)";
    searchbarDiv.style.display = "block";
    hits.style.display = "block";
    document.getElementById("pagination").style.display = "block";
    document.getElementById("upload_div").style.display = "none";
    document.getElementById("upload_success").style.display = "none";
  }
}
 
function uploadFunction() {

  let entry = {
    name: document.getElementById('title').value,
    description: document.getElementById('description').value,
    link: document.getElementById('link_entry').value
  }
  search_entries.push(entry);
  document.forms[0].reset();
  console.log(JSON.stringify(entry)); /* debugging */
  console.log(search_entries); /* debugging, making sure that values have been added into the list */
  /* make an api call */
  let upload_request = new XMLHttpRequest();
  
  upload_request.open('POST', add_endpoint);
  upload_request.setRequestHeader("Accept", "application/json");
  upload_request.setRequestHeader("Content-Type", "application/json");
  const csrftoken = getCookie('csrftoken');

  upload_request.setRequestHeader("X-CSRFToken", csrftoken);
  upload_request.send(JSON.stringify(entry));

  console.log("HIT API");
  uploadSuccess(entry.name, entry.description,entry.link)


}


function uploadSuccess(title,description,link) {
  document.getElementById("upload_div").style.display = "none";
  document.getElementById("upload_success").style.display = "block";
  document.getElementById('link_success').href = link;
  document.getElementById("title_success").innerHTML = title;
  document.getElementById("descr_success").innerHTML = description

}

function goBack() {
  document.getElementById("upload_success").style.display = "none";
  document.getElementById("upload_div").style.display = "block";


}



/* searching for an entry dynamically */
/*
function search () {
  document.getElementById("upload_div").style.display = "none";
  document.getElementById("upload_success").style.display = "none";
  document.querySelector(".search-list").style.display = "";
  console.log("bro");
  const searchInput = document.getElementById("search-item").value;
  const item = document.querySelectorAll(".search_item")
  const titleName = document.querySelectorAll(".title_item");
  const descrName = document.querySelectorAll(".description_item");
  for (var i = 0; i < titleName.length; i++) {
    console.log(titleName[i].innerHTML)
    if(titleName[i].innerHTML.toUpperCase().indexOf(searchInput.toUpperCase()) != -1 || 
    descrName[i].innerHTML.toUpperCase().indexOf(searchInput.toUpperCase()) != -1) {
      console.log("you have reached")
      item[i].style.display = "block";
    }
    else {
      item[i].style.display = "none";
    }
  }
}

function clearsearch() {
  document.getElementById('search-item').value='';
  document.querySelector(".search-list").style.display = "none";
  document.getElementById("upload_div").style.display = "";

}


*/

