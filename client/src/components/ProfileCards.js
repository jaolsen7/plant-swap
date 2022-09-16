import React from "react";
import { useAuth } from "../util/auth";
import { QUERY_USER, ME } from "../util/queries";
import { useQuery } from "@apollo/client";
import { Container, Card, Button, Fade } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { REMOVE_PLANT } from "../util/mutations";
import { useMutation } from "@apollo/client";

export default function ProfileCards() {
  const { isLoggedIn, user } = useAuth();
  const { username } = useParams();
  const { loading, data } = useQuery(username ? QUERY_USER : ME, {
    variables: { username },
  });
  const profile = data?.me || data?.user || {};
  const plants = profile.plants;

  const [removePlant, { error, loading2 }] = useMutation(REMOVE_PLANT);
  let navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const openDescription = async (plantId) => {
    if (window.innerWidth < 1080) {
      setOpen(false);
      navigate(`/plants/${plantId}`);
    } else {
      setOpen(!open);
    }
  };

  const handleDelete = (plantId) => {
    if (isLoggedIn && user.username === username) {
      removePlant({ variables: { plantId } });
      document.location.reload();
    } else if (isLoggedIn) {
      navigate("/me");
      alert("You need to be on your own profile to delete!")
    } else {
      navigate("/login");
      alert("Login to create and/or delete your own plants.")
    }
  };

  const handleSubmit = async (plantId) => {
    if (isLoggedIn) {
      navigate(`/plants/${plantId}`);
    } else {
      navigate("/login");
      alert("You need to be logged-in to comment/swap!")
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
        <Container className="d-flex flex-row flex-wrap justify-content-center">
        {plants.map((plant) => (
          <Card key={plant._id} className="col-sm-10 col-lg-4 my-5 mx-4 fs-4 shadow-lg border-5 border-dark" >
            <Card.Img src={plant.plantImage} style={{ width: "100%", height: "45vh", objectFit: "cover" }} />
            <Card.ImgOverlay>
            <Card.Body className="col-12 text-white">
              <Button
                variant="outline-dark"
                onClick={() => openDescription(plant._id)}
                aria-controls="example-fade-text"
                aria-expanded={open}
                className="text-white fs-3"
              >
                {plant.plantName}
              </Button>
              <Fade in={open}>
                <div className="d-flex flex-column bg-dark p-2">
                  <Button onClick={() => handleSubmit(plant._id)} variant="success" type="submit">Click to Comment/Swap</Button>
                  <Card.Text className="mt-2 mb-0 fs-6">{plant.plantDescription}</Card.Text>
                  <Card.Text className="fs-6 text-muted">Posted by: {plant.plantAuthor} from {plant.zipCode}</Card.Text>
                  <Button onClick={() => handleDelete(plant._id)} variant="delete" type="delete" style={{ marginLeft: "auto" }} className="col-2 text-white border-white">X</Button>
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