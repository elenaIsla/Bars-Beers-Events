import React, { Component } from 'react';
import appService from "../lib/AppService";
import { withAuth } from "../lib/AuthProvider";
import { Link } from "react-router-dom";

class UserDetails extends Component {

  state = {
    user: {},
    error: null,
    isLoaded: false,
  } 
  
  componentDidMount() {
    this.getUser(); 
  }

  getUser = () => {
    appService
      .getSingleUser(this.props.match.params)
        .then(user => {
            console.log(user);
            this.setState({
            user,
            isLoaded: true,
            });
        })
        .catch((error) => {
            this.setState({  
                isLoaded: true,
                error
            });
        });
    this.getlistBeers();
  }

  getlistBeers = () => {
    appService
    .listBeers()
        .then(listBeers => {
            this.setState({
            listBeers,
            isLoaded: true,
            });
            console.log(listBeers);
        })
        .catch((error) => {
            this.setState({  
                isLoaded: true,
                error
            });
        });
  }


  render(){
    console.log(this.state.user);
    const { _id, 
        username, 
        password, 
        city,
        neighbourhood,
        beerType,  
        favouriteBeers,
        favouriteBars, 
        userimage, } = this.state.user; 
    
    return this.state.user && (
      <div className="card-container">
      <div className="bar-card-title">
      <div className="bar-title">
      <h2>{username}</h2>
      <p>{neighbourhood}</p> 
      <p>{city}</p>
      </div>
      </div>
      <div className="bar-card-beers">
      <h3>Favorite Beers:</h3>
        {favouriteBeers ? ( favouriteBeers.map((beer, index) =>{
          return (
                <div key = {index}>
                {beer.name}          
                </div>   
            )})
        ):(
            <div>
                 So saaad!! {username} hasn't registered any favorite beer.
            </div>
        )}
      <h3>Favorite Bars:</h3>
        {favouriteBars ? (favouriteBars.map((bar, index) =>{
          return (
            <div key = {index}>
              {bar.name}          
            </div>  
            )})
        ):(
            <div>
                 So saaad!! {username} hasn't registered any favorite bar.
            </div>
        )}
      <br/>
      <Link to = {`/bars/${_id}/updateUser`}> <button className="review-button">Edit User</button> </Link>
      </div>
      </div>
    )}
}

export default withAuth(UserDetails);