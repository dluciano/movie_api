import axios from "axios";
import type { MovieListPage } from "./Models/MovieListPage";

const apiUrl = process.env.VUE_APP_MOVIES_API;

const get = async <TResponse>(uri: string) => {
  const url = `${apiUrl}/movies${uri}`;
  const data = await axios.get<TResponse>(url);
  return data.data;
};

export const listMovies = async (page: number) =>
  {
    return await get<MovieListPage>(`?page=${page}`);
  };

export const searchMovies = async (movieTitle: string, page: number) =>
  await get<MovieListPage>(`/search?Title=${movieTitle}&page=${page}`);
