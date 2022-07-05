import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Header() {
  const auth = useSelector((state) => state.auth);
  const { LoggedUser, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("Login");
      window.location.href = "/";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="#" className="avatar">
          <label>Name {LoggedUser.name}</label>
        </Link>
        <ul className="dropdown">
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>
          </li>
        </ul>
      </li>
    );
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">DevAT✮Shop</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">
            <i className="fas fa-shopping-cart"></i> Cart
          </Link>
        </li>
        {isLogged ? (
          userLink()
        ) : (
          <li>
            <Link to="/login">Sign in</Link>
          </li>
        )}
      </ul>
    </header>
  );
}

export default Header;
