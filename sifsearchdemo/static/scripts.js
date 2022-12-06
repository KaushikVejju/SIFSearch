let search_entries = [];
window.addEventListener('DOMContentLoaded', (event) => {
  document.getElementById("upload_success").style.display = "none";
});

function uploadFunction() {
  let entry = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value
  }
  search_entries.push(entry);
  document.forms[0].reset();
  console.log(JSON.stringify(entry)); /* debugging */
  console.log(search_entries); /* debugging, making sure that values have been added into the list */
  uploadSuccess(entry.title, entry.description)
}
function uploadSuccess(title,description) {
  document.getElementById("upload_div").style.display = "none";
  document.getElementById("upload_success").style.display = "block";
  document.getElementById("title_success").innerHTML = title
  document.getElementById("descr_success").innerHTML = description

}

function goBack() {
  document.getElementById("upload_success").style.display = "none";
  document.getElementById("upload_div").style.display = "block";
}

/*
Plan for tmrw, be able to search for a specific entry and create an html element dynamically
4 hours this should take 
*/

