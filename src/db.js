// @ts-nocheck
import Dexie from "dexie";

export const db = new Dexie("streamingApp");
db.version(1).stores({
  addons: "++id,&name,url,description, file",
  movies: "++id,&title,genre,releaseYear,rating,duration,url,thumbnail",
  tvShows: "++id,&title,genre,releaseYear,rating,numSeasons,url,thumbnail",
  users: "++id,&username,email,hashedPassword",
  userFavorites: "++id,userId,movieId,tvShowId",
  watchedShows: "++id,userId,tvShowId,lastWatchedSeason,lastWatchedEpisode",
});

db.addons.put({
  name: "Sample Addon",
  url: "https://sample-addon-url.com",
  description: "An example addon for the streaming app.",
});

db.users.put({
  username: "default",
  email: "default@example.com",
  hashedPassword: "hashed_password_here",
});




export const DB = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get: (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  },
  update: (key, value) => {
    const currentValue = DB.get(key);
    if (currentValue !== null) {
      DB.set(key, value);
    }
  },
  remove: (key) => {
    localStorage.removeItem(key);
  },
  clear: () => {
    localStorage.clear();
  },
};
