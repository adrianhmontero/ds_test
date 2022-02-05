import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import App from "./App";
import UserList from "./components/UserList";

const isAuth = sessionStorage.getItem("ds_tkn");

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={isAuth ? <UserList /> : <App />} />
        <Route path="*" element={isAuth ? <UserList /> : <App />} />
        <Route path="/user-list" element={<UserList />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
