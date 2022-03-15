import React from "react";
import "../App.css";

// Custom Components
import Banner from "../components/Banner";
import ItemsRow from "../components/ItemsRow";

// requests
import requests from "../lib/request";

const Browse = () => {
  const randomPageNo = Math.floor(Math.random() * 5 + 1);
  const {
    fetchNetflixOriginals,
    fetchIndianMovies,
    fetchTrending,
    fetchUpcoming,
    fetchTopRated,
    fetchActionMovies,
    fetchComedyMovies,
    fetchRomanceMovies,
    fetchAnimation,
    fetchHorrorMovies,
  } = requests(randomPageNo);

  return (
    <main>
      <Banner fetchURI={fetchNetflixOriginals} />
      <div className="all_rows__container">
        <ItemsRow
          title="NETFLIX ORIGINALS"
          fetchURI={fetchNetflixOriginals}
          isLarge
        />
        <ItemsRow
          title="Bollywood Movies"
          fetchURI={fetchIndianMovies}
          isLarge
        />
        <ItemsRow title="Trending Now" fetchURI={fetchTrending} />
        <ItemsRow title="Upcoming Movies" fetchURI={fetchUpcoming} />
        <ItemsRow title="Top Rated" fetchURI={fetchTopRated} />
        <ItemsRow title="Action Movies" fetchURI={fetchActionMovies} />
        <ItemsRow title="Comedies" fetchURI={fetchComedyMovies} />
        <ItemsRow title="Romantic Movies" fetchURI={fetchRomanceMovies} />
        <ItemsRow title="Animation Movies" fetchURI={fetchAnimation} />
        <ItemsRow title="Horror Movies" fetchURI={fetchHorrorMovies} />
        {/* 
        <ItemsRow
          title="Documentories"
          fetchURI={fetchDocumantaries}
        />
        <ItemsRow title="TV Shows" fetchURI={fetchTV} />
        <ItemsRow title="Mystery" fetchURI={fetchMystery} />
        <ItemsRow title="Western" fetchURI={fetchWestern} />
        <ItemsRow title="Sci-Fi" fetchURI={fetchSciFi} /> */}
      </div>
    </main>
  );
};

export default Browse;
