// songsSaga.ts
import { call, put, takeEvery } from "redux-saga/effects";
import {
  getSongsSuccess,
  getSongsFailure,
  getSongsFetch,
  createSongFetch,
  updateSongFetch,
  deleteSongFetch,
} from "./songsSlice";
import type { Song } from "../types";
import { API_ENDPOINTS } from "../config/api";

function* workGetSongsFetch() {
  try {
    const response: Response = yield call(() =>
      fetch(API_ENDPOINTS.songs)
    );
    const data: Song[] = yield response.json();
    yield put(getSongsSuccess(data));
  } catch (_error) {
    yield put(getSongsFailure());
  }
}

function* workCreateSongFetch(action: { type: string; payload: Omit<Song, "_id"> }) {
  try {
    yield call(() =>
      fetch(API_ENDPOINTS.songs, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(action.payload),
      })
    );
    yield put(getSongsFetch());
  } catch (_error) {
    console.error("Create failed", _error);
  }
}

function* workUpdateSongFetch(action: {
  type: string;
  payload: { id: string; data: Partial<Song> };
}) {
  try {
    const { id, data } = action.payload;
    yield call(() =>
      fetch(`${API_ENDPOINTS.songs}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
    );
    yield put(getSongsFetch());
  } catch (_error) {
    console.error("Update failed", _error);
  }
}

function* workDeleteSongFetch(action: { type: string; payload: string }) {
  try {
    const id = action.payload;
    yield call(() =>
      fetch(`${API_ENDPOINTS.songs}/${id}`, {
        method: "DELETE",
      })
    );
    yield put(getSongsFetch());
  } catch (_error) {
    console.error("Delete failed", _error);
  }
}

function* songsSaga() {
  yield takeEvery(createSongFetch.type, workCreateSongFetch);
  yield takeEvery(updateSongFetch.type, workUpdateSongFetch);
  yield takeEvery(deleteSongFetch.type, workDeleteSongFetch);
  yield takeEvery(getSongsFetch.type, workGetSongsFetch);
}

export default songsSaga;
