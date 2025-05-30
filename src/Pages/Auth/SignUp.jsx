<<<<<<< HEAD
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="signup-container">
      {/* Logo */}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className="signup-logo"
        />
      </Link>

      {/* Form Box */}
      <div className="signup-box">
        <h1>Sign In</h1>
        <form className="signup-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="signup-button">
            Sign In
          </button>
        </form>

        <p className="signup-disclaimer">
          By continuing, you agree to Amazon’s Conditions of Use and Privacy
          Notice. 
        </p>

        <div className="signup-create-button">
          <button onClick={() => console.log("Redirect to Create Account")}>
            Create your Amazon Account
          </button>
        </div>
      </div>
    </div>
=======
import React from "react";
import LayOut from "../../components/LayOut/LayOut";
function SignUp() {
  return (
    <LayOut>
      <div>SignUp</div>
    </LayOut>
>>>>>>> 350ba2a61035ec0dd0adf114e440730b1a2a689b
  );
}

export default SignUp;
