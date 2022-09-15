import React from "react";
import { useAuth } from "../util/auth";
import monstera from "../components/images/monstera.jpg";
import ProfileCards from "../components/ProfileCards";
import PlantForm from "../components/PlantForm";
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, ME } from '../util/queries';

const background = {
  backgroundImage: `url(${monstera})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  height: "auto",
  width: "auto"
};

export default function Profile() {
  const { isLoggedIn, user } = useAuth();
  const { username } = useParams();

  const { loading, data } = useQuery(username ? QUERY_USER : ME, {
    variables: { username },
  });
  const profile = data?.me || data?.user || {};
  
  if (isLoggedIn && user.username === username) {
    return <Navigate to="/me" />;
  }

  return (
    <div style={background} className="container-fluid">
      <ProfileCards />
      {isLoggedIn && user._id === profile._id ? (<PlantForm />
      ) : (
        <div style={{ paddingBottom: "33vh" }} className="row justify-content-center">
          <p className="col-4 bg-dark text-light border border-light border-2 shadow-lg text-center">Go to the "My Plants" tab to create a plant!</p>
        </div>
       )}
    </div>
  );
}
