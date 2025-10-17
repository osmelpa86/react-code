const API_KEY = "e46c3390";
const BASE_URL = "https://omdbapi.com/";
export const searchMovies = async ({ search }) => {
  if (search.type === "") return null;

  try {
    if (search) {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${search}`);
      const json = await response.json();
      const movies = json.Search;
      return movies?.map((movie) => ({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
      }));
    }
  } catch (e) {
    throw new Error("Error searching movies", e);
  }
};
