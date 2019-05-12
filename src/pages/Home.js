import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import ListBeers from "../components/ListBeers";
import ListBars from "../components/ListBars";
import ListUsers from "../components/ListUsers";
import ListReviews from "../components/ListReviews";
import ListBarsTop10 from "../components/ListBarsTop10";


class Home extends Component {
  state = {

  }
  render() {
    const { user, logout, isLoggedin } = this.props;
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>
        <Link to = "/createBar">Create Bar</Link><br/>
          {user.username === 'admin' ? (
            <>
            <Link to = "/createBeer">Create Beer</Link><br/>
            <Link to = "/listBeers">Go to Beers</Link>
            </>
          ) : (<></>)}
        {/* <ListBeers/><br/> */}
        <h3>Top 10 Bars in your Neighbourhood:</h3>
        <ListBarsTop10/><br/>
        <h3>Total list of Bars:</h3>
        <ListBars/>
        <h3>List of Users:</h3>
        <ListUsers/>
        <h3>List of Reviews:</h3>
        <ListReviews/> 
        
      </div>
    );
  }
}

export default withAuth(Home);
