import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  UploadMusic,
  TrackSongSearch,
  ModalRefresh,
} from "../../StateManagement/Reducers/MusicAppState";
import "./topnav.css";
import { Modal, Button, Form } from "react-bootstrap";
import Logo from "../../Assets/logo.png";
import { BsPlusLg } from "react-icons/bs";

const Topnav = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  let tabName = pathname.split("/");

  const [PlayListName, setPlayListName] = useState("");
  const [TrackSearch, setTrackSearch] = useState("");

  const Refresh = useSelector((state) => state.Music.Refresh);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const UploadSong = () => {
    dispatch(UploadMusic(PlayListName));
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
    dispatch(TrackSongSearch(Search));
  };

  const optimizedFn = useCallback(debounce(handleChange), []);

  useEffect(() => {
    optimizedFn(TrackSearch);
  }, [TrackSearch]);

  useEffect(() => {
    handleClose();
  }, [Refresh]);
  return (
    <div className="top-navbar">
      <nav className="navbar navbar-expand-lg navbar-light top-nav">
        <div className="container-fluid col-11">
          <a
            className="navbar-brand"
            href="https://open.spotify.com/"
            target="_blank"
          >
            <img src={Logo} loading="lazy" alt="logo" /> Music Player
          </a>

          <div className="navbar-nav mx-auto me-auto mb-2 mb-lg-0 song-search-wrapper">
            {tabName[1] !== "playlist" && (
              <input
                type="search"
                className="song-search"
                placeholder="Search "
                onChange={(e) => setTrackSearch(e.target.value)}
              />
            )}
          </div>
          <div className="navbar-text">
            {tabName[1] !== "playlist" && (
              <button
                className="add-song-btn"
                onClick={() => {
                  handleShow();
                  dispatch(ModalRefresh());
                }}
              >
                <BsPlusLg style={{ marginRight: 10 }} />
                Create Play List
              </button>
            )}
          </div>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Play List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Play List Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPlayListName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            className="add-song-btn"
            onClick={UploadSong}
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Topnav;
