import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class ListReviews extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div>
        <h1>hay alguien alli</h1>

      </div>
    );
  }
}

export default withAuth(ListReviews);