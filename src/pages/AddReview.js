import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";
import StarRatingComponent from 'react-star-rating-component';
import beer from '../beer.svg';
import FileUpload from "../components/FileUpload";


class AddReview extends Component {
    state = {
        title: "",
        comment: "", 
        ratingBeer: 1,
        ratingToilet: 1,
        ratingMusic: 1,
        toiletPicture: "",
               
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
    const { title, comment, ratingBeer, ratingToilet, ratingMusic, toiletPicture } = this.state;
    const { id } = this.props.match.params;
    console.log(toiletPicture)
    appService
    .createReview({ id, title, comment, ratingBeer, ratingToilet, ratingMusic, toiletPicture })   
        .then(data => {
            this.props.history.push(`/bars/${id}`);
        })
        .catch(error => {
            console.log('review not created', error);
        })
        ;
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    setImage = (url) => {
        this.setState({
            toiletPicture: url
        })
    }

    render() {
        const { title, comment, ratingBeer, ratingToilet, ratingMusic } = this.state;
        return (
        <div className="padding">
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
                             
                    starColor="#fbde45"
                    emptyStarColor="#efeff4"
                    value={ratingBeer}
                    renderStarIcon={() => <img src={beer} alt="beer"/>}
                    onStarClick={this.onStarClickBeer}
                /> 
            <h2>Rating Music: {ratingMusic}</h2>
                <StarRatingComponent 
                    name="ratingMusic" 
                    starCount={5}
                    value={ratingMusic}
                    onStarClick={this.onStarClickMusic}
            />
            
            <h2>Rating Toilet: {ratingToilet}</h2>
                <StarRatingComponent 
                    name="ratingToilet" 
                    starCount={5}
                    value={ratingToilet}
                    onStarClick={this.onStarClickToilet}
                /> 
             
            <h3>Add one picture off the toilet:</h3>

            <FileUpload onUploadUrl={this.setImage}/>

            <input className="review-button"type="submit" value="Create Review" />             
            </form>
        </div>
        )
    }
}

export default withAuth(AddReview);