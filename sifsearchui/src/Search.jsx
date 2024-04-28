import React from 'react';
import './styles/Search.css';
import algoliasearch from 'algoliasearch/lite'
import { useState } from 'react';
import { InstantSearch, RefinementList, SearchBox, Hits, Highlight, Pagination, HitsPerPage} from 'react-instantsearch';

const searchClient = algoliasearch('AVSX85BFB4', '07dc244522ff0f29972b57e2a894e408');


// for the hits, we can loop through the items and display them in their own tag component
function Hit({ hit }) {
    
    return (
        <div class="hit">
            <p><b>Name: </b><Highlight attribute="name" hit={hit}/></p>
            <p><b>Description: </b><Highlight attribute="description" hit={hit}/></p>
            {
                hit.file != '' && (
                    <p><b> View File: </b><a href={`${process.env.process.env.REACT_APP_HOSTNAME}/${hit.file}`} target="_blank"> <Highlight attribute="file" hit={hit}/> Click To View</a></p>
                )
            }
            {
                hit.link !== '' && (
                    <p><b>View Link: </b><a href={hit.link} target="_blank">Click To View</a></p>
                )
            }
            <div class="tags_div">
                 <div><p><b>Tag: </b></p></div>
                 <div class="tag_container">
                    {

                        hit.tags_test.map((item, index)=> (
                            <div class="tag_item" key={index}>
                                {item}
                        </div>))
                    }
                 </div>
            </div>
            <div class="username-info-container"><div class="username-info"><Highlight attribute="user" hit={hit}/></div></div>
        </div>
    );
  }


// Revise CSS for the Search Component
const Search = () => {
    const [showRefinement, setRefinement] = useState(false);
    return (
        <div class="search-div">
            <InstantSearch searchClient={searchClient} indexName="SearchEntry">
                <SearchBox placeholder='Search For Something Cool.'/>
                <div>
                    <button class= "toggle-button" onClick={()=>setRefinement(!showRefinement)}>{showRefinement? "Close Refinement List" : "Show Refinement List"}</button>
                {showRefinement && <RefinementList attribute='tags_test'/>}
                </div>
                <Hits hitComponent={Hit}/>
                <Pagination/>
                <HitsPerPage
                    items={[
                    { label: '5 hits per page', value: 5, default: true },
                    ]}
                />

            </InstantSearch>
        </div>
    )
}
export default Search;