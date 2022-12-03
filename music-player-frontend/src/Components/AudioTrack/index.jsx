import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IsPlay,
  NextSong,
  PrevSong,
  DefaultSong,
} from "../../StateManagement/Reducers/MusicAppState";
import "./audiotrack.css";

import s_ong from "../../Assets/logo.png";

import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import {
  FaRegHeart,
  FaVolumeDown,
  FaVolumeUp,
  FaBackward,
  FaForward,
  FaVolumeMute,
} from "react-icons/fa";
import { RxLoop } from "react-icons/rx";
import { TbArrowsShuffle } from "react-icons/tb";
import { MdRefresh } from "react-icons/md";
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

const AudioTrack = () => {
  const dispatch = useDispatch();

  const [trackProgress, setTrackProgress] = useState(0);
  const [reftrack, setreftrack] = useState(0);
  const [Volume, setVolume] = useState(100);
  const [VolumeMute, setVolumeMute] = useState(false);
  const [Repeat, setRepeat] = useState(false);
  const [Shuffle, setShuffle] = useState(false);

  const isPlaying = useSelector((state) => state.Music.isPlaysong);
  const PlaySong = useSelector((state) => state.Music.TrackSong);
  const CurrentSong = useSelector((state) => state.Music.CurrentSongIndex);
  const song_ = useSelector((state) => state.Music.TrackSong);
  const FILE_URL = process.env.REACT_APP_BACKEND_FILE_URL + "songs/";
  const FILE_URL_1 = process.env.REACT_APP_BACKEND_FILE_URL + "song-images/";

  const audioRef = useRef(new Audio());
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration, currentTime } = audioRef.current;

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";

  const trackStyling = `
    -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #27AE60), color-stop(${currentPercentage}, #777))
  `;

  const volumeTrack = `
  -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${Volume}%, #27AE60), color-stop(${Volume}%, #777))
`;

  const VolumeControl = (e) => {
    audioRef.current.volume = e.target.value / 100;
    setVolume(e.target.value);
    if (e.target.value < 1) setVolumeMute(true);
    else setVolumeMute(false);
  };

  const Mute = () => {
    audioRef.current.volume = 0.0;
    setVolumeMute(true);
    setVolume(0);
  };

  const Fullvolume = () => {
    audioRef.current.volume = 1.0;
    setVolumeMute(false);
    setVolume(100);
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        AutoNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const AutoNextTrack = () => {
    if (CurrentSong < song_.length - 1) {
      dispatch(NextSong());
    } else {
      dispatch(DefaultSong());
    }
  };

  useEffect(() => {
    if (isPlaying) {
      if (reftrack === 0)
        audioRef.current = new Audio(
          FILE_URL + PlaySong[CurrentSong].audio_src
        );
      audioRef.current.play();
      setreftrack(reftrack + 1);
      startTimer();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, song_]);

  useEffect(() => {
    audioRef.current.pause();
    if (reftrack !== 0)
      audioRef.current = new Audio(FILE_URL + PlaySong[CurrentSong].audio_src);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();

      startTimer();
    } else {
      isReady.current = true;
    }
  }, [CurrentSong, song_]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="audio-track">
      <h4 className="now-play">Now playing</h4>
      {reftrack !== 0 ? (
        <img
          className="song-center-img"
          src={FILE_URL_1 + PlaySong[CurrentSong].img_src}
          alt=""
        />
      ) : (
        <img className="song-center-img" src={s_ong} alt="" />
      )}
      <div className="d-flex justify-content-between song-title-wrapper">
        <span>
          <MdRefresh
            className="plus-icon"
            onClick={() => dispatch(DefaultSong())}
          />
        </span>
        <div className="d-flex flex-column song-subtext">
          {reftrack !== 0 ? (
            <>
              <p className="song-title">{PlaySong[CurrentSong].name}</p>
              <p className="song-subtitle">{PlaySong[CurrentSong].artist}</p>
            </>
          ) : (
            <>
              <p className="song-title">Song Name</p>
              <p className="song-subtitle">Song Text</p>
            </>
          )}
        </div>
        <span>
          <FaRegHeart className="favorite-icon" />
        </span>
      </div>

      <div className="duration-range">
        <div className="d-flex justify-content-between minute">
          <p>
            {moment.duration(currentTime, "seconds").format("mm:ss") <= 59
              ? `00:${moment.duration(currentTime, "seconds").format("mm:ss")}`
              : moment.duration(currentTime, "seconds").format("mm:ss")}
          </p>
          <p>
            {moment.duration(duration, "seconds").format("mm:ss") < 1
              ? "00:00"
              : moment.duration(duration, "seconds").format("mm:ss")}
          </p>
        </div>
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className="progress"
          onChange={(e) => onScrub(e.target.value)}
          style={{ background: trackStyling }}
        />
      </div>

      <div className="d-flex justify-content-between control-buttons">
        <button onClick={() => setShuffle((prevState) => !prevState)}>
          <TbArrowsShuffle style={Shuffle ? { color: "#27ae60" } : {}} />
        </button>
        <button onClick={() => dispatch(PrevSong())}>
          <FaBackward />
        </button>
        {isPlaying ? (
          <button onClick={() => dispatch(IsPlay())}>
            <BsFillPauseFill className="play_" />
          </button>
        ) : (
          <button onClick={() => dispatch(IsPlay())}>
            <BsFillPlayFill className="pause_" />
          </button>
        )}

        <button onClick={() => dispatch(NextSong())}>
          <FaForward />
        </button>
        <button onClick={() => setRepeat((prevState) => !prevState)}>
          <RxLoop style={Repeat ? { color: "#27ae60" } : {}} />
        </button>
      </div>

      <div className="d-flex volume-control">
        <span onClick={() => Mute()}>
          {VolumeMute ? <FaVolumeMute /> : <FaVolumeDown />}
        </span>
        <input
          type="range"
          value={Volume}
          style={{ background: volumeTrack }}
          onChange={(e) => {
            VolumeControl(e);
          }}
        />
        <span onClick={() => Fullvolume()}>
          <FaVolumeUp />
        </span>
      </div>
    </div>
  );
};

export default AudioTrack;
