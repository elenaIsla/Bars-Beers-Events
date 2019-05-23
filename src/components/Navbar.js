import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import logoNav from "../navLogo.png";
import userLogo from "../user.svg";


class Navbar extends Component {
  render() {
    const { user, logout, isLoggedin } = this.props;
    return isLoggedin && (
      <div className="nav-container">
          <div className="nav-left">
            <Link to = {`/home`}>Back</Link>
          </div>
          
          <div className="nav-center">
           <img src={logoNav} alt="logo"/>
          </div>
          <div className="nav-right">
           <ul>
             <li>
             <Link to = {`/home`}> <div ><img width= "35  " src={userLogo} alt="user"/></div></Link>
             
                    <ul>
                        <li><Link to = {`/users/${user._id}`}>{user.username}</Link></li>
                        <li><Link to = {`/users/${user._id}/listFavourite`}><p>Favourites</p></Link></li>
                        <li><p className="paddingTen" onClick={logout}>Logout</p></li>
                    </ul>
            </li>
          </ul>

          </div>
         
      </div>
    );
  }
}

export default withRouter(withAuth(Navbar));
