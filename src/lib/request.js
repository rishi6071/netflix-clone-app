import { getFromCache } from "./cache";

// genres images
import Action from "../media/Genres/Action.jpg";
import Adventure from "../media/Genres/Adventure.jpg";
import Animation from "../media/Genres/Animation.jpg";
import Comedy from "../media/Genres/Comedy.jpg";
import Crime from "../media/Genres/Crime.jpg";
import Documentry from "../media/Genres/Documentry.jpg";
import Drama from "../media/Genres/Drama.jpg";
import Family from "../media/Genres/Family.jpg";
import Fantasy from "../media/Genres/Fantasy.jpg";
import History from "../media/Genres/History.jpg";
import Horror from "../media/Genres/Horror.jpg";
import Music from "../media/Genres/Music.jpg";
import Mystery from "../media/Genres/Mystery.jpg";
import Romance from "../media/Genres/Romance.jpg";
import SciFi from "../media/Genres/SciFi.jpg";
import Thriller from "../media/Genres/Thriller.jpg";
import TvMovie from "../media/Genres/TvMovie.jpg";
import War from "../media/Genres/War.jpg";
import Western from "../media/Genres/Western.jpg";

// APIs using on Home Page to render Initial Data
const requests = (page_num = 1) => {
  const API_KEY = process.env.REACT_APP_PUBLIC_KEY;
  
  let lang = getFromCache("language") || "";
  if (lang) lang = `&with_original_language=${lang}`;

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
      url: `/movie/top_rated?api_key=${API_KEY}${lang}&page=${page_num}`,
    },
    fetchActionMovies: {
      id: "fetchActionMovies",
      title: "Action Movies",
      genre: "Action",
      img: Action,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=28${lang}&page=${page_num}`,
    },
    fetchComedyMovies: {
      id: "fetchComedyMovies",
      title: "Comedies",
      genre: "Comedy",
      img: Comedy,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=35${lang}&page=${page_num}`,
    },
    fetchHorrorMovies: {
      id: "fetchHorrorMovies",
      title: "Horror Movies",
      genre: "Horror",
      img: Horror,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=27${lang}&page=${page_num}`,
    },
    fetchSciFi: {
      id: "fetchSciFi",
      title: "Science Fiction",
      genre: "Science Fiction",
      img: SciFi,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=878${lang}&page=${page_num}`,
    },
    fetchAnimation: {
      id: "fetchAnimation",
      title: "Animation Movies",
      genre: "Animation",
      img: Animation,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=16&page=${page_num}`,
    },
    fetchRomanceMovies: {
      id: "fetchRomanceMovies",
      title: "Romantic Movies",
      genre: "Romance",
      img: Romance,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=10749${lang}&page=${page_num}`,
    },
    fetchDocumantaries: {
      id: "fetchDocumantaries",
      title: "Documentories",
      genre: "Documentry",
      img: Documentry,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=99&page=${page_num}`,
    },
    fetchMystery: {
      id: "fetchMystery",
      title: "Mystery",
      genre: "Mystery",
      img: Mystery,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=9648${lang}&page=${page_num}`,
    },
    fetchWestern: {
      id: "fetchWestern",
      title: "Western",
      genre: "Western",
      img: Western,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=37&page=${page_num}`,
    },
    fetchAdventure: {
      id: "fetchAdventure",
      title: "Adventure",
      genre: "Adventure",
      img: Adventure,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=12${lang}&page=${page_num}`,
    },
    fetchCrime: {
      id: "fetchCrime",
      title: "Crime",
      genre: "Crime",
      img: Crime,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=80${lang}&page=${page_num}`,
    },
    fetchDrama: {
      id: "fetchDrama",
      title: "Drama",
      genre: "Drama",
      img: Drama,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=18${lang}&page=${page_num}`,
    },
    fetchFamily: {
      id: "fetchFamily",
      title: "Family",
      genre: "Family",
      img: Family,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=10751${lang}&page=${page_num}`,
    },
    fetchFantasy: {
      id: "fetchFantasy",
      title: "Fantasy",
      genre: "Fantasy",
      img: Fantasy,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=14${lang}&page=${page_num}`,
    },
    fetchHistory: {
      id: "fetchHistory",
      title: "History",
      genre: "History",
      img: History,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=36${lang}&page=${page_num}`,
    },
    fetchMusic: {
      id: "fetchMusic",
      title: "Musical Movies",
      genre: "Music",
      img: Music,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=10402${lang}&page=${page_num}`,
    },
    fetchTvMovie: {
      id: "fetchTvMovie",
      title: "TV Movies",
      genre: "TV Movie",
      img: TvMovie,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=10770&page=${page_num}`,
    },
    fetchThriller: {
      id: "fetchThriller",
      title: "Thriller Movies",
      genre: "Thriller",
      img: Thriller,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=53${lang}&page=${page_num}`,
    },
    fetchWar: {
      id: "fetchWar",
      title: "War Movies",
      genre: "War",
      img: War,
      url: `/discover/movie?api_key=${API_KEY}&with_genres=10752${lang}&page=${page_num}`,
    },
  };
};

// APIs using to fetch the Item Details & Similar Content
const item_requests = (id, media_type = "movie") => {
  const API_KEY = process.env.REACT_APP_PUBLIC_KEY;
  return {
    fetchDetails: `/${media_type}/${id}?api_key=${API_KEY}`,
    fetchImages: `/${media_type}/${id}/images?api_key=${API_KEY}`,
    fetchVideos: `/${media_type}/${id}/videos?api_key=${API_KEY}`,
    fetchSimilarMovies: `/${media_type}/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`,
    fetchWatchProviders: `/${media_type}/${id}/watch/providers?api_key=${API_KEY}`,
    fetchCredits: `/${media_type}/${id}/credits?api_key=${API_KEY}`,
  };
};

// API using for Search Request
const search_requests = (query, page_num) => {
  const API_KEY = process.env.REACT_APP_PUBLIC_KEY;
  return {
    fetchSearch: `/search/movie?api_key=${API_KEY}&query=${query}&page=${page_num}`,
  };
};

// Frequently Asked Questions
const faqs = [
  {
    id: 1,
    desc: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices. <br /> You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!",
    title: "What is Netflix?",
  },
  {
    id: 2,
    desc: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 149 to ₹ 649 a month. No extra costs, no contracts.",
    title: "How Much does Netflix Cost?",
  },
  {
    id: 3,
    desc: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. <br /> You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
    title: "Where can I watch?",
  },
  {
    id: 4,
    desc: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
    title: "How do I cancel?",
  },
  {
    id: 5,
    desc: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
    title: "What can I watch on Netflix?",
  },
  {
    id: 6,
    desc: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. <br /> Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
    title: "Is Netflix good for kids?",
  },
];

export default requests;
export { item_requests, search_requests, faqs };
