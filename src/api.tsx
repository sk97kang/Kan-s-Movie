import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  timeout: 1000,
});

api.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params["api_key"] = "10923b261ba94d897ac6b81148314a3f";
  return config;
});

let language = "en-US";

export const changeLanguage = (lang: string) => {
  language = lang;
};

export const moviesApi = {
  nowPlaying: (page: number) =>
    api.get("movie/now_playing", { params: { page, language } }),
  upcoming: (page: number) =>
    api.get("movie/upcoming", { params: { page, language } }),
  popular: (page: number) =>
    api.get("movie/popular", { params: { page, language } }),
  movieDetail: (id: number) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
        language,
      },
    }),
  search: (term: string) =>
    api.get("search/movie", {
      params: {
        query: term,
        language,
      },
    }),
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated", { params: { language } }),
  popular: () => api.get("tv/popular", { params: { language } }),
  airingToday: () => api.get("tv/airing_today", { params: { language } }),
  showDetail: (id: number) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
        language,
      },
    }),
  search: (term: string) =>
    api.get("search/tv", {
      params: {
        query: term,
        language,
      },
    }),
};
