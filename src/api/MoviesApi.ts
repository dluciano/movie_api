import axios from "axios";
import type { MovieListPage } from "./Models/MovieListPage";

const apiUrl = "https://jsonmock.hackerrank.com/api";

const get = async <TResponse>(uri: string) => {
  const url = `${apiUrl}${uri}`;
  const data = await axios.get<TResponse>(url);
  return data.data;
};

export const searchMovies = async (movieTitle: string, page: number) => {
  const query = movieTitle ? `Title=${movieTitle}&` : "";
  return await get<MovieListPage>(`/movies/search?${query}page=${page}`);
};
