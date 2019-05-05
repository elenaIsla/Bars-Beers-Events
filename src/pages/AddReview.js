import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";
import StarRatingComponent from 'react-star-rating-component';

class AddReview extends Component {
    state = {
        title: "",
        comment: "", 
        ratingBeer: 1,
              
    };

    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ratingBeer: nextValue});
      }

    handleFormSubmit = event => {
    event.preventDefault();
    const { title, comment, ratingBeer } = this.state;
    const { id } = this.props.match.params;
    appService
    .createReview( id, { title, comment, ratingBeer })   
        .then(data => {
            this.props.history.push(`/bars/${id}`);
        })
        .catch(error => {
            console.log('review not created', error);
        })
        ;
    };

    handleChange = event => {
    console.log(event.target)
    const { name, value } = event.target;
    console.log(value);
    this.setState({ [name]: value });
    };

    render() {
        const { title, comment, ratingBeer } = this.state;
        return (
        <div>
            <form onSubmit={this.handleFormSubmit}> 
            <label>Title</label><br/>
                <input 
                    type="text" 
                    name="title"
                    value = {title}
                    onChange={this.handleChange}
                    placeholder="Title of review"/>               
            
            <label>Comment</label><br/>
                <input 
                    type="text" 
                    name="comment"
                    value = {comment}
                    onChange={this.handleChange}
                    placeholder="Write your comment"/> 
            <h2>Rating Beers: {ratingBeer}</h2>
                <StarRatingComponent 
                    name="ratingBeer" 
                    starCount={5}
                    value={ratingBeer}
                    onStarClick={this.onStarClick}
                /> 
            <input type="submit" value="Create Review" />             
            </form>
        </div>
        )
    }
}

export default withAuth(AddReview);