import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Log from './Log';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import Success from './Success';
import Error from './Error';
import Data from './Data';
import Upload from './Upload';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route element={<Log />} path="/" />
      <Route element={<Success />} path="/success" />
      <Route element={<Error />} path="/error" />
      <Route element={<Data />} path="/data" />
      <Route element={<Upload />} path="/upload" />
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
