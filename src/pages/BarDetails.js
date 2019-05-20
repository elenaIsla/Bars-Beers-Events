import React, { Component } from 'react';
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";
import { Link } from "react-router-dom";
import "react-alice-carousel/lib/scss/alice-carousel.scss";
import AliceCarousel from 'react-alice-carousel'

class BarDetails extends Component {

  state = {
    bar: {},
    address: {},
    reviews: [],
    toiletPictures: [],
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
          this.setState({
            bar,
            address: bar.address,
            toiletPictures: bar.toiletPictures,
            isLoaded: true,
          });
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
        this.props.history.push('/home');
      })
      .catch(error => {
      }); 
  }

  render(){
    console.log(this.state.bar.toiletPictures)
    const { _id, 
      barType, 
      name, 
      price, 
      draftBeer, 
      bottleBeer, 
      averageRating,
      ratingBeer,
      ratingToilet,
      ratingMusic,
     } = this.state.bar;
    const {street, neighbourhood, city} = this.state.address;
    const {reviews, toiletPictures} = this.state;  
    
    return this.state.bar && (

      <div className="card-container">
      <div className="bar-card-title">
      <p>{barType}</p>
      <h3 className="padding">{name}</h3>
      <p>{neighbourhood}</p> 
      <p>{city}</p>
      <p>{street}</p>
      <p>{averageRating && averageRating.toFixed(1)}</p>
      <br/>
      <p>{reviews.length}</p>
      </div>
    
      <div className="bar-card-beers">
      
      <p>{ratingBeer}</p>
      <p>{ratingMusic}</p>
      <p>{ratingToilet}</p>
      <p>
      {(() => {
        switch (price) {
          case "range1":   return "1 - 2 €";
          case "range2": return "2 - 3 €";
          case "range3":  return "3 - 4 €";
          default:      return "No range price added";
        }
      })()}
      </p>
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
      <h3>Picture of the toilet</h3>
      <div className="class-picture-slide">
        <div className="class-porta-picture">
        {toiletPictures.map((foto, index) => {
          return (
            <div className="class-imagen" key= {index}><img src={foto} alt="foto baño"/></div>
          )
        })}
        </div>
      </div>
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