import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";

class ListBarsTop10 extends Component { 
    state = {
        barlist: [],
        error: null,
        isLoaded: false,
    }
    componentDidMount() {
        this.getlistBars();
       this.getlistBarsByNeighbourhood();
    }
    getlistBars = () => {
        appService
        .listBars()
        .then(barlist => {
          this.setState({
            barlist,
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

    getlistBarsByNeighbourhood = () => {
        const {neighbourhood} = this.props.user;
        const listBarsFiltered = this.state.barlist.filter((bar) =>{
            return bar.address.neighbourhood === neighbourhood;
        })
        return listBarsFiltered;

    }

    getTop10Rating = () => {
        const listFiltered = this.getlistBarsByNeighbourhood();
      
        const listTop10 = listFiltered.sort((a, b) => {
            return b.averageRating - a.averageRating
        })
        return listTop10.length === 0 ? (
            <div className="padding">
                <p>Ups! There is no bar in your neighbourhood yet.
                Do you want to create the first one?</p>
               
            </div>
        ):(
            <div>
            {listTop10.map((bar, index) =>{
                return index <= 9 &&  (
                <div className="card-container" key={index}>
                    <Link to = {`/bars/${bar._id}`}>
                    <div className="bar-card-title">
                    <div className="bar-title">
                       <p> {bar.name}</p>
                        <p>{bar.address.neighbourhood}</p>
                    </div>
                    <div className="card-rating">
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
                

                <Link to = {`/bars/${bar._id}`} className="button-card-bar">
                 Know more
                 </Link>
            </div>
            
                </div>
        )})}   
             
            </div>
        )
    }  
    render() {
        
    return this.getTop10Rating();
        
    }
}

export default withAuth(ListBarsTop10);
