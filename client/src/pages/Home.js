import React from "react";
import { useAuth } from "../util/auth";
import monstera from "../components//images/monstera.jpg";
import "./Home.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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

  const background = {
    backgroundImage: `url(${monstera})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly"
 }

  return (
    <Container fluid style={background}>
      <Row style={{marginTop: "50px"}} className="justify-content-center">
        <Col xs={8} lg={{span: 4, offset: 1 }} style={{ textAlign: "right" }}>
            <h1 className="text-light text-decoration-underline display-4">Plant Swap Lite</h1>
            <h1>a place to share your collection and swap with a new friend!</h1>
        </Col>
      </Row>
      <Row style={{marginTop: "-75px"}}className="justify-content-center">
          <Col xs={8} lg={4}>
            <form className="bg-dark text-light border border-light border-2 shadow-lg">
              <div className="form-group m-3" controlId="formBasicUsername">
                <label for="username">Search for Users by Username:</label>
                <input id="username" className="form-control" type="username" value={username} placeholder="Enter username" onChange={handleUsernameInput} />
              </div>
              <button className="mx-3 mb-3" variant="secondary" label="Username" type="search" onClick={handleUsernameSubmit}>Find User</button>
            </form>
          </Col>
          <Col xs={8} lg={4}>
            <form className="bg-dark text-light border border-light border-2 shadow-lg">
              <div className="form-group m-3" controlId="formBasicSearch">
                <label for="zipcode">Search for Plants by Zipcode:</label>
                <input id="zipcode" className="form-control" type="zipcode" value={zipcode} placeholder="Enter zipcode" onChange={handleZipcodeInput} />
              </div>
              <button className="mx-3 mb-3" variant="secondary" label="Zipcode" type="search" onClick={handleZipcodeSubmit}>Find Plants</button>
            </form>
        </Col>
      </Row>
    </Container>
  );
}
