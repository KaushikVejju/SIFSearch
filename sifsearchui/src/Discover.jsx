import React, {useState, useEffect} from 'react';
import './styles/Discover.css'
import NewsList from './NewsList';
const Discover = () => {
    const [newsData, setNewsData] = useState([]);
    const [ticker, setTicker] = useState('');
    const [startDate, setStartDate] = useState('');

    // Handler to update state on input change
    const handleTickerChange = (e) => {
        setTicker(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };


    const getNewsInfo = () => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};
        var marketURL = `https://api.marketaux.com/v1/news/all?symbols=${ticker}&published_after=${startDate}&language=en&api_token=Ql2zyC7Oxfq0UgSFVwp1ED1zajnCSpktVOEUtfax`

        fetch(marketURL, options)
        .then(response => response.json())
        .then(response => setNewsData(response.data))
        .catch(err => console.error(err));
    }
    return (

        
        <div class="discover-div">
            <h3>Enter a ticker below to see any news about it</h3>
            <div className="ticker-input-div">
                <span>Ticker: <input name="ticker" type="text" placeholder="NVDA" value={ticker} onChange={handleTickerChange}></input></span>
                <span>Start Date: <input name="start" type="text" placeholder="YYYY-MM-DD" value={startDate} onChange={handleStartDateChange}></input></span>
                <button className="submit-ticker-btn" onClick={getNewsInfo}>View Info</button>
            </div><br></br>
            {/* On successful API response, show the news articles and information associated with the ticker*/}
            <div>
                {setNewsData != [] && (<NewsList data={newsData} ticker={ticker}/>)}
            </div>

        </div>
    )

}

export default Discover;