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
            <div>
                Ups! There is no bar in your neighbourhood yet.
                Do you want to create the first one?
                <Link to = '/createBar'>Create Bar</Link>
            </div>
        ):(
            <div>
            {listTop10.map((bar, index) =>{
                return index <= 9 &&  (
                <div key={index}>
                    <Link to = {`/bars/${bar._id}`}>
                        {bar.name}
                    </Link>
                    Rating: {bar.averageRating.toFixed(1)}
                </div>
                )               
            })
            }        
            </div>
        )
    }

    
    render() {
        
    return this.getTop10Rating();
        
    }
}

export default withAuth(ListBarsTop10);
