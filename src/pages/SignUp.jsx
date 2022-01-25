import React, { useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const SignUp = ({ title, handleClick }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const signupMailRef = React.useRef(null);
  const signupPassRef = React.useRef(null);
  const signupRef = React.useRef(null);
  const { functionRegisterWithCredentials } = React.useContext(AuthContext);
  const loginBtn = (e) => {
    const parent = e.target.parentNode;
    if (!parent.parentNode.classList.toString().includes("slide-up")) {
      signupRef.current.classList.remove("slide-up");
    }
    parent.parentNode.classList.toggle("slide-up");
  };

  function handleSubmitSignUp() {
    console.log(functionRegisterWithCredentials);
    console.log(123, signupMailRef.current.value, signupPassRef.current.value);
    functionRegisterWithCredentials(
      signupMailRef.current.value,
      signupPassRef.current.value
    );
  }

  return (
    <div className="form-structor">
      <div onSubmit={handleSubmitSignUp} ref={signupRef} className="signup">
        <h2 className="form-title">
          <span>or</span>Sign up
        </h2>
        <div className="form-holder">
          {/* <input type="text" className="input" placeholder="Name" /> */}
          <input
            ref={signupMailRef}
            type="email"
            className="input"
            placeholder="Email"
          />
          <input
            ref={signupPassRef}
            type="password"
            className="input"
            placeholder="Password"
          />
        </div>
        <button
          onClick={handleSubmitSignUp}
          type="submit"
          className="submit-btn"
        >
          Sign up
        </button>
      </div>
      <div className="login slide-up">
        <div className="center">
          <h2 className="form-title" onClick={loginBtn}>
            <span>or</span>Log in
          </h2>
          <div className="form-holder">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="input"
              placeholder="Email"
            />
            <input
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              className="input"
              placeholder="Password"
            />
          </div>
          <button className="submit-btn" onClick={handleClick}>
            Log in{title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
