
import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import Campaign from "./pages/Campaign";
import Login from "./pages/Login";
import CampaignsList from "./components/CampaignsList/CampaignsList";
import CampaignDetail from "./components/CampaignsList/CampaignDetail";
import DonationSuccess from "./pages/DonationSuccess";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("userData") ? true : false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("userData")) || {});

  const handleLogin = (userData) => {
    // Perform your authentication logic here, e.g., API calls, etc.

    // If authentication is successful, update the state
    setIsLoggedIn(true);
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    // You might want to redirect the user to a specific page after successful login
  };

  return (
    <>
      <CssBaseline />
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/campaign" element={<Campaign user={user} />} />
        <Route path="/campaigns" element={<CampaignsList />} />
        <Route path="/campaigns/:id" element={<CampaignDetail />} />
        <Route path="/donation_success" element={<DonationSuccess />} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} onLogin={handleLogin} />}
        />
      </Routes>
    </>
  );
}

export default App;