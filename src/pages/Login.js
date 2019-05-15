import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";


class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { username, password } = this.state;
    return (
      <div className="padding">
       <img className="logo" src={process.env.PUBLIC_URL + "images/logo.jpg"} alt="logo"/>
      <form onSubmit={this.handleFormSubmit}>
        <label>USERNAME:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={this.handleChange}
          placeholder="Your username"
        />
        <label>PASSWORD:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
          placeholder="********"
        />
        <input className="login-btn" type="submit" value="Login" />
      </form>
          <div>
          <div><p>DON'T HAVE AN ACCOUNT?</p></div>
          <Link to="/signup" className="singup_link">SIGNUP</Link>
          </div>
      </div>
    );
  }
}

export default withAuth(Login);
