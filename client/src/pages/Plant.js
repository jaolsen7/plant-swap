import React from "react";
import { useAuth } from "../util/auth";
import monstera from "../components/images/monstera.jpg";
import "./Plant.css";
import PlantCards from "../components/PlantCards";

export default function Plant() {

  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <PlantCards />
    </div>
  );
}
