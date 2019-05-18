import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";
import StarRatingComponent from 'react-star-rating-component';

class ListReviews extends Component { 
    state = {
        reviewlist: [],
        error: null,
        isLoaded: false,
    }
    componentDidMount() {
        this.getlistReviews();
    }

    getlistReviews = () => {
        appService
          .listReviews()
          .then(reviewlist => {
            console.log(reviewlist)
            this.setState({
              reviewlist,
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

    handleDeleteReview = (id) => {   
        appService
          .deleteReview (id)
            .then(data => {
                this.getlistReviews();
            })
            .catch(error => {
                console.log('no se ha borrado', error);
            });
      }

    render() {
        const {reviewlist} = this.state
        const {user} = this.props
        console.log(reviewlist)
    return (
        <div>
            {reviewlist.map((review, index) =>{
                return (
                <div className="card-container" key={index}> 
                        <div className="bar-card-title">
                        <div className="bar-title">
                        <Link to = {`/bars/${review.barID[0]._id}`}><p>{review.barID[0].name}</p></Link>
                        <p>{review.barID[0].neighbourhood}</p>
                        </div>
                        
                       <div className="card-rating"><StarRatingComponent 
                            name="ratingBeer" 
                            starCount={5}
                            value={review.ratingBeer}
                            editing={false}
                        /> 
                        </div>
                        </div>
                      <div className="bar-card-beers">  
                            <Link to = {`/users/${review.creator[0]._id}`}><p>{review.creator[0].username}</p></Link>
                            <h3>{review.title}</h3>
                            <p>{review.comment}</p>
                        {user.username === 'admin' && (
                            <>
                                <button onClick={() => this.handleDeleteReview(review._id)}>Delete review</button>
                            </>
                        )} 

                        <Link to = {`/bars/${review.barID[0]._id}`}>
                            <button className="button-card-bar">Know more</button>
                 </Link> 
                        </div>                  
                </div>
                )               
            })
            }        
        </div>
    );
    }
}

export default withAuth(ListReviews);
