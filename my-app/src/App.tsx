import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Sign } from "crypto";
import SignUp from "pages/signup";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
