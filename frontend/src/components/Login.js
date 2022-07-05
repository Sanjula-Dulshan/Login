import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { dispatchLogin } from "../redux/actions/authAction";
import { useDispatch } from "react-redux";

export default function Login() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("user", user);

    try {
      const response = await axios.post("user/firstLogin", user);
      alert(response.data.msg);
      localStorage.setItem("Login", true);
      navigate("/register");

      dispatch(dispatchLogin());
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Enter your Email:</label>
          <input type="text" name="email" onChange={handleChange} />
        </div>
        <br></br>
        <div>
          <label>Enter your password:</label>
          <input type="password" name="password" onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
