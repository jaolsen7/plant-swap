import { useAuth } from "../util/auth";
import monstera from "../components/monstera.jpg";
import "./Plant.css";

import { QUERY_PLANT } from "../util/queries";
import { useQuery } from "@apollo/client";
import { Container, Card, Button, Fade } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Plant() {
  const { plantId } = useParams();
  const { loading, data } = useQuery(QUERY_PLANT, {
    variables: { plantId: plantId },
  });

  const plant = data?.plant || [];
  const comments = plant.comments || [];
  console.log(comments);

  const [open, setOpen] = useState(false);

  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />

      <Container className="abs d-flex flex-row flex-wrap justify-content-center">
          <Card className="col-5 my-5 mx-4 fs-4 shadow-lg border-5 border-dark">
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
                  <Button variant="success" type="submit">Click to Comment/Swap</Button>
                  <Card.Text className="mt-2 mb-0 fs-6">{plant.plantDescription}</Card.Text>
                  <Card.Text className="fs-6 text-secondary">Posted by: {plant.plantAuthor} from {plant.zipCode}</Card.Text>
                </div>
              </Fade>
            </Card.Body>
            </Card.ImgOverlay>
          </Card>

            {comments.map((comment) => (
          <Card className="col-10 my-3 mx-4 fs-4 shadow-lg border-5 border-dark">
            <Card.Body className="col-12 text-dark">
            <Card.Text className="text-center">Make a friend below!</Card.Text>
              <Card.Text>as;ldfajksd;{comment.commentText}</Card.Text>
              <Card.Text>{comment.commentAuthor}</Card.Text>
            </Card.Body>
          </Card>
            ))}
      </Container>

    </div>
  );
}
