import React from "react";
import { useAuth } from "../util/auth";
import monstera from "../components/images/monstera.jpg";
import { QUERY_PLANT } from "../util/queries";
import { useQuery, useMutation } from "@apollo/client";
import { Form, Card, Button, Fade } from "react-bootstrap";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ADD_COMMENT, REMOVE_COMMENT } from '../util/mutations';

export default function Plant() {
  const { isLoggedIn, user } = useAuth();
  const name = user.username;
  const { plantId } = useParams();
  let navigate = useNavigate();
  const { loading, data } = useQuery(QUERY_PLANT, {
    variables: { plantId: plantId },
  });

  const plant = data?.plant || [];
  const comments = plant.comments || [];

  const [commentText, setCommentText] = useState("");
  const [addComment, { error }] = useMutation(ADD_COMMENT)
  const [removeComment, { error2 }] = useMutation(REMOVE_COMMENT);

  const handleDelete = (commentId, commentAuthor) => {
    if (isLoggedIn && name === commentAuthor) {
      removeComment({ variables: { commentId, plantId } });
    } else {
      alert("You can't delete someone else's comment! Submit a help ticket (link in progress)");
    }
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
  };

  const handleProfile = async (commentAuthor) => {
    if (isLoggedIn) {

      navigate(`/profiles/${commentAuthor}`);
    } else {
      navigate("/login");
      alert("You need to be logged-in to comment/swap!")
    }
  };

  const [open, setOpen] = useState(false);

  const background = {
    backgroundImage: `url(${monstera})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    height: "auto",
    width: "auto",
    paddingTop: "24px"
  };

  return (
    <div style={background} className="container-fluid">
      <div className="d-flex flex-row flex-wrap justify-content-center">
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
      </div>
      <div style={{ paddingBottom: "25vh" }} className="d-flex flex-row justify-content-center">
          <div style={{ marginBottom: "24px" }} className="col-8 mx-5 bg-dark shadow-lg">
              {comments.map((comment) => (
              <Card key={comment._id} className="col-11 my-4 mx-auto border-5 border-info bg-light">
                <Card.Body className="col-12">
                <Card.Text className="text-decoration-underline text-muted text-start fs-6" onClick={() => handleProfile(comment.commentAuthor)}>Posted by: {comment.commentAuthor}</Card.Text>
                <Card.Text className="text-dark text-center fs-5 px-3">{comment.commentText}</Card.Text>
                <Button onClick={() => handleDelete(comment._id, comment.commentAuthor)} variant="delete" type="delete" className="text-end text-dark border-dark">X</Button>
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
        </div>
    </div>
  );
}