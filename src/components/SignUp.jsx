import React, { useContext, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { userAuthContext, useUserAuth } from "../contexts/UserAuthContext";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };
  const { user } = useContext(userAuthContext);
  if (user) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="body">
        <div>
          <div className="p-4 box">
            <h2 className="mb-3">Firebase Auth Signup</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-grid gap-2">
                <Button variant="primary" type="Submit">
                  Sign up
                </Button>
              </div>
            </Form>
          </div>
          <div className="p-4 box mt-3 text-center">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
