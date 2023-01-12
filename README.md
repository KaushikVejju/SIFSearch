# SIF Search (Proof of Concept)
<b>SIFSearch</b> is an internal search engine designed for the Smith Investment Fund, a student-run organization at the University of Maryland. This Django-based application aims to provide members of the club with a more streamlined way of searching for quantitative finance related material, whether it be articles, Jupyter notebooks, and past projects that club members have completed. It accomplishes this by interfacing with Algolia's Search API to enable users to make quick searches for the forms of media they have uploaded onto this site.
<br/>
As of now, a basic <b>MVP</b> of the application has been created. Users are able to upload media in the form of links and different file types (pdfs, jpeg, etc) and search for the uploaded entries, which are stored in the Django Admin database. Along with a search bar to make queries, the UI for this application includes a refinement list that filters search entries based on their selected tags. In the future, we hope to implement features such as users editing their own entries and being able to add their own tags.
## SIFSearch Demo:
https://user-images.githubusercontent.com/68911800/212112632-e38ecaef-ab72-4fc4-a003-30bf1e6d6e4f.mp4


