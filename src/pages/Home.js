import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import  ListReviews  from "../components/ListReviews";

class Home extends Component {
  render() {
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>

        <ListReviews/>
      </div>
    );
  }
}

export default withAuth(Home);
