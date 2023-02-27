// APIs using on Home Page to render Initial Data
const requests = (page_num) => {
  const API_KEY = process.env.REACT_APP_PUBLIC_KEY;

  return {
    fetchNetflixOriginals: {
      id: "fetchNetflixOriginals",
      title: "NETFLIX ORIGINALS",
      url: `/discover/tv?api_key=${API_KEY}&with_networks=213&page=${page_num}`,
    },
    fetchIndianMovies: {
      id: "fetchIndianMovies",
      title: "Bollywood Movies",
      url: `/discover/movie?api_key=${API_KEY}&region=IN&language=hi-IN&with_original_language=hi&page=${page_num}`,
    },
    fetchTrending: {
      id: "fetchTrending",
      title: "Trending Now",
      url: `/trending/all/week?api_key=${API_KEY}&page=${page_num}`,
    },
    fetchUpcoming: {
      id: "fetchUpcoming",
      title: "Upcoming Movies",
      url: `/movie/upcoming?api_key=${API_KEY}&page=${page_num}`,
    },
    fetchTopRated: {
      id: "fetchTopRated",
      title: "Top Rated",
      url: `/movie/top_rated?api_key=${API_KEY}&page=${page_num}`,
    },
    fetchActionMovies: {
      id: "fetchActionMovies",
      title: "Action Movies",
      url: `/discover/movie?api_key=${API_KEY}&with_genres=28&page=${page_num}`,
    },
    fetchComedyMovies: {
      id: "fetchComedyMovies",
      title: "Comedies",
      url: `/discover/movie?api_key=${API_KEY}&with_genres=35&page=${page_num}`,
    },
    fetchHorrorMovies: {
      id: "fetchHorrorMovies",
      title: "Horror Movies",
      url: `/discover/movie?api_key=${API_KEY}&with_genres=27&page=${page_num}`,
    },
    fetchSciFi: {
      id: "fetchSciFi",
      title: "Science Fiction",
      url: `/discover/movie?api_key=${API_KEY}&with_genres=878&page=${page_num}`,
    },
    // fetchRomanceMovies: {
    //   id: "fetchRomanceMovies",
    //   title: "Romantic Movies",
    //   url: `/discover/movie?api_key=${API_KEY}&with_genres=10749&page=${page_num}`,
    // },
    // fetchDocumantaries: {
    //   id: "fetchDocumantaries",
    //   title: "Documentories",
    //   url: `/discover/movie?api_key=${API_KEY}&with_genres=99&page=${page_num}`,
    // },
    // fetchMystery: {
    //   id: "fetchMystery",
    //   title: "Mystery",
    //   url: `/discover/movie?api_key=${API_KEY}&with_genres=9648&page=${page_num}`,
    // },
    // fetchWestern: {
    //   id: "fetchWestern",
    //   title: "Western",
    //   url: `/discover/movie?api_key=${API_KEY}&with_genres=37&page=${page_num}`,
    // },
    fetchAnimation: {
      id: "fetchAnimation",
      title: "Animation Movies",
      url: `/discover/movie?api_key=${API_KEY}&with_genres=16&page=${page_num}`,
    },
    // fetchTV: {
    //   id: "fetchTV",
    //   title: "TV Shows",
    //   url: `/discover/tv?api_key=${API_KEY}&page=${page_num}`,
    // },
  };
};

// APIs using to fetch the Item Details & Similar Content
const item_requests = (id) => {
  const API_KEY = process.env.REACT_APP_PUBLIC_KEY;
  return {
    fetchDetails: `/movie/${id}?api_key=${API_KEY}`,
    fetchImages: `/movie/${id}/images?api_key=${API_KEY}`,
    fetchVideos: `/movie/${id}/videos?api_key=${API_KEY}`,
    fetchSimilarMovies: `/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
    fetchWatchProviders: `/movie/${id}/watch/providers?api_key=${API_KEY}`,
    fetchCredits: `/movie/${id}/credits?api_key=${API_KEY}`,
  };
};

// API using for Search Request
const search_requests = (query, page_num) => {
  const API_KEY = process.env.REACT_APP_PUBLIC_KEY;
  return {
    fetchSearch: `/search/multi?api_key=${API_KEY}&query=${query}&page=${page_num}`,
  };
};

// API using to render static FAQs on Home Page
const faq_request = "https://api.npoint.io/85f2406f3ff60e1bab50";

export default requests;
export { item_requests, search_requests, faq_request };
