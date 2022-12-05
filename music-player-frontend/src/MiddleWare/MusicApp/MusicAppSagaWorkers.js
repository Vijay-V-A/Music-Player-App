import { call, put } from "redux-saga/effects";
import {
  GetPlayList,
  SetTrackSong,
  SetPlayList,
  SetAddPlayList,
  SetAddPlaySong,
  Refresh,
} from "../../StateManagement/Reducers/MusicAppState";
import {
  TrackSongs_Api,
  UploadSong_Api,
  PlayLists_Api,
  AddPlayListSongs_Api,
  AddSongs_Api,
  DeleteSongs_Api,
  PlayListSearch_Api,
  TrackSearch_Api,
  PlayListSongsPlay_Api,
} from "../Apis/MusicAppApi";

export function* TrackSongsApi() {
  try {
    const res = yield call(TrackSongs_Api);
    if (res.status === 200) {
      yield put(SetTrackSong(res.data));
    }
  } catch (e) {
    console.log(e.message);
  }
}

export function* UploadSongApi({ payload }) {
  try {
    const res = yield call(UploadSong_Api, payload);
    if (res.status === 200) {
      yield put(GetPlayList());
      yield put(Refresh(3));
    }
  } catch (e) {
    console.log(e.message);
  }
}

export function* PlayListsApi() {
  try {
    const res = yield call(PlayLists_Api);
    if (res.status === 200) {
      yield put(SetPlayList(res.data));
    }
  } catch (e) {
    console.log(e.message);
  }
}

export function* AddPlayListSongsApi({ payload }) {
  try {
    const res = yield call(AddPlayListSongs_Api, payload);
    if (res.status === 200) {
      yield put(SetAddPlayList(res.data));
    }
  } catch (e) {
    console.log(e.message);
  }
}

export function* AddSongsApi({ payload }) {
  try {
    let res;
    if (payload.method === "Add") res = yield call(AddSongs_Api, payload);
    else res = yield call(DeleteSongs_Api, payload);

    if (res.status === 200 && res.data === 1) {
      yield put(SetAddPlaySong(res.data));
      if (payload.method === "Add") yield put(Refresh(1));
      else yield put(Refresh(2));
    }
  } catch (e) {
    console.log(e.message);
  }
}

export function* PlayListSearchApi({ payload }) {
  try {
    let res = yield call(PlayListSearch_Api, payload);

    if (res.status === 200) {
      yield put(SetAddPlayList(res.data));
    }
  } catch (e) {
    console.log(e.message);
  }
}

export function* TrackSearchApi({ payload }) {
  try {
    let res = yield call(TrackSearch_Api, payload);

    if (res.status === 200) {
      yield put(SetTrackSong(res.data));
    }
  } catch (e) {
    console.log(e.message);
  }
}

export function* PlayListSongsPlayApi({ payload }) {
  try {
    let res = yield call(PlayListSongsPlay_Api, payload);

    if (res.status === 200) {
      yield put(SetTrackSong(res.data));
    }
  } catch (e) {
    console.log(e.message);
  }
}
