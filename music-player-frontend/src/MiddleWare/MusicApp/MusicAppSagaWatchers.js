import { takeLatest } from "redux-saga/effects";
import {
  GetTrackSong,
  UploadMusic,
  GetPlayList,
  GetAddPlayList,
  GetAddPlaySong,
  PlayListSongSearch,
  TrackSongSearch,
  PlayListSongPlay,
} from "../../StateManagement/Reducers/MusicAppState";
import {
  TrackSongsApi,
  UploadSongApi,
  PlayListsApi,
  AddPlayListSongsApi,
  AddSongsApi,
  PlayListSearchApi,
  TrackSearchApi,
  PlayListSongsPlayApi,
} from "./MusicAppSagaWorkers";

export function* TrackSongs() {
  yield takeLatest(GetTrackSong.type, TrackSongsApi);
}

export function* UploadSong() {
  yield takeLatest(UploadMusic.type, UploadSongApi);
}

export function* PlayLists() {
  yield takeLatest(GetPlayList.type, PlayListsApi);
}

export function* AddPlayListSongs() {
  yield takeLatest(GetAddPlayList.type, AddPlayListSongsApi);
}

export function* AddSongs() {
  yield takeLatest(GetAddPlaySong.type, AddSongsApi);
}

export function* PlayListSearch() {
  yield takeLatest(PlayListSongSearch.type, PlayListSearchApi);
}

export function* TrackSearch() {
  yield takeLatest(TrackSongSearch.type, TrackSearchApi);
}
export function* PlayListSongsPlay() {
  yield takeLatest(PlayListSongPlay.type, PlayListSongsPlayApi);
}
