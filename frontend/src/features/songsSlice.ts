import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Song, SongStats } from "../types";

interface SongsState {
  songs: Song[];
  stats: SongStats | null;
  isLoading: boolean;
}

const initialState: SongsState = {
  songs: [],
  stats: null,
  isLoading: false,
};

export const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    getSongsFetch: (state) => {
      state.isLoading = true;
    },
    getSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
      state.isLoading = false;
    },
    getSongsFailure: (state) => {
      state.isLoading = false;
    },

    getStatsFetch: (state) => {
      state.isLoading = true;
    },
    getStatsSuccess: (state, action: PayloadAction<SongStats>) => {
      state.stats = action.payload;
      state.isLoading = false;
    },
    getStatsFailure: (state) => {
      state.isLoading = false;
    },

    createSongFetch: (_state, _action: PayloadAction<Omit<Song, "_id">>) => {},
    updateSongFetch: (
      _state,
      _action: PayloadAction<{ id: string; data: Partial<Song> }>,
    ) => {},
    deleteSongFetch: (_state, _action: PayloadAction<string>) => {},
  },
});

export const {
  getSongsFetch,
  getSongsSuccess,
  getSongsFailure,
  getStatsFetch,
  getStatsSuccess,
  getStatsFailure,
  createSongFetch,
  updateSongFetch,
  deleteSongFetch,
} = songsSlice.actions;

export default songsSlice.reducer;
