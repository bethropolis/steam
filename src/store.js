// @ts-nocheck
import { writable } from "svelte/store";
import { DB, db } from "./db";

export const active = writable("code");
export const activeTab = writable(null);
export const viewActive = writable("view");




export const navItems = writable([
  { icon: "movie", label: "Movies" }, // Movies
  { icon: "tv", label: "TV Shows" }, // TV Shows
  { icon: "extension", label: "Addons" }, // Addons for streaming app
  { icon: "person", label: "Profile" }, // User profile and settings
  { icon: "star", label: "Favorites" }, // User's favorite movies/TV shows
]);


// plugin url
export const pluginUrl = writable("https://gist.githubusercontent.com/bethropolis/63b21fc999c51181d023346032e25f1a/raw/88e5da3443b1c6c0f71ec526bef7c2c9ce43670c/plugins.json");
// Create a writable store to hold custom events
export const customEventStore = writable({ name: '', data: null });

// settings
const defaultSettings = {
  navLabels: {
    value: true,
    type: "switch",
    label: "Show Navigation Labels",
    title: "Navigation"
  },
  showWatchedInfo: {
    value: true,
    type: "switch",
    label: "Show Watched Info",
    title: "Watched Status"
  },
  showBackButton: {
    value: true,
    type: "switch",
    label: "Show Back Button",
    title: "Back Navigation"
  },
  darkMode: {
    value: false,
    type: "switch",
    label: "Enable Dark Mode",
    title: "Theme"
  },
  favoriteMovies: {
    value: [],
    type: "array",
    label: "Favorite Movies",
    placeholder: "Select your favorite movies",
    title: "Favorites"
  },
  clearHistory: {
    value: false,
    type: "button",
    label: "Clear Watch History",
    short: "Clear History",
    title: "Watch History"
  },
  logout: {
    value: false,
    type: "button",
    label: "Logout from your account",
    short: "Logout",
    title: "Account"
  }
};

let s = DB.get("settings")||defaultSettings;

export const settings = writable(s);
