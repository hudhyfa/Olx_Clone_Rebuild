import React, { useState } from "react";
import { FirebaseContextHook } from "../../store/Context";
import { useHistory } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { firebase } = FirebaseContextHook();
  const history = useHistory();

  function handleLogin(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        alert("Login error: " + err.message);
      });
  }

  return (
    <div
      style={{
        display: "flex",
        width: "90%",
        height: "80%",
        margin: "auto",
        border: "1px solid #002f34",
        marginTop: "80px",
        borderRadius: "12px",
      }}
    >
      <div className="loginParentDiv">
        <div className="login-logo">
          <img
            width="200px"
            height="200px"
            src="../../Images/olx_auth.jpeg"
          ></img>
        </div>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="login-input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="login-input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <div className="signup-link">
          <span>
            Don't have an account ?{" "}
            <a onClick={() => history.push("/signup")}>Signup</a>
          </span>
        </div>
      </div>
      <div className="olx-ad">
        <img src="../../Images/olx_login_ad.jpeg" />
      </div>
    </div>
  );
}

export default Login;
