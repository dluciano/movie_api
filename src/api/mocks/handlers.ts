import { rest } from "msw";

type MovieApi = {
  Title: string;
  Year: number;
  imdbID: string;
};

type MoviePage = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: MovieApi[];
};

const createMovies = (numberOfMovies: number = 13) => {
  const movies: MovieApi[] = [];
  for (var i = 1; i <= numberOfMovies; i++) {
    const movie = { Title: `Title${i}`, Year: 2000 + i, imdbID: `${i}` };
    movies.push(movie);
  }
  return movies;
};
const genMockMoviePages = (movies: MovieApi[], moviesPerPage: number = 3) => {
  const numberOfMovies = movies.length;
  const moviesPages: MovieApi[][] = [];
  let currentPage: MovieApi[] = [];
  for (var i = 0; i < numberOfMovies; i++) {
    currentPage.push(movies[i]);
    if (currentPage.length >= moviesPerPage) {
      moviesPages.push([...currentPage]);
      currentPage = [];
    }
  }
  if (currentPage.length > 0) {
    moviesPages.push([...currentPage]);
  }
  var pages: MoviePage[] = [];
  for (var i = 0; i < moviesPages.length; i++) {
    pages.push({
      page: i + 1,
      per_page: moviesPerPage,
      total: movies.length,
      total_pages: Math.floor(movies.length / moviesPerPage),
      data: moviesPages[i],
    });
  }
  return pages;
};

const moviesEndpoint = rest.get(`${process.env.VUE_APP_MOVIES_API}/movies`, (req, res, ctx) => {
  const pageN = req.url.searchParams.get("page");
  const movies = createMovies();
  const page =
    pageN && parseInt(pageN)
      ? genMockMoviePages(movies)[parseInt(pageN)]
      : genMockMoviePages(movies)[0];
  return res(ctx.status(200), ctx.json(page));
});

const searchMoviesEndpoint = rest.get(`${process.env.VUE_APP_MOVIES_API}/movies/search`, (req, res, ctx) => {
  const pageN = req.url.searchParams.get("page");
  const title = req.url.searchParams.get("title");
  const movies = createMovies();

  const filteredMovies = title
    ? movies.filter((m) => m.Title.indexOf(title) >= 0)
    : movies;

  const page =
    pageN && parseInt(pageN)
      ? genMockMoviePages(filteredMovies)[parseInt(pageN)]
      : genMockMoviePages(filteredMovies)[0];

  return res(ctx.status(200), ctx.json(page));
});

export const handlers = [moviesEndpoint, searchMoviesEndpoint];
