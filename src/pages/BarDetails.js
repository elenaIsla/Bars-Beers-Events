import React, { Component } from 'react';
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";
import { Link } from "react-router-dom";

class BarDetails extends Component {

  state = {
    bar: {},
      // barType: "",
      // name: "",
      // categoryType: "",
      // street: "",
      // neighbourhood: "",
      // city: "",
      // _id: "",
      // draftBeer: [],
      // bottleBeer:[],
      // price: "",
      // beerlist: [],
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
<<<<<<< HEAD
    const { _id, barType, name, street, neighbourhood, city, price, draftBeer, bottleBeer } = this.state.bar; 
=======
    console.log(this.state.reviews)
    const { _id, barType, name, street, neighbourhood, city, price, draftBeer, bottleBeer } = this.state.bar;
    const {reviews} = this.state; 
>>>>>>> 5807421da1b176574e0f52d45f5332782f5f7fee
    
    return this.state.bar && (
      <div>
      <h2>{name}</h2>
      <p>{neighbourhood}, {city}, {barType}</p>
      {street}
      {price}
<<<<<<< HEAD
      <h2>Draft beers</h2>
        {draftBeer && draftBeer.map((beer, index) =>{
=======
      <h3>Draft beers</h3>
        {draftBeer && (!(draftBeer.length === 0) ? (draftBeer.map((beer, index) =>{
>>>>>>> 5807421da1b176574e0f52d45f5332782f5f7fee
          return (
            <div key = {index}>
              {beer.name}          
            </div>
            
<<<<<<< HEAD
            )})}
      <h2>Bottle beers</h2>
        {bottleBeer && bottleBeer.map((beer, index) =>{
=======
          )})
          ):(
            <div>
              So saaad!! Noone has registered any draft beer in this bar.
            </div>   
        ))}
      <h3>Bottle beers</h3>
        {bottleBeer && (!(bottleBeer.length === 0) ? (bottleBeer.map((beer, index) =>{
>>>>>>> 5807421da1b176574e0f52d45f5332782f5f7fee
          return (
            <div key = {index}>
              {beer.name}          
            </div>  
            )})
            ):(
              <div>
                So saaad!! Noone has registered any bottle beer in this bar.
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
      
      <Link to = {`/bars/${_id}/addReview`}> Add a review</Link>
      <button onClick={this.handleDeleteBar}>Delete Bar</button><br/>
      <Link to = {`/bars/${_id}/updateBar`}> Edit Bar </Link>
      
      </div>
    )}
}

export default withAuth(BarDetails);