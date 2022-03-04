const API_KEY = process.env.REACT_APP_PUBLIC_KEY;

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumantaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  fetchMystery: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
  fetchSciFi: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  fetchWestern: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
  fetchAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  fetchTV: `/discover/movie?api_key=${API_KEY}&with_genres=10770`,
};

const item_requests = (id, API_KEY) => {
  return {
    fetchDetails: `/movie/${id}?api_key=${API_KEY}`,
    fetchImages: `/movie/${id}/images?api_key=${API_KEY}&language=en-US`,
    fetchVideos: `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
    fetchSimilarMovies: `/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`,
  };
};

export default requests;
export { item_requests };
