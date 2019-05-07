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
      <div>
       <img className="logo" src={process.env.PUBLIC_URL + "images/logo.jpg"} alt="logo"/>
      <form onSubmit={this.handleFormSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={this.handleChange}
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={this.handleChange}
        />
        <input className="login-btn" type="submit" value="Login" />
      </form>
          <div>
          <h3>DON'T HAVE AN ACCOUNT?</h3>
          <Link to="/signup"><button className="login_link">Signup</button></Link>
          </div>
      </div>
    );
  }
}

export default withAuth(Login);
