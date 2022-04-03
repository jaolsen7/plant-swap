import { NavLink } from "react-router-dom";
import { useAuth } from "../util/auth";
import "./Navbar.css";
import houseplant from "./houseplant.png";

export default function Navbar() {

  const { isLoggedIn, logout, user } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-start p-3">
      <span className="navbar-brand mb-0 h1 neon">Plant Swap Lite</span>
      <img src={houseplant} alt="home" />
      <NavLink to="/" className="navbar-link">
        Home
      </NavLink>
      <NavLink to="/plants" className="navbar-link">
        Plants
      </NavLink>
      {isLoggedIn ? (
        <>
          <NavLink to="/protected" className="navbar-link">
            My Profile
          </NavLink>
          <button className="navbar-link" onClick={logout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <NavLink to="/login" className="navbar-link">
            Login
          </NavLink>
          <NavLink to="/signup" className="navbar-link">
            Signup
          </NavLink>
          <h3>Welcome Guest!</h3>
        </>
      )}
      <div className="container justify-content-end">
        <span class="navbar-text">Welcome {isLoggedIn ? user.username : "Guest"}!</span>
      </div>
    </nav>
  );
}