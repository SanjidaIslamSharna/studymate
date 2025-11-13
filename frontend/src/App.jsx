import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProfileDetails from "./pages/ProfileDetails";
import PrivateRoute from "./routes/PrivateRoute";
import CreatePartner from "./pages/CreatePartner";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Layout Route */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
          path="partner/:id"
          element={
            <PrivateRoute>
              <ProfileDetails />
            </PrivateRoute>
          }
        />
        <Route path="create-partner-profile" element={
          <PrivateRoute>
            <CreatePartner />
          </PrivateRoute>
        } />
        </Route>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
