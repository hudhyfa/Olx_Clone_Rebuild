import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext, FirebaseContextHook } from "../../store/Context";
import "./Header.css";
import OlxLogo from "../../assets/OlxLogo";
import Search from "../../assets/Search";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
function Header() {
  const { user } = useContext(AuthContext);
  const { firebase } = FirebaseContextHook();
  const history = useHistory();

  function handleSell() {
    if (user) {
      history.push("/create");
    } else {
      history.push("/login");
    }
  }

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <a
            onClick={() => {
              if (!user) history.push("/login");
            }}
          >
            {user ? user.displayName : "Login"}
          </a>
          <hr />
        </div>
        {user && (
          <button
            style={{
              border: "1px solid transparent",
              borderRadius: "4px",
              padding: "8px",
              backgroundColor: "#002f34",
              color: "white",
            }}
            onClick={() => {
              firebase.auth().signOut();
              alert("You have been logged out");
              history.push("/");
            }}
          >
            Logout
          </button>
        )}
        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <a onClick={handleSell}>SELL</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
