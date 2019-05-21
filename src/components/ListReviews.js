import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";
import beer from "../beer.svg";

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
    return (
        <div>
            {reviewlist.map((review, index) =>{
                return (
                <div className="card-container" key={index}> 
                        <div className="bar-card-title">
                        <div className="bar-title">
                        <Link to = {`/bars/${review.barID[0]._id}`}>
                            <h3>{review.barID[0].name}</h3></Link>
                            <p>{review.barID[0].address.neighbourhood}</p>
                        </div>
                        
                       <div className="flex-column">
                       <img className="paddingTen" src={beer} alt="logo"/>
                       <p>Rating: {review.barID[0].averageRating.toFixed(1)}</p>
                        </div>
                        </div>
                      <div className="bar-card-beers grid-flex">  
                            <div className="box">
                                <Link to = {`/users/${review.creator[0]._id}`}>
                            <img className="circle-avatar" src={review.creator[0].userimage} alt=""></img>

                            </Link>
                            </div>
                            <div className="half-box">
                            <h3>{review.title}</h3>
                            <p>{review.comment}</p>
                            </div>

                        
                        </div> 
                        <div className="width padding">
                        <Link to = {`/bars/${review.barID[0]._id}`}>
                            <button className="button-card-bar">Know more</button>
                        </Link> 
                        
                        {user.username === 'admin' && (
                            <>
                                <button className="delete-button margin" onClick={() => this.handleDeleteReview(review._id)}>Delete review</button>
                            </>
                        )} 
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
