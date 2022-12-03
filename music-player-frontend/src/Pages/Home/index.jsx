import React from "react";
import { PlayList, AudioTrack, TrackList } from "../../Components";

import "./home.css";

const Home = () => {
  return (
    <div className="d-flex home">
      <div className="playlist">
        <PlayList />
      </div>
      <div className="audiotrack">
        <AudioTrack />
      </div>
      <div className="tracklist">
        <TrackList />
      </div>
    </div>
  );
};

export default Home;
