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
    fetchAnimation: {
      id: "fetchAnimation",
      title: "Animation Movies",
      url: `/discover/movie?api_key=${API_KEY}&with_genres=16&page=${page_num}`,
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
