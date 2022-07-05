import { isLength, isMatch } from "./validation/Validation";
import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { customAlphabet } from "nanoid";
import { useNavigate } from "react-router-dom";
const nanoid = customAlphabet("1234567890", 3);

export default function Register() {
  const auth = useSelector((state) => state.auth);
  const { LoggedUser } = auth;
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const [token, setToken] = useState();

  //   var status = false;
  console.log(auth);
  const redirect = () => {
    if (LoggedUser.isFirstLogin) {
      console.log(!LoggedUser.isFirstLogin);
      navigate("/");
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    // setUser((values) => ({ ...values, status: status }));
    setUser((values) => ({ ...values, [name]: value, id: nanoid() }));
  };

  const handleStatus = (e) => {
    console.log("status", e.target.value);
    setUser((values) => ({ ...values, status: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("user", user);

    console.log("token", token);

    if (isLength(user.password)) {
      alert("Password must be at least 8 characters long");
      return;
    }

    if (!isMatch(user.password, user.cPassword)) {
      alert("Password and Confirm Password must match");
      return;
    }

    try {
      await axios.post("user/register", user).then((res) => {
        alert(res.data.msg);
      });

      await axios
        .post("user/reset", user, { headers: { Authorization: token } })
        .then((res) => {
          alert(res.data.msg);
        });
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  useEffect(() => {
    setToken(localStorage.getItem("TOKEN"));
    setTimeout(() => {
      redirect();
    }, 0);
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" required name="email" onChange={handleChange} />
        </div>
        <br></br>
        <div>
          <label>Account Type:</label>
          <input
            type="text"
            required
            name="accountType"
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            required
            name="firstName"
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label>Last Name:</label>
          <input type="text" required name="lastName" onChange={handleChange} />
        </div>
        <br></br>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            required
            name="password"
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            required
            name="cPassword"
            onChange={handleChange}
          />
        </div>
        <br></br>

        <div>
          <label>Date of Birth:</label>
          <input
            type="date"
            required
            name="dateOfBirth"
            onChange={handleChange}
          />
        </div>
        <br></br>
        <div>
          <label>Mobile:</label>
          <input type="text" required name="mobile" onChange={handleChange} />
        </div>
        <br></br>
        <div>
          <label>Status:</label>
          <input
            type="checkbox"
            name="status"
            defaultValue
            onChange={handleStatus}
          />
        </div>
        <br></br>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
