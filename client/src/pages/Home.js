import { useAuth } from "../util/auth";
import monstera from "../components/monstera.jpg";
import "./Home.css";
import { Container, Form, Button } from "react-bootstrap";

export default function Home() {
  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      <img className="bg-image img-fluid" src={monstera} alt="monstera" />
      <div className="container centered">
        <div className="row justify-content-center text-center">
          <div className="col-6 shadow-lg">
            <h1 className="text-light text-decoration-underline display-1">Plant Swap Lite</h1>
            <h1 className="display-4">is rooted in connection. Our aim is to bring together
            plant hobbyists to share species in their collection and potentially swap with a friend!</h1>
          </div>
        </div>
      </div>
      <Container>
      <Form className="left col-4 bg-dark text-light border border-light border-2 shadow-lg">
        <Form.Group className="m-3" controlId="formBasicUsername">
        <Form.Label>Search for Plants by Username:</Form.Label>
        <Form.Control type="username" placeholder="Enter username" />
        </Form.Group>
        <Button className="mx-3 mb-3" variant="secondary" type="submit">Submit</Button>
      </Form>
      <Form className="right col-4 bg-dark text-light border border-light border-2 shadow-lg">
        <Form.Group className="m-3" controlId="formBasicSearch">
        <Form.Label>Search for Plants by Zipcode:</Form.Label>
        <Form.Control type="zipcode" placeholder="Enter zipcode" />
        </Form.Group>
        <Button className="mx-3 mb-3" variant="secondary" type="submit">Submit</Button>
      </Form>
      </Container>
    </div>
  );
}
