import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";
import beer from "../beer.svg";

class ListUsers extends Component { 
    state = {
        favouritelist: [],
        error: null,
        isLoaded: false,
    }
    componentDidMount() {
        this.getlistFavourites();
    }

    getlistFavourites = () =>{
        appService
          .getSingleUser(this.props.match.params)
            .then(user => {
                this.setState({
                favouritelist: user.favouriteBars,
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

    handleDeleteFavourite = (idBar) => {
        const idUser = this.props.user._id;
        appService
          .deleteFromFavorite(idUser, idBar)
            .then(data => {
                this.getlistFavourites();
            })
            .catch(error => {
            });
    }

    render() {
        console.log(this.state.favouritelist)
        
        const {favouritelist} = this.state
    return (
        <div className="padding">
            {favouritelist && favouritelist.map((bar, index) =>{
                return (
                    <div className="card-container" key={index}>
            <Link to = {`/bars/${bar._id}`}>
            <div className="bar-card-title">
            <div className="bar-title">
                <h3> {bar.name}</h3>
                <p>{bar.address.neighbourhood}</p>
            </div>
            <div className="flex column">
            <img src={beer} alt="logo"/>
            <p>Rating: {bar.averageRating.toFixed(1)}</p>
            </div>
            </div>
            </Link>
            <div className="bar-card-beers">
            <h4>Beers</h4>
            <hr></hr>
                <p>Drafted Beers: </p>
                    {bar.draftBeer.map((beer, index) =>{
                return (
            <p key = {index}>
              {beer.name}         
            </p>
        )})}
    
                 <p>Bottle Beers: </p>
                    {bar.bottleBeer.map((beer, index) =>{
                        return (
                             <div key = {index}>
                              <p>{beer.name}   </p>                 
                </div> 
                 )})}  
                

                <Link to = {`/bars/${bar._id}`}>
                 <button className="button-card-bar">Know more</button>
                 </Link>
            </div>
                <button className="admin-button" onClick={() => this.handleDeleteFavourite(bar._id)}>Delete From Favourite</button>
                </div>
                )               
            })
            }        
        </div>
    );
    }
}

export default withAuth(ListUsers);
