import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";
import StarRatingComponent from 'react-star-rating-component';

class AddReview extends Component {
    state = {
        title: "",
        comment: "", 
        ratingBeer: 1,
        ratingToilet: 1,
        ratingMusic: 1
        
              
    };

    onStarClickBeer = (nextValue, prevValue, name) => {
        this.setState({ratingBeer: nextValue});
      }

    onStarClickToilet = (nextValue, prevValue, name) => {
    this.setState({ratingToilet: nextValue});
    }

    onStarClickMusic = (nextValue, prevValue, name) => {
        this.setState({ratingMusic: nextValue});
      }

    handleFormSubmit = event => {
    event.preventDefault();
    const { title, comment, ratingBeer, ratingToilet, ratingMusic } = this.state;
    const { id } = this.props.match.params;
    appService
    .createReview({ id, title, comment, ratingBeer, ratingToilet, ratingMusic })   
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
        console.log(this.props.match.params.id)
        const { title, comment, ratingBeer, ratingToilet, ratingMusic } = this.state;
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
                    onStarClick={this.onStarClickBeer}
                /> 
            <h2>Rating Toilet: {ratingToilet}</h2>
                <StarRatingComponent 
                    name="ratingToilet" 
                    starCount={5}
                    value={ratingToilet}
                    onStarClick={this.onStarClickToilet}
                /> 
            <h2>Rating Music: {ratingMusic}</h2>
                <StarRatingComponent 
                    name="ratingMusic" 
                    starCount={5}
                    value={ratingMusic}
                    onStarClick={this.onStarClickMusic}
                /> 
            <input type="submit" value="Create Review" />             
            </form>
        </div>
        )
    }
}

export default withAuth(AddReview);