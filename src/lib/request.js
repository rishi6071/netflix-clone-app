// APIs using on Home Page to render Initial Data
const requests = (page_num) => {
  const API_KEY = process.env.REACT_APP_PUBLIC_KEY;
  return {
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&page=${page_num}`,
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&region=IN&language=hi-IN&page=${page_num}`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&region=IN&language=hi-IN&page=${page_num}`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&page=${page_num}`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&page=${page_num}`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&page=${page_num}`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&page=${page_num}`,
    fetchDocumantaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&page=${page_num}`,
    fetchMystery: `/discover/movie?api_key=${API_KEY}&with_genres=9648&page=${page_num}`,
    fetchSciFi: `/discover/movie?api_key=${API_KEY}&with_genres=878&page=${page_num}`,
    fetchWestern: `/discover/movie?api_key=${API_KEY}&with_genres=37&page=${page_num}`,
    fetchAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16&page=${page_num}`,
    fetchTV: `/discover/tv?api_key=${API_KEY}&page=${page_num}`,
  };
};

// APIs using to fetch the Item Details & Similar Content
const item_requests = (id) => {
  const API_KEY = process.env.REACT_APP_PUBLIC_KEY;
  return {
    fetchDetails: `/movie/${id}?api_key=${API_KEY}`,
    fetchImages: `/movie/${id}/images?api_key=${API_KEY}&language=en-US`,
    fetchVideos: `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
    fetchSimilarMovies: `/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
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
