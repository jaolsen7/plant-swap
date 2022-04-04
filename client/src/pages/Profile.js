import React from "react";
import { useAuth } from "../util/auth";
import monstera from "../components/monstera.jpg";
import "./Plant.css";
import ProfileCards from "../components/ProfileCards";

import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER, ME } from '../util/queries';

export default function Profile() {
  const { isLoggedIn, user } = useAuth();
  const { username } = useParams();

  const { loading, data } = useQuery(username ? QUERY_USER : ME, {
    variables: { username },
  });
  // const profile = data?.me || data?.user || {};

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
    </div>
  );
}
