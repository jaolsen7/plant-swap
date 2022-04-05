import React from "react";
import { useAuth } from "../util/auth";
import monstera from "../components/monstera.jpg";
import "./Plant.css";
import ProfileCards from "../components/ProfileCards";
import PlantForm from "../components/PlantForm";


import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, ME } from '../util/queries';

export default function Profile() {
  const { isLoggedIn, user } = useAuth();
  const { username } = useParams();

  const { loading, data } = useQuery(username ? QUERY_USER : ME, {
    variables: { username },
  });
  const profile = data?.me || data?.user || {};
  console.log(profile);
  
  if (isLoggedIn && user.username === username) {
    return <Navigate to="/me" />;
  }

  return (
    <div>
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <ProfileCards />
      {isLoggedIn && user._id === profile._id ? (<PlantForm userId={profile._id} />) : (<p className="abs2 col-4 bg-dark text-light border border-light border-2 shadow-lg text-center">You need to login and goto "My Plants" tab to create a plant!</p>)}
    </div>
  );
}
