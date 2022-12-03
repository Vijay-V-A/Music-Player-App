import React from "react";
import { Home, PlayList } from "../Pages";
import { Routes, Route, Navigate } from "react-router-dom";
import { TopNav } from "../Components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Router = () => {
  return (
    <>
      <TopNav />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/playlist/:id" element={<PlayList />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer autoClose={3000} />
    </>
  );
};

export default Router;
