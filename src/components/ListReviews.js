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
                appService
                    .listReviews()
                        .then(reviewlist => {
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
            })
            .catch(error => {
                console.log('no se ha borrado', error);
            });
      }

    render() {
        const {reviewlist} = this.state
        console.log(reviewlist)
    return (
        <div>
            {reviewlist.map((review, index) =>{
                return (
                <div key={index}>
                    
                        {review.title}
                        {review.comment}
                        <StarRatingComponent 
                            name="ratingBeer" 
                            starCount={5}
                            value={review.ratingBeer}
                            editing={false}
                            />
                        {review.creator[0].username}
                        {review.barID[0].name}
                        <button onClick={() => this.handleDeleteReview(review._id)}>Delete review</button>
                    
                </div>
                )               
            })
            }        
        </div>
    );
    }
}

export default withAuth(ListReviews);
