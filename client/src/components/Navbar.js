import { NavLink } from "react-router-dom";
import { useAuth } from "../util/auth";
import "./Navbar.css";
import logo from "../logo.svg";

export default function Navbar2() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-start p-3">
      <span className="navbar-brand mb-0 h1">Plant Swap</span>
      <img src={logo} alt="home" width="50" height="50" />
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
        </>
      )}
    </nav>
  );
}