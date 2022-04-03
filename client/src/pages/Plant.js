import { useAuth } from "../util/auth";
import monstera2 from "../components/monstera2.jpg";
import "./Plant.css";
import { Container, Form, Button } from "react-bootstrap";

export default function Plant() {
  const { isLoggedIn, user } = useAuth();
  return (
    <div>
      <img className="bg-image2 img-fluid" src={monstera2} alt="monstera2" />
      <div className="container centered">
        <div className="row justify-content-center text-center">
          <div className="col-6 shadow-lg">

          </div>
        </div>
      </div>

    </div>
  );
}
