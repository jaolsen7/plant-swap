import React from "react";
import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../util/auth";
import monstera from "../components/images/monstera.jpg";
import "./Login.css";
import { NavLink } from "react-router-dom";

const styles = {
  formControl: {
    display: "flex",
    padding: "0.25em 24px"
  },
  label: {
    flex: "0 1 6em",
    paddingRight: "0.25em",
  },
};

const background = {
  backgroundImage: `url(${monstera})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "100vh",
  width: "100vw"
};

const initialFormState = {
  email: "",
  password: "",
};

export default function Login() {
  const { isLoggedIn, login, loading, error } = useAuth();
  const [formState, setFormState] = useState(initialFormState);
  const location = useLocation();

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    login(formState);
  };

  if (isLoggedIn) {
    // navigate to page user was redirected from or the home page.
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />
  }

  return (
    <div style={background} className="container-fluid">
      <div className="centered2 shadow-lg">
      <h1 className="mx-5 my-3 px-5">Login</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="justify-content-center" style={styles.formControl}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            disabled={loading}
            id="email"
            type="email"
            name="email"
            placeholder="Enter email"
            value={formState.email.value}
            onChange={handleInputChange}
          />
        </div>
        <div className="justify-content-center" style={styles.formControl}>
          <label htmlFor="new-password" style={styles.label}>
            Password
          </label>
          <input
            disabled={loading}
            id="new-password"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formState.password.value}
            onChange={handleInputChange}
          />
        </div>
        <div style={styles.formControl}>
          <button className="px-3 mx-2 my-1" disabled={loading} type="submit">
            {loading ? "Loading..." : "Submit"}
          </button>
          <NavLink to="/signup" className="my-2">
            Don't have an account?
          </NavLink>
        </div>
      </form>
      </div>
    </div>
  );
}
