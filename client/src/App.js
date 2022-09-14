import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Plant from "./pages/Plant";
import Profile from "./pages/Profile";
import OnePlant from "./pages/OnePlant";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { client } from "./util/apolloClient";
import { AuthProvider } from "./util/auth";

// import Footer from './components/Footer';

// import Favorites from "./pages/Favorites";
// import Plant from "./pages/Plant";
// import Profile from "./pages/Profile";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/me" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/profiles/:username" element={<Profile />} />
            <Route path="/plants" element={<Plant />} />
            <Route path="/plants/:plantId" element={<RequireAuth><OnePlant /></RequireAuth>} />
          </Routes>
        </AuthProvider>
      </Router>
    </ApolloProvider>
  );
}

export default App;
