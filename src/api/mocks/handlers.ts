import { rest } from "msw";

const searchMoviesEndpoint = rest.get(
  `${process.env.VUE_APP_MOVIES_API}/movies/search`,
  (_, res, ctx) => {
    return res(ctx.status(500), ctx.json({}));
  }
);
const firstPageOfMovies = {
  page: 1,
  per_page: 3,
  total: 10,
  total_pages: 4,
  data: [
    { Title: "Title1", imdbID: "1", Year: 2001 },
    { Title: "Title2", imdbID: "2", Year: 2002 },
    { Title: "Title3", imdbID: "3", Year: 2003 },
  ],
};
const secondPageOfMovies = {
  page: 2,
  per_page: 3,
  total: 10,
  total_pages: 4,
  data: [
    { Title: "Title4", imdbID: "4", Year: 2004 },
    { Title: "Title5", imdbID: "5", Year: 2005 },
    { Title: "Title6", imdbID: "6", Year: 2006 },
  ],
};

const lastPageOfMovies = {
  page: 4,
  per_page: 3,
  total: 10,
  total_pages: 4,
  data: [{ Title: "Title13", imdbID: "13", Year: 2013 }],
};

const invalidPageOfMovies = {
  page: 5,
  per_page: 3,
  total: 10,
  total_pages: 4,
  data: [],
};

const moviesEndpoint = rest.get(
  `${process.env.VUE_APP_MOVIES_API}/movies`,
  (req, res, ctx) => {
    const pageParam = req.url.searchParams.get("page");
    let page = firstPageOfMovies;
    if (pageParam && pageParam === "2") page = secondPageOfMovies;
    else if (pageParam && pageParam === "4") page = lastPageOfMovies;
    else if (pageParam && pageParam === "5") page = invalidPageOfMovies;
    return res(ctx.status(200), ctx.json(page));
  }
);

export const handlers = [moviesEndpoint, searchMoviesEndpoint];
