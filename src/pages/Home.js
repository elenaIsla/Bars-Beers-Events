import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";
import ListReviews from "../components/ListReviews";
import ListBarsTop10 from "../components/ListBarsTop10";
import ListUsers from '../components/ListUsers';
import filterButton from "../filterButton.svg";


class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="margin">
  
        <Link to = "/createBar" className="floating-button">Create Bar</Link><br/>

        <div className="padding">
        <Link to = "/filter/bars">
        <button className="filter-button">
          Filter by categories
          </button>
        </Link>
        </div>
        <h3 className="padding">Top 10 Bars near you:</h3>
        <ListBarsTop10/><br/>
       
        <h3 className="padding">Top 10 - Best rated</h3>
        <ListReviews/>
        {/* <div className="padding"><h3>List of Users:</h3>
        <ListUsers/></div> */}
        { user.username === 'admin' ? (
            <>
            <div className="width padding">
          
            <Link to = "/createBeer"><button className="delete-button margin">Create Beer</button></Link>
          
            <Link to = "/listBeers"><button className="delete-button margin">Go to Beers</button></Link>
            </div>
            </>
          ) : (<></>)} 
        
      </div>
    );
  }
}

export default withAuth(Home);
