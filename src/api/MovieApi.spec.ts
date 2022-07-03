import type { MovieListPage } from "./Models/MovieListPage";
import { searchMovies } from "./MoviesApi";
import { server } from "./mocks/server";

describe("movies api", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test("first page of the list of movies is retrieved successfully", async () => {
    const expectedMovies: MovieListPage = {
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
    const movies = await searchMovies("", 1);
    expect(movies).toStrictEqual(expectedMovies);
  });
  test("second page of the list of movies is retrieved successfully", async () => {
    const expectedMovies: MovieListPage = {
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
    const movies = await searchMovies("", 2);
    expect(movies).toStrictEqual(expectedMovies);
  });
  test("last page of the list of movies is retrieved successfully", async () => {
    const expectedMovies: MovieListPage = {
      page: 4,
      per_page: 3,
      total: 10,
      total_pages: 4,
      data: [{ Title: "Title13", imdbID: "13", Year: 2013 }],
    };
    const movies = await searchMovies("", 4);
    expect(movies).toStrictEqual(expectedMovies);
  });
  test("invalid page retrieve empty results", async () => {
    const expectedMovies: MovieListPage = {
      page: 5,
      per_page: 3,
      total: 10,
      total_pages: 4,
      data: [],
    };
    const movies = await searchMovies("", 5);
    expect(movies).toStrictEqual(expectedMovies);
  });
  test("when search a movie and get the first page results", async () => {
    const expectedMovies: MovieListPage = {
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
    const movies = await searchMovies("existingMovie", 1);
    expect(movies).toStrictEqual(expectedMovies);
  });
});
