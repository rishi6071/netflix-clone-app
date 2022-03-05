const API_KEY = process.env.REACT_APP_PUBLIC_KEY;
const page_num = Math.floor(Math.random() * 10 + 1);

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US&page=${page_num}`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213&page=${page_num}`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page_num}`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28&page=${page_num}`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35&page=${page_num}`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27&page=${page_num}`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749&page=${page_num}`,
  fetchDocumantaries: `/discover/movie?api_key=${API_KEY}&with_genres=99&page=${page_num}`,
  fetchMystery: `/discover/movie?api_key=${API_KEY}&with_genres=9648&page=${page_num}`,
  fetchSciFi: `/discover/movie?api_key=${API_KEY}&with_genres=878&page=${page_num}`,
  fetchWestern: `/discover/movie?api_key=${API_KEY}&with_genres=37&page=${page_num}`,
  fetchAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16&page=${page_num}`,
  fetchTV: `/discover/movie?api_key=${API_KEY}&with_genres=10770&page=${page_num}`,
};

const item_requests = (id, API_KEY) => {
  return {
    fetchDetails: `/movie/${id}?api_key=${API_KEY}`,
    fetchImages: `/movie/${id}/images?api_key=${API_KEY}&language=en-US`,
    fetchVideos: `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`,
    fetchSimilarMovies: `/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`,
  };
};

const faq_request = "https://api.npoint.io/85f2406f3ff60e1bab50";

export default requests;
export { item_requests, faq_request };
