import React from "react";
import { useAuth } from "../util/auth";
import monstera from "../components/monstera.jpg";
import "./Home.css";

import { Container, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from 'react-router';

export default function Home() {
  const [zipcode, setZipcode] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleUsernameInput = (e) => {
    const value = e.target.value;
    setUsername(value);
  };
  const handleUsernameSubmit = (event) => {
    event.preventDefault();
    navigate(`/profiles/${username.trim()}`);
  };
  const handleZipcodeInput = (e) => {
    const zvalue = e.target.value;
    setZipcode(zvalue);
  };
  const handleZipcodeSubmit = (event) => {
    event.preventDefault();
    navigate(`/plants?zipcode=${zipcode.trim()}`);
  };

  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      <img className="bg-image img-fluid" src={monstera} alt="monstera" />
      <div className="container centered">
        <div className="row justify-content-center text-center">
          <div className="col-6 shadow-lg">
            <h1 className="text-light text-decoration-underline display-4">Plant Swap Lite</h1>
            <h1>a place to share the plant species in your collection and potentially swap with a new friend!</h1>
          </div>
        </div>
      </div>
      <Container>
      <Form className="left col-4 bg-dark text-light border border-light border-2 shadow-lg">
        <Form.Group className="m-3" controlId="formBasicUsername">
        <Form.Label>Search for Users by Username:</Form.Label>
        <Form.Control type="username" value={username} placeholder="Enter username" onChange={handleUsernameInput} />
        </Form.Group>
        <Button className="mx-3 mb-3" variant="secondary" label="Username" type="search" onClick={handleUsernameSubmit}>Find User</Button>
      </Form>
      <Form className="right col-4 bg-dark text-light border border-light border-2 shadow-lg">
        <Form.Group className="m-3" controlId="formBasicSearch">
        <Form.Label>Search for Plants by Zipcode:</Form.Label>
        <Form.Control type="zipcode" value={zipcode} placeholder="Enter zipcode" onChange={handleZipcodeInput} />
        </Form.Group>
        <Button className="mx-3 mb-3" variant="secondary" label="Zipcode" type="search" onClick={handleZipcodeSubmit}>Find Plants</Button>
      </Form>
      </Container>
    </div>
  );
}
