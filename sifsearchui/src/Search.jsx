import React from 'react';
import './styles/Search.css';
import algoliasearch from 'algoliasearch/lite'
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
                    <p><b> View File: </b><a href={"http://127.0.0.1:8000/"+hit.file} target="_blank"> <Highlight attribute="file" hit={hit}/></a></p>
                )
            }
            {
                hit.link !== '' && (
                    <p><b>View Link: </b><a href={hit.link} target="_blank">Click </a></p>
                )
            }
        
            <p><b>Tag: </b><span class="tag-span"><Highlight attribute="tags_test" hit={hit}/></span></p>
            {

                hit.tags_test.map((item, index)=> (
                    <div key={index} style={{ border: '1px solid black' }}>
                        {item}
                    </div>
                ))
            }

        </div>
    );
  }
const Search = () => {
    return (
        <div class="search-div">
            <InstantSearch searchClient={searchClient} indexName="SearchEntry">
                <SearchBox placeholder='Search For Something Cool.'/>
                <Hits hitComponent={Hit}/>
                <Pagination/>
                <HitsPerPage
                    items={[
                    { label: '5 hits per page', value: 5, default: true },
                    ]}
                />
                <RefinementList attribute="name" />

            </InstantSearch>
        </div>
    )

}
export default Search;