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
           <ul>
             <li>
             <Link to = {`/home`}> <img width="35" src={process.env.PUBLIC_URL + "images/user.svg"} alt="user"/></Link>
             
                    <ul>
                        <li><Link to = {`/users/${user._id}`}>{user.username}</Link></li>
                        <li><Link to = {`/users/${user._id}/listFavourite`}>Favourites</Link></li>
                        <li><p className="padding" onClick={logout}>Logout</p></li>
                    </ul>
            </li>
          </ul>
            {/* <div className="flex">
              <div className="nav-img"><Link to = {`/users/${user._id}/listFavourite`}><img width="17" src={process.env.PUBLIC_URL + "images/heart.svg"} alt="favourites"/></Link></div>
              <div className="nav-ing"><img width="17" onClick={logout} src={process.env.PUBLIC_URL + "images/logout.svg"} alt="logo"/></div>
            </div> */}
          </div>
         
      </div>
    );
  }
}

export default withRouter(withAuth(Navbar));
