import React, {useState, useEffect} from 'react';
import './styles/Discover.css'
import NewsList from './NewsList';
const Discover = () => {
    const [newsData, setNewsData] = useState([]);
    const [ticker, setTicker] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Handler to update state on input change
    const handleTickerChange = (e) => {
        setTicker(e.target.value);
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };


    const getNewsInfo = () => {
        const options = {method: 'GET', headers: {accept: 'application/json'}};
        fetch(`https://api.benzinga.com/api/v2/news?token=45928b8940684e02b51200847247ebc4&pageSize=5&tickers=${ticker}&dateFrom=${startDate}&dateTo=${endDate}`, options)
        .then(response => response.json())
        .then(response => setNewsData(response))
        .catch(err => console.error(err));
    }
    return (

        
        <div class="discover-div">
            <h3>Enter a ticker below to see any news about it</h3>
            <div className="ticker-input-div">
                <span>Ticker: <input name="ticker" type="text" placeholder="NVDA" value={ticker} onChange={handleTickerChange}></input></span>
                <span>Start Date: <input name="start" type="text" placeholder="YYYY-MM-DD" value={startDate} onChange={handleStartDateChange}></input></span>
                <span>End Date: <input name="end" type="text" placeholder="YYYY-MM-DD" value={endDate} onChange={handleEndDateChange}></input></span>
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