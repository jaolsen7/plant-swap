import React, { useState } from 'react';
import { useAuth } from "../util/auth";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import "../pages/Plant.css";

import { ADD_PLANT } from '../util/mutations';
import { Form, Button } from "react-bootstrap";

export default function PlantForm ({username}) {
  const { isLoggedIn, user } = useAuth();

  const [formState, setFormState] = useState({
    plantDescription: '',
    plantName: '',
    plantAuthor: user.username,
    plantImage: '',
    zipCode: '',
    username: username,
  });

  const [addPlant, { error, loading }] = useMutation(ADD_PLANT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addPlant({
        variables: {...formState},
      });

      setFormState({plantDescription: '', plantName: '', plantAuthor: user.username, plantImage: '', zipCode: '', username: username})
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setFormState({...formState, [name]: value });
  };

  return (
    <div>
      {isLoggedIn ? (
        <>
        <div>
          <Form className="abs2 col-4 bg-dark text-light border border-light border-2 shadow-lg">
            <Form.Group className="m-3" controlId="formBasicPlant">
            <Form.Label>Share another species!</Form.Label>
            <Form.Control name="plantDescription" as="input" value={formState.plantDescription} placeholder="Enter description" onChange={handleChange} />
            <Form.Control name="plantName" as="input" value={formState.plantName} placeholder="Enter name" onChange={handleChange} />
            <Form.Control name="plantImage" as="input" value={formState.plantImage} placeholder="Enter image url" onChange={handleChange} />
            <Form.Control name="zipCode" as="input" value={formState.zipCode} placeholder="Enter zipcode" onChange={handleChange} />
            </Form.Group>
            <Button className="mx-3 mb-3" variant="secondary" label="submit" type="submit" onClick={handleFormSubmit}>Create Plant</Button>
          </Form>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
        </div>
        </>
      ) : (
        <p>
          You need to be logged in to add a plant. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};