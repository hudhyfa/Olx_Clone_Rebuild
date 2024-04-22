import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FirebaseContextHook } from "../../store/Context";
import Logo from "../../olx-logo.png";
import "./Signup.css";

export default function Signup() {
  const history = useHistory();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState("");
  const { firebase } = FirebaseContextHook();

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: userName }).then(() => {
          firebase
            .firestore()
            .collection("users")
            .add({
              id: result.user.uid,
              username: userName,
              phone: phone,
            })
            .then(() => {
              history.push("/login");
            });
        });
      });
  };

  return (
    <div
      style={{
        display: "flex",
        width: "90%",
        height: "85%",
        margin: "auto",
        border: "1px solid #002f34",
        borderRadius: "12px",
        padding: "20px",
        marginTop: "25px",
      }}
    >
      <div className="olx-ad">
        <img src="../../Images/olx_signup_ad.jpeg" />
      </div>
      <div className="signupParentDiv">
        <div className="login-logo">
          <img width="200px" height="200px" src="../../Images/olx_auth.jpeg" />
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="login-input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="login-input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="login-input"
            type="number"
            id="lname"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="login-input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <div className="login-link">
          <span>
            Already have an account ?{" "}
            <a onClick={() => history.push("/login")}>Login</a>
          </span>
        </div>
      </div>
    </div>
  );
}
