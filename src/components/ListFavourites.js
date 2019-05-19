import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";

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
        console.log(idBar)
        console.log(idUser)
        appService
          .deleteFromFavorite(idUser, idBar)
            .then(data => {
                this.getlistFavourites();
            })
            .catch(error => {
            });
    }

    render() {
        
        const {favouritelist} = this.state
    return (
        <div className="padding">
            {favouritelist && favouritelist.map((bar, index) =>{
                return (
                    <div key={index}>
                        <Link to = {`/bars/${bar._id}`}>
                           <h3> {bar.name} </h3>
                
                        </Link>
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
