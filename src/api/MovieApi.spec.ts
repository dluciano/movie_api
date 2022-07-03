import type { MovieListPage } from "./Models/MovieListPage";
import { listMovies } from "./MoviesApi";
import { server } from "./mocks/server";

describe("movies api", () => {
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  test("when list first page of the list of movies", async () => {
    const expectedMovies: MovieListPage = {
      page: 1,
      per_page: 3,
      total: 13,
      total_pages: 4,
      data: [
        { Title: "Title1", imdbID: "1", Year: 2001 },
        { Title: "Title2", imdbID: "2", Year: 2002 },
        { Title: "Title3", imdbID: "3", Year: 2003 },
      ],
    };
    const movies = await listMovies(0);
    expect(movies).toStrictEqual(expectedMovies);
  });
});
