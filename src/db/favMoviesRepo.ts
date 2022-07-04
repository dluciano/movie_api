import type { Movie } from "@/api";

interface IFavMoviesRepo {
  getAll: () => Promise<Movie[]>;
  sync: (movies: Movie[]) => Promise<void>;
}

class LocalStorageFavMoviesRepo implements IFavMoviesRepo {
  private readonly favMoviesStorageKey = "FavMovies";
  public async getAll() {
    return new Promise<Movie[]>((resolve) => {
      const json = localStorage.getItem(this.favMoviesStorageKey);
      if (!json) {
        resolve([]);
        return;
      }
      const data = JSON.parse(json) as Movie[];
      if (!data) {
        resolve([]);
        return;
      }

      resolve(data);
    });
  }
  public sync(movies: Movie[]) {
    return new Promise<void>((resolve) => {
      localStorage.setItem(this.favMoviesStorageKey, JSON.stringify(movies));
      resolve();
    });
  }
}

export const favMoviesRepo: IFavMoviesRepo = new LocalStorageFavMoviesRepo();
