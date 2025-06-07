import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useStateValue } from "../../components/Dataprovider/DataProvider";
import { actionType } from "../../Utility/ActionType";
import Loader from "../../components/Loader/Loader";
import "./SignUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [{ alert: globalAlert }, dispatch] = useStateValue();
  const navigate = useNavigate();
  const location = useLocation();

  // Local state for alert message coming from redirect (ProtectedRoute)
  const [navAlert, setNavAlert] = useState("");

  useEffect(() => {
    // Clear global alert when this component mounts
    if (globalAlert) {
      dispatch({ type: actionType.CLEAR_ALERT });
    }

    // If there is an alert message in the navigation state, set it locally
    if (location.state?.alert) {
      setNavAlert(location.state.alert);
    }
  }, [globalAlert, dispatch, location.state]);

  const handleError = (err) => {
    switch (err.code) {
      case "auth/invalid-email":
        setError("Invalid email address.");
        break;
      case "auth/user-not-found":
      case "auth/wrong-password":
        setError("Incorrect email or password.");
        break;
      case "auth/email-already-in-use":
        setError("This email is already in use.");
        break;
      case "auth/weak-password":
        setError("Password should be at least 6 characters.");
        break;
      default:
        setError("An unexpected error occurred.");
    }
  };

  const authHandler = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({
        type: actionType.SET_USER,
        user: userCredential.user,
      });
      navigate("/");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const createAccount = async () => {
    setError(""); // Clear previous errors

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({
        type: actionType.SET_USER,
        user: userCredential.user,
      });
      navigate("/");
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      {loading && <Loader />}
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon Logo"
          className="signup-logo"
        />
      </Link>
      <div className="signup-box">
        <h1>Sign In</h1>

        {/* Show alert from navigation state if any */}
        {navAlert && <p className="signup-error">{navAlert}</p>}

        {/* Show error from auth attempts */}
        {error && <p className="signup-error">{error}</p>}

        <form className="signup-form" onSubmit={authHandler}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="signup-disclaimer">
          By continuing, you agree to Amazon’s Conditions of Use and Privacy
          Notice.
        </p>
        <div className="signup-create-button">
          <button onClick={createAccount} disabled={loading}>
            {loading ? "Creating Account..." : "Create your Amazon Account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
