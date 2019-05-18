import React, { Component } from 'react';
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";
import { Link } from "react-router-dom";

class BarDetails extends Component {

  state = {
    bar: {},
    error: null,
    isLoaded: false,
  } 
  
  componentDidMount() {
    this.getBar();
    this.getReviews();
  }

  getBar = () => {
    appService
      .getSingleBar(this.props.match.params)
        .then(bar => {
          console.log(bar);
          this.setState({
            bar,
            isLoaded: true,
          });
          console.log(bar.draftBeer);
        })
        .catch((error) => {
          this.setState({  
              isLoaded: true,
              error
          });
        }); 
  }
  
  getReviews = () => {
    appService
      .getReviewsFrom(this.props.match.params)
        .then(reviews => {
          this.setState({
            reviews,
            isLoaded: true,
          });
          console.log(reviews)
        })
        .catch((error) => {
          this.setState({  
              isLoaded: true,
              error
          });
        }); 
  }
   

  handleDeleteBar = () => {
    const {params} = this.props.match;
    appService
      .deleteBar(params)
      .then(data => {
        console.log('ok');
        this.props.history.push('/home');
      })
      .catch(error => {
        console.log('no se ha borrado', error);
      }); 
  }

  render(){
    console.log(this.state.bar);
    console.log(this.state.reviews)
    const { _id, barType, name, street, neighbourhood, city, price, draftBeer, bottleBeer } = this.state.bar;
    const {reviews} = this.state; 
    
    return this.state.bar && (

      <div className="card-container">
      <div className="bar-card-title">
      <h3 className="padding">{name}</h3>
      <p>{neighbourhood}, {city}</p>
      <p>{street}, {price}</p>
      </div>
      <div className="bar-card-beers">
      <h3>Draft beers</h3>
      <hr></hr>
        {draftBeer && (!(draftBeer.length === 0) ? (draftBeer.map((beer, index) =>{

          return (
            <div key = {index}>
              {beer.name}          
            </div>

          )})
          ):(
            <div>
              What a pity! There is no beer registered here yet!
            </div>   
        ))}
      <h3>Bottle beers</h3>
      <hr></hr>
        {bottleBeer && (!(bottleBeer.length === 0) ? (bottleBeer.map((beer, index) =>{

          return (
            <div key = {index}>
              {beer.name}          
            </div>  
            )})
            ):(
              <div>
                What a pity! There is no beer registered here yet!
              </div>
        ))}
      <br/>
      <h3>List of reviews</h3>
      {reviews && reviews.map((review, index) => {
        return (
          <div key = {index}>
            <p>{review.title},   {review.comment},  {review.creator[0].username}</p>
          </div>
        )
      })}
      {this.props.user.username === 'admin' ? (
            <>
           
            <button onClick={this.handleDeleteBar} className="review-button">Delete Bar</button><br/>
           <Link to = {`/bars/${_id}/updateBar`}> <button className="review-button">Edit Bar</button> </Link>
         
            </>
          ) : (<></>)}
           <Link to = {`/bars/${_id}/addReview`}> <button className="review-button">Add a review</button></Link>
      
      
      </div>
      </div>
    )}
}

export default withAuth(BarDetails);