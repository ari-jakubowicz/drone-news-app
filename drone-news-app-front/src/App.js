import React, { useEffect, useState } from 'react'
import "./App.css";

function App() {

  const [search, setSearch] = useState();
  const [backendData, setBackendData] = useState(() => {
    const saved = localStorage.getItem("articles");
    const initialValue = JSON.parse(saved);
    return initialValue || "";
  });

  
  const callApi = () => {
    fetch("/api").then(
      response => response.json()
      ).then(
        data => {
          setBackendData(data.data);
          localStorage.clear();
          localStorage.setItem("articles", JSON.stringify(data.data));
          const today = new Date(Date.now());
          console.log("last data update: " + today); 
          localStorage.setItem("last_update", today);
        }
      )
    }
    
    
    const updateArticles = () => {
    localStorage.clear("articles");
    callApi();
  }

  const handleInput = (e) => {
    setSearch(e.target.value);
  };
  
  const handleSearch = (e) => {
    fetch("http://localhost:5000/search/" + search)
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
    };

    const truncateArticleContent = (content) => {
      return (content.length > 200) ? content.substring(0, 200) : content;
    }
    
    useEffect(() => {
      callApi();
      let interval = setInterval(() => {
        callApi();
      }, 90000);
      if (localStorage.getItem("articles")) {
        console.log("Using local storage");
        setBackendData(JSON.parse(localStorage.getItem("articles")));
      } else {
        console.log("Using API");
        //callApi();
      }
      return () => {
        clearInterval(interval);
      };
    },[])

 return (
 	<div className="App">
    <h1>Last Drone News</h1>
    <input onChange={handleInput} placeholder="Search news"></input>
    <button onClick={handleSearch}>Search</button>
    <button onClick={updateArticles}> Update data </button>
     {(typeof backendData.articles === "undefined") ? (
       <p>Loading...</p>
     ): (
       backendData.articles.map((article, i) => (
          <div key={backendData.articles.indexOf(article)} className='headline-container'>
            <span className='headline-title'> {article.title} <a className='secondary-text' href={article.url}> To full article </a> </span>
            <span className='content'> {truncateArticleContent(article.content)} </span>
            <span className='author'> 
              <span style={{textTransform: "capitalize"}}> By </span>
              {article.author} 
            </span>
          </div>
       ))
     )}
 	</div>
 );

}

export default App;
