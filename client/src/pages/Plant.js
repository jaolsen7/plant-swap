import React from "react";
import { useAuth } from "../util/auth";
import monstera from "../components/images/monstera.jpg";
import PlantCards from "../components/PlantCards";

const background = {
  backgroundImage: `url(${monstera})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "auto",
  width: "auto"
};

export default function Plant() {

  const { isLoggedIn, user } = useAuth();
  return (
    <div style={background} className="container-fluid">
      <PlantCards />
    </div>
  );
}
