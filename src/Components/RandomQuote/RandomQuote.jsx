import React, { useState, useEffect } from 'react';
import './RandomQuote.css';
import twitter_icon from '../Assets/twitter.png';
import reload_icon from '../Assets/reload.png';

const RandomQuote = () => {
    const [quote, setQuote] = useState({
        text: "Difficulties increase the nearer we get to the goal.",
        author: "Johann Wolfgang von Goethe",
    });
    const [loading, setLoading] = useState(true);

    const fetchQuotes = async () => {
        try {
            const response = await fetch("https://type.fit/api/quotes");
            const data = await response.json();
            const randomQuote = data[Math.floor(Math.random() * data.length)];
            setQuote(randomQuote);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching quotes:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuotes();
    }, []);

    const handleRandomQuote = () => {
        setLoading(true);
        fetchQuotes();
    };

    const handleTwitterShare = () => {
        window.open(`https://twitter.com/intent/tweet?text=${quote.text} - ${quote.author.split(',')[0]}`);
    };

    return (
        <div>
            <header class="header">
    <div class="header-left">
        <h1>Wise Words</h1>
    </div>
    <div class="header-right">
        <span>Natchel</span>
        <a href="https://github.com/NatchelLebea/random-quote-generator" class="github-button">GitHub</a>
    </div>
</header>
            <div className='container'>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <div className="quote">{quote.text}</div>
                        <div>
                            <div className="line"></div>
                            <div className="bottom">
                                <div className="author">- {quote.author.split(',')[0]}</div>
                                <div className="icons">
                                    <img src={reload_icon} onClick={handleRandomQuote} alt="Reload Quote" />
                                    <img src={twitter_icon} onClick={handleTwitterShare} alt="Share on Twitter" />
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RandomQuote;
