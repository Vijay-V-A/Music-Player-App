import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  GetPlayList,
  PlayListSongPlay,
  IsPlay,
} from "../../StateManagement/Reducers/MusicAppState";
import { Link } from "react-router-dom";
import img from "../../Assets/img.png";
import "./playlist.css";

const PlayList = () => {
  const dispatch = useDispatch();

  const playlist_ = useSelector((state) => state.Music.PlayList);
  const isPlaying = useSelector((state) => state.Music.isPlaysong);

  useEffect(() => {
    dispatch(GetPlayList());
  }, []);

  return (
    <>
      <div className="play-list">
        <div className="d-flex justify-content-between playlist-header-wrapper">
          <h2 className="playlist-header">Play Lists</h2>
        </div>
        <div className="row row-cols-xl-3 row-cols-lg-2 row-cols-sm-1 row-cols-md-2">
          {playlist_.length > 0 ? (
            <>
              {playlist_.map((val, ind) => (
                <div className="playlist-card" key={ind}>
                  <Link
                    className="playlist-card create-playlist-btn"
                    to={`/playlist/${val.id}`}
                  >
                    <img src={img} alt="" />
                  </Link>

                  <h4>{val.Pname}</h4>
                  {val.song_count !== "0" && (
                    <p
                      className="play-playlist"
                      onClick={() => {
                        dispatch(PlayListSongPlay(val.id));
                        if (isPlaying === false) dispatch(IsPlay());
                      }}
                    >
                      Play
                    </p>
                  )}
                </div>
              ))}
            </>
          ) : (
            <div className="Playlistnotfound">Play List Not Found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlayList;
