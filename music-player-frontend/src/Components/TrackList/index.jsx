import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetTrackSong,
  SingleSong,
} from "../../StateManagement/Reducers/MusicAppState";
import Menu from "../../Assets/song-menu.png";
import "./tracklist.css";

const TrackList = () => {
  const dispatch = useDispatch();
  const FILE_URL = process.env.REACT_APP_BACKEND_FILE_URL + "song-images/";

  const song_ = useSelector((state) => state.Music.TrackSong);
  const CurrentIndex = useSelector((state) => state.Music.CurrentSongIndex);
  const isplay = useSelector((state) => state.Music.isPlaysong);

  useEffect(() => {
    dispatch(GetTrackSong());
  }, [dispatch]);

  return (
    <div className="track-list">
      <h2 className="tracklist-header">Track list</h2>
      <p className="next-play">Playing next</p>
      {song_.map((val, ind) => (
        <div
          className="songs"
          key={ind}
          onClick={() => dispatch(SingleSong(ind))}
        >
          <div className="d-flex justify-content-between song-wrapper">
            <div className="d-flex song-name-wrapper">
              {val.name === song_[CurrentIndex].name && isplay ? (
                <div className="playbar">
                  <span />
                  <span />
                  <span />
                </div>
              ) : (
                <img src={Menu} alt="" />
              )}
              <img className="track_img" src={FILE_URL + val.img_src} alt="" />
              <div className="d-flex flex-column song-name">
                <p>{val.name}</p>
                <p>{val.artist}</p>
              </div>
            </div>
            <div className="d-flex flex-column song-duration justify-content-center">
              <p>{val.duration}</p>
              <p style={{ marginBottom: 0 }}>{val.year}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
