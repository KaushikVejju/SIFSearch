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
                    <li key={item.id}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a><br></br>
                        <hr className="news-list-div-hr"></hr>
                        <b>Created:</b> {item.created}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default NewsList