import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./Context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path = "/login" element={<Login/>}/>
              <Route exact path = "/signup" element={<Signup/>}/>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
