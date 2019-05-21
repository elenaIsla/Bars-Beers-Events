import React, {Component} from "react";
import { Link } from "react-router-dom";
import beer from "../beer.svg";


class FilterItems extends Component {
    render() {
      return (

        <div>
            {this.props.data.map((bar, index) =>{
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
            
                </div>
                )               
            })
            }        
        </div>
     
      );
    }
  };

export default FilterItems;