import { rest } from "msw";

//TODO: retrieve value from env; for instance process.env.VUE_APP_MOVIES_API
const apiUrl = "https://jsonmock.hackerrank.com/api";
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

const firstPageWithSearchValue = {
  page: 1,
  per_page: 3,
  total: 7,
  total_pages: 2,
  data: [
    { Title: "Existing1", imdbID: "1", Year: 2001 },
    { Title: "Existing2", imdbID: "2", Year: 2002 },
    { Title: "Existing3", imdbID: "3", Year: 2003 },
  ],
};

const searchValueNotFound = {
  page: 1,
  per_page: 3,
  total: 0,
  total_pages: 0,
  data: [],
};

const moviesEndpoint = rest.get(
  // TODO: use ${process.env.VUE_APP_MOVIES_API}
  `${apiUrl}/movies/search`,
  (req, res, ctx) => {
    const pageParam = req.url.searchParams.get("page");
    const searchParam = req.url.searchParams.get("Title");
    let page = firstPageOfMovies;
    if (
      pageParam &&
      pageParam === "1" &&
      searchParam &&
      searchParam === "existingMovie"
    )
      page = firstPageWithSearchValue;
    else if (
      pageParam &&
      pageParam === "1" &&
      searchParam &&
      searchParam === "noExistingMovie"
    )
      page = searchValueNotFound;
    else if (pageParam && pageParam === "2") page = secondPageOfMovies;
    else if (pageParam && pageParam === "4") page = lastPageOfMovies;
    else if (pageParam && pageParam === "5") page = invalidPageOfMovies;

    return res(ctx.status(200), ctx.json(page));
  }
);

export const handlers = [moviesEndpoint];
