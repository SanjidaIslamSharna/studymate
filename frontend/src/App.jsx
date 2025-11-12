import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Layout Route */}
        <Route path="/" element={<Layout />}></Route>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
