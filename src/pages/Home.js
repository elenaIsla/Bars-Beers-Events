import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import ListBars from "../components/ListBars";
import ListUsers from "../components/ListUsers";
import ListReviews from "../components/ListReviews";
import ListBarsTop10 from "../components/ListBarsTop10";


class Home extends Component {
  state = {

  }
  render() {
    const { user } = this.props;
    return (
      <div>
  
        <Link to = "/createBar" className="floating-button">Create Bar</Link><br/>
          {user.username === 'admin' ? (
            <>
            <div className="padding">
            <div className="margin">
            <Link to = "/createBeer"  className="onlyAdmin-button">Create Beer</Link></div>
            <div className="margin">
            <Link to = "/listBeers" className="onlyAdmin-button">Go to Beers</Link></div>
            </div>
            </>
          ) : (<></>)}
        <Link to = "/filter/bars" className="onlyAdmin-button">Filter</Link>
        
        <h3 className="padding">Top 10 Bars near you:</h3>
        <ListBarsTop10/><br/>
       
        <h3 className="padding">Top 10 - Best rated</h3>
        <ListReviews/>
        <div className="padding"><h3>Total list of Bars:</h3>
        <ListBars/></div>
        <div className="padding"><h3>List of Users:</h3>
        <ListUsers/></div>
        
      </div>
    );
  }
}

export default withAuth(Home);
