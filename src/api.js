import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "04763e54a6cd6b839a62c81f39341789";

const params = {
  params: {
    api_key: API_KEY,
  },
};
export const fetchMovies = async () => {
  const response = await axios.get(`${API_URL}/discover/movie`, params);
  return response.data.results;
};
