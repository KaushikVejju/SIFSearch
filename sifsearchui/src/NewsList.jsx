import React from "react";
import './styles/NewsList.css'

const NewsList = ({ data, ticker }) => {
    if (!data || data.length === 0) {
        return <p></p>;
    }

    return (
        <div class="news-list-div">
            Results for <b>{ticker}</b>
            <hr></hr>
            <ul>
                {data.map(item => (
                    <li key={item.uuid}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a><br></br>
                        <b>Description:</b>{item.description}
                        <hr className="news-list-div-hr"></hr>
                        <b>Source:</b> {item.source} <br/>
                        <b>Created:</b> {item.published_at}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default NewsList