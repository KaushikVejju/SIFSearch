let search_entries = [];
/*
let mainDiv = document.querySelector('.welcomediv');
let searchDiv = document.createElement('div');
searchDiv.classList.add('search-list');
*/

window.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("upload_success").style.display = "none";
});

let mainDiv = document.querySelector('.welcomediv');
let searchDiv = document.createElement('div');
searchDiv.classList.add('search-list');
mainDiv.appendChild(searchDiv);


function uploadFunction() {

  let entry = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    link: document.getElementById('link_entry').value
  }
  search_entries.push(entry);
  document.forms[0].reset();
  console.log(JSON.stringify(entry)); /* debugging */
  console.log(search_entries); /* debugging, making sure that values have been added into the list */
  addSearchEntry(entry.title, entry.description,entry.link)
  uploadSuccess(entry.title, entry.description,entry.link)

}
function uploadSuccess(title,description,link) {
  
  document.querySelector(".search-list").style.display = "none";
  document.getElementById("upload_div").style.display = "none";
  document.getElementById("upload_success").style.display = "block";
  document.getElementById('link_success').href = link;
  document.getElementById("title_success").innerHTML = title;
  document.getElementById("descr_success").innerHTML = description

}

function goBack() {
  document.getElementById("upload_success").style.display = "none";
  document.getElementById("upload_div").style.display = "block";
  document.querySelector(".search-list").style.display = "none";

}


function addSearchEntry(title, description,link) {

  console.log("bro");
  let searchEntryDetails = `
        <div id = "search_entry" class = "search_item"> 
            <br>
            <p class = "title_item">${title}</p>
            <p class = "description_item">${description}</p>
            <a href="${link}" target="_blank">Link to Media</a>
        </div>
        <br>
  `;
  searchDiv.insertAdjacentHTML('beforeend',searchEntryDetails);

}

/* searching for an entry dynamically */

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




