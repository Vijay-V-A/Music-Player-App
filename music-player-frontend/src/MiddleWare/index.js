import { all } from "redux-saga/effects";

import {
  TrackSongs,
  UploadSong,
  PlayLists,
  AddPlayListSongs,
  AddSongs,
  PlayListSearch,
  TrackSearch,
  PlayListSongsPlay,
} from "./MusicApp/MusicAppSagaWatchers";

export default function* rootSaga() {
  return yield all([
    TrackSongs(),
    UploadSong(),
    PlayLists(),
    AddPlayListSongs(),
    AddSongs(),
    PlayListSearch(),
    TrackSearch(),
    PlayListSongsPlay(),
  ]);
}
