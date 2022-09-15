import { useAuth } from "../util/auth";
import React from "react";
import { QUERY_PLANT_BY_ZIPCODE } from "../util/queries";
import { useQuery } from "@apollo/client";
import { Container, Card, Button, Fade } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Cards() {
  const { isLoggedIn, logout, user } = useAuth();

  const [searchParams] = useSearchParams();
  const zipCode = parseInt(searchParams.get("zipcode"));

  const { error, loading, data } = useQuery(QUERY_PLANT_BY_ZIPCODE, {
    variables: { zipCode },
  });
  const plants = data?.plantsByZipcode || [];

  const [open, setOpen] = useState(false);

  let navigate = useNavigate();

  const handleSubmit = async (plantId) => {
    if (isLoggedIn) {

      navigate(`/plants/${plantId}`);
    } else {
      navigate("/login");
      alert("You need to be logged-in to comment/swap!")
    }
  };

  return (
    <div>
    <Container className="abs d-flex flex-row flex-wrap justify-content-center">
        {plants.map((plant) => (
          <Card key={plant._id} className="col-4 my-5 mx-4 fs-4 shadow-lg border-5 border-dark">
            <Card.Img src={plant.plantImage} width="100%" height="100%" />
            <Card.ImgOverlay>
            <Card.Body className="col-12 text-white">
              <Button
                variant="outline-dark"
                onClick={() => setOpen(!open)}
                aria-controls="example-fade-text"
                aria-expanded={open}
                className="text-white fs-3">{plant.plantName}
              </Button>
              <Fade in={open}>
                <div className="bg-dark p-2" id="example-fade-text">
                  <Button onClick={() => handleSubmit(plant._id)} variant="success" type="submit">Click to Comment/Swap</Button>
                  <Card.Text className="mt-2 mb-0 fs-6">{plant.plantDescription}</Card.Text>
                  <Card.Text className="fs-6 text-muted">Posted by: {plant.plantAuthor} from {plant.zipCode}</Card.Text>
                </div>
              </Fade>
            </Card.Body>
            </Card.ImgOverlay>
          </Card>
        ))}
      </Container>
      </div>
  );
}