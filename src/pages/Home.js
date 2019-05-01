import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import ListBeers from "../components/ListBeers";
import ListBars from "../components/ListBars";
import ListUsers from "../components/ListUsers";


class Home extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>
        <Link to = "/createBar">Create Bar</Link><br/>
          {user.username === 'admin' ? (
            <>
            <Link to = "/createBeer">Create Beer</Link>
            </>
          ) : (<></>)}
        <ListBeers/><br/>
        <ListBars/><br/>
        <ListUsers/>
        
      </div>
    );
  }
}

export default withAuth(Home);
