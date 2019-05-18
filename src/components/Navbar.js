import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return isLoggedin && (
      <div className="nav-container">
          <div className="nav-left">
            
            <Link to = {`/home`}>Back</Link>
          </div>
          
          <div className="nav-center">
           <img src={process.env.PUBLIC_URL + "images/nav-logo.png"} alt="logo"/>
          </div>
          <div className="nav-right">
            <Link to = {`/users/${user._id}`}>{user.username}</Link>
            <Link to = {`/users/${user._id}/listFavourite`}>Favourites</Link>
            <button onClick={logout}>Logout</button>
          </div>
         
      </div>
    );
  }
}

export default withRouter(withAuth(Navbar));
