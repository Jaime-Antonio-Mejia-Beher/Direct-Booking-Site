import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<SignIn />} /> {/* Default route */}
      </Routes>
    </Router>
  );
}

export default App;
