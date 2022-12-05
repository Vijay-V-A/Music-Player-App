import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Spinner } from "react-bootstrap";
import "./playlist.css";

import Menu from "../../Assets/song-menu.png";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  GetAddPlayList,
  GetAddPlaySong,
  PlayListSongSearch,
} from "../../StateManagement/Reducers/MusicAppState";
const PlayList = () => {
  const Navigage = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const [Search, setSearch] = useState("");

  const song_ = useSelector((state) => state.Music.AddPlayListSong);
  const AddSongIndex = useSelector((state) => state.Music.AddSongIndex);
  const BtnDisable = useSelector((state) => state.Music.BtnDisable);
  const Refresh = useSelector((state) => state.Music.Refresh);
  const FILE_URL = process.env.REACT_APP_BACKEND_FILE_URL + "song-images/";

  const Addsongs = (id, method) => {
    let article = { plid: params.id, sid: id, method: method };
    dispatch(GetAddPlaySong(article));
  };

  const debounce = (func) => {
    let timer;
    return function(...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 500);
    };
  };
  const handleChange = (Search) => {
    dispatch(PlayListSongSearch(Search));
  };

  const optimizedFn = useCallback(debounce(handleChange), []);
  let article = { Search: Search, plid: params.id };

  useEffect(() => {
    optimizedFn(article);
  }, [Search]);

  useEffect(() => {
    dispatch(GetAddPlayList(params.id));
  }, [Refresh, dispatch]);

  return (
    <>
      <div className="mt-4 d-flex">
        <span className="back-nav-wrapper" onClick={() => Navigage("/")}>
          <FaArrowLeft className="back-nav" />
        </span>
        <div className="search-play">
          <input
            type="search"
            className="song-search  search-play-input"
            placeholder="Search "
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="p-5">
        {song_.map((val, ind) => (
          <div className="songs play" key={ind}>
            <div className="d-flex justify-content-between song-wrapper">
              <div className="d-flex song-name-wrapper">
                <img src={Menu} alt="" />
                <img
                  className="track_img"
                  src={FILE_URL + val.img_src}
                  alt=""
                />
                <div className="d-flex flex-column song-name">
                  <p>{val.name}</p>
                  <p>{val.artist}</p>
                </div>
              </div>
              <div className="d-flex">
                <div className="d-flex flex-column song-duration justify-content-center">
                  <p>{val.duration}</p>
                  <p style={{ marginBottom: 0 }}>{val.year}</p>
                </div>
                {val.Added === "YES" ? (
                  <button
                    className="delete-playlist-btn"
                    disabled={BtnDisable}
                    onClick={() => Addsongs(val.id, "Delete")}
                  >
                    {BtnDisable && val.id === AddSongIndex ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      "Delete"
                    )}
                  </button>
                ) : (
                  <button
                    disabled={BtnDisable}
                    className="add-playlist-btn"
                    onClick={() => Addsongs(val.id, "Add")}
                  >
                    {BtnDisable && val.id === AddSongIndex ? (
                      <Spinner animation="border" variant="light" />
                    ) : (
                      "Add"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayList;
