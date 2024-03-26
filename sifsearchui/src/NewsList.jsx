import React from "react";
import './styles/NewsList.css'

const NewsList = ({ data, ticker }) => {
    if (!data || data.length === 0) {
        return <p></p>;
    }

    return (
        <div class="news-list-div">
            Results for {ticker}
            <hr></hr>
            <ul>
                {data.map(item => (
                    <li key={item.id}>
                        <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default NewsList