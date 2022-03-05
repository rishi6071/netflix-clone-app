import React from "react";
import "../App.css";

// Custom Components
import Banner from "./Banner";
import ItemsRow from "./ItemsRow";

// requests
import requests from "../lib/request";

const Browse = () => {
  return (
    <>
      <Banner fetchURI={requests.fetchNetflixOriginals} />
      <div className="all_rows__container">
        <ItemsRow
          title="NETFLIX ORIGINALS"
          fetchURI={requests.fetchNetflixOriginals}
          isLarge
        />
        <ItemsRow title="Trending Now" fetchURI={requests.fetchTrending} />
        <ItemsRow title="Top Rated" fetchURI={requests.fetchTopRated} />
        <ItemsRow title="TV Shows" fetchURI={requests.fetchTV} />
        <ItemsRow title="Action Movies" fetchURI={requests.fetchActionMovies} />
        <ItemsRow title="Comedies" fetchURI={requests.fetchComedyMovies} />
        <ItemsRow
          title="Romantic Movies"
          fetchURI={requests.fetchRomanceMovies}
        />
        <ItemsRow title="Animation Movies" fetchURI={requests.fetchAnimation} />
        <ItemsRow title="Horror Movies" fetchURI={requests.fetchHorrorMovies} />
        <ItemsRow
          title="Documentories"
          fetchURI={requests.fetchDocumantaries}
        />
        {/* <ItemsRow title="Mystery" fetchURI={requests.fetchMystery} />
        <ItemsRow title="Western" fetchURI={requests.fetchWestern} />
        <ItemsRow title="Sci-Fi" fetchURI={requests.fetchSciFi} /> */}
      </div>
    </>
  );
};

export default Browse;
