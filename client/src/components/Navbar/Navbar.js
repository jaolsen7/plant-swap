import React from "react";
import { useState } from 'react';
import { useAuth } from "../../util/auth";
import "./Navbar.css";
import { Link } from 'react-router-dom';
import { TbPlant } from 'react-icons/tb';

export default function NavB() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const { isLoggedIn, logout, user } = useAuth();

  return (
      <>
        <nav className="navb">
          <Link to="/" className="navb-logo neon">
            Plant Swap Lite
            <TbPlant style={{ marginLeft: "10px", marginBottom: "6px" }} />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
          {isLoggedIn ? (
            <>
            <li className="nav-item">
              <Link to="/me" className="nav-links" onClick={closeMobileMenu}>
                My Plants
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={() => {closeMobileMenu(); logout();}}>
                Logout
              </Link>
            </li>
            </>
            ) : (
            <>
            <li className="nav-item">
              <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/signup" className="nav-links" onClick={closeMobileMenu}>
                Signup
              </Link>
            </li>
            </>
            )}
          </ul>
          <div className="welcome">
            <h4>Welcome {isLoggedIn ? user.username : "Guest"}!</h4>
          </div>
        </nav>
      </>
  );
}