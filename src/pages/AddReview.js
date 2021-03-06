import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";
import StarRatingComponent from 'react-star-rating-component';
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
        console.log(nextValue)
      }

    onStarClickToilet = (nextValue, prevValue, name) => {
        console.log(nextValue)
    this.setState({ratingToilet: nextValue});
    }

    onStarClickMusic = (nextValue, prevValue, name) => {
        this.setState({ratingMusic: nextValue});
        console.log(this.ratingMusic)
      }

    handleFormSubmit = event => {
    event.preventDefault();
    const { title, comment, ratingBeer, ratingToilet, ratingMusic, toiletPicture } = this.state;
    const { id } = this.props.match.params;

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
            <h3>Rating Beers: {ratingBeer}</h3>
               <div className="align-center"> 
                    <StarRatingComponent 
                    name="ratingBeer" 
                    starCount={5}
                    value={ratingBeer}      
                    onStarClick={this.onStarClickBeer}
                    /> 
                </div>
            <h3>Rating Toilet: {ratingToilet}</h3>
            <div className="align-center">
                <StarRatingComponent 
                    name="ratingToilet" 
                    starCount={5}
                    value={ratingToilet}
                    onStarClick={this.onStarClickToilet}
                /> 
            </div>
            <h3>Rating Music: {ratingMusic}</h3>
            <div className="align-center"> 
                <StarRatingComponent 
                    name="ratingMusic" 
                    starCount={5}
                    value={ratingMusic}
                    onStarClick={this.onStarClickMusic}
            />
            </div>
            <h3>Add one picture off the toilet:</h3>
                <FileUpload onUploadUrl={this.setImage}/>
                <input className="review-button"type="submit" value="Create Review" />             
            </form>
        </div>
        )
    }
}

export default withAuth(AddReview);