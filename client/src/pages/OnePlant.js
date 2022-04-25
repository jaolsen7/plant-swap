import React from "react";
import { useAuth } from "../util/auth";
import monstera from "../components/monstera.jpg";
import "./Plant.css";

import { QUERY_PLANT } from "../util/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Container, Form, Card, Button, Fade } from "react-bootstrap";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { ADD_COMMENT, REMOVE_COMMENT } from '../util/mutations';


export default function Plant() {
  const { isLoggedIn, user } = useAuth();
  const name = user.username;
  const { plantId } = useParams();
  const { loading, data } = useQuery(QUERY_PLANT, {
    variables: { plantId: plantId },
  });

  const plant = data?.plant || [];
  const comments = plant.comments || [];

  const [commentText, setCommentText] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT)
  const [removeComment, { error2 }] = useMutation(REMOVE_COMMENT);

  const handleDelete = (commentId) => {
    removeComment({ variables: { commentId, plantId } });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          plantId,
          commentText,
          commentAuthor: name
        },
      });
      setCommentText("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "commentText" && value.length <= 280) {
      setCommentText(value);
    }
  }

  const [open, setOpen] = useState(false);

  return (
    <div>
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />
      <img className="bg-image2 img-fluid" src={monstera} alt="monstera" />

      <Container className="abs d-flex flex-row flex-wrap justify-content-center">
          <Card className="col-4 mb-4 mx-5 fs-4 shadow-lg border-5 border-dark">
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
                  <Card.Text className="fs-6 text-muted">Posted by: {plant.plantAuthor} from {plant.zipCode}</Card.Text>
                </div>
              </Fade>
            </Card.Body>
            </Card.ImgOverlay>
          </Card>

              <div className="col-7 mx-5 bg-dark shadow-lg">
              {comments.map((comment) => (
              <Card key={comment._id} className="col-11 my-4 mx-auto border-5 border-info bg-light">
                <Card.Body className="col-12">
                <Card.Text className="text-dark text-center fs-5 px-3">{comment.commentText}</Card.Text>
                <Card.Text className="text-muted text-end fs-6">Posted by: {comment.commentAuthor}</Card.Text>
                <Button onClick={() => handleDelete(comment._id)} variant="delete" type="delete" className="text-dark border-dark">X</Button>
                </Card.Body>
              </Card>
                ))}
                <Form>
                  <Form.Group className="m-3" controlId="formBasicComment">
                  <Form.Label>Enter Comment:</Form.Label>
                  <Form.Control name="commentText" as="input" value={commentText} placeholder="Type here..." onChange={handleChange} />
                  </Form.Group>
                  <Button className="mx-3 mb-3" variant="secondary" label="Comment" type="submit" onClick={handleFormSubmit}>Add Comment</Button>
                </Form>
              </div>
      </Container>
    </div>
  );
}