import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import AudioSong from "./Reducers/MusicAppState";

import RootSaga from "../MiddleWare";

const Saga = createSagaMiddleware();
const store = configureStore({
  reducer: {
    Music: AudioSong,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
    }).concat(Saga),
});

Saga.run(RootSaga);

export default store;
