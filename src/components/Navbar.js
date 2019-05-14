import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return isLoggedin && (
      <div>
            <p>username: {user.username}</p>
            <button onClick={logout}>Logout</button>
            <Link to = {`/home`}>Back to home page</Link>
      </div>
    );
  }
}

export default withRouter(withAuth(Navbar));
