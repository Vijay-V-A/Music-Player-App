import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const MusicAppSlice = createSlice({
  name: "Music",
  initialState: {
    TrackSong: [],
    isPlaysong: false,
    AddPlayListSong: [],
    PlayList: [],
    CurrentSongIndex: 0,
    BtnDisable: false,
    AddSongIndex: "",
    Refresh: "",
  },
  reducers: {
    GetTrackSong: (state) => {
      state.Loading = true;
      state.Refresh = "";
    },
    SetTrackSong: (state, action) => {
      state.TrackSong = action.payload;
    },

    GetPlayList: (state, action) => {
      return state;
    },
    SetPlayList: (state, action) => {
      state.PlayList = action.payload;
    },

    GetAddPlayList: (state) => {
      state.Refresh = "";
    },
    SetAddPlayList: (state, action) => {
      state.AddPlayListSong = action.payload;
      state.Refresh = "";
    },

    GetAddPlaySong: (state, action) => {
      state.BtnDisable = !state.BtnDisable;
      state.AddSongIndex = action.payload.sid;
      state.Refresh = "";
    },
    SetAddPlaySong: (state, action) => {
      state.BtnDisable = !state.BtnDisable;
      state.AddSongIndex = "";
      state.Refresh = action.payload;
    },
    PlayListSongSearch: (state) => {
      return state;
    },
    TrackSongSearch: (state) => {
      return state;
    },

    PlayListSongPlay: (state) => {
      state.CurrentSongIndex = 0;
    },

    NextSong: (state) => {
      if (state.CurrentSongIndex < state.TrackSong.length - 1)
        state.CurrentSongIndex += 1;
      else state.CurrentSongIndex = 0;
    },
    PrevSong: (state) => {
      if (state.CurrentSongIndex !== 0) state.CurrentSongIndex -= 1;
      else state.CurrentSongIndex = 0;
    },
    DefaultSong: (state) => {
      state.CurrentSongIndex = 0;
    },

    SingleSong: (state, action) => {
      state.CurrentSongIndex = action.payload;
      state.isPlaysong = true;
    },

    IsPlay: (state) => {
      state.isPlaysong = !state.isPlaysong;
    },

    UploadMusic: (state) => {
      return state;
    },

    ModalRefresh: (state) => {
      state.Refresh = "";
    },

    Refresh: (state, action) => {
      let msg;
      if (action.payload === 1) msg = "Song Added Successfully";
      else if (action.payload === 2) msg = "Song Removed Successfully";
      else if (action.payload === 3) msg = "PlayList Added Successfully";

      toast(msg);
      state.Refresh = 1;
    },
  },
});

export const {
  GetTrackSong,
  SetTrackSong,
  GetPlayList,
  SetPlayList,
  GetAddPlayList,
  SetAddPlayList,
  GetAddPlaySong,
  SetAddPlaySong,
  PlayListSongSearch,
  TrackSongSearch,
  PlayListSongPlay,
  UploadMusic,
  ModalRefresh,
  NextSong,
  PrevSong,
  DefaultSong,
  SingleSong,
  IsPlay,
  Refresh,
} = MusicAppSlice.actions;

export default MusicAppSlice.reducer;
