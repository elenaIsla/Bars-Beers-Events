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
      <div className="margin">
  
        <Link to = "/createBar" className="floating-button">Create Bar</Link><br/>

        {/* <ListBeers/><br/> */}
        <h3 className="padding">Top 10 Bars near you:</h3>
        <ListBarsTop10/><br/>
       
        <h3 className="padding">Top 10 - Best rated</h3>
        <ListReviews/>
        <div className="padding"><h3>Total list of Bars:</h3>
        <ListBars/></div>
        <div className="padding"><h3>List of Users:</h3>
        <ListUsers/></div>
        {user.username === 'admin' ? (
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
