import React, {Component} from "react";
import { Link } from "react-router-dom";


class FilterItems extends Component {
    render() {
      return (
        <div className="filter-items">
        <div>
            {this.props.data.map((bar, index) =>{
                return (
                <div className="card-container" key={index}>
                    <div className="bar-card-title">
                        <div className="bar-title">
                            <Link to = {`/bars/${bar._id}`}><p>{bar.name}</p></Link>
                            <p>{bar.address.neighbourhood}</p>
                        </div>
                        <div className="card-rating">
                            <p>Rating: {bar.averageRating.toFixed(1)}</p>
                        </div>
                        
                        <button onClick = {() => {this.addtoFavourite(bar._id)}}>Add to Favorite</button>
                    </div>
                </div>
                )               
            })
            }        
        </div>
        </div>
      );
    }
  };

export default FilterItems;