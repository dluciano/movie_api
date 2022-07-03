import type { Movie } from "./Movie";

export interface MovieListPage {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Movie[];
}
