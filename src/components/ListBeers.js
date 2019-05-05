import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";

class ListBeers extends Component { 
    state = {
        beerlist: [],
        error: null,
        isLoaded: false,
    }
    componentDidMount() {
        appService
          .listBeers()
            .then(beerlist => {
                this.setState({
                beerlist,
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
    
    // handleDeleteBeer = (id, index) => {
        
    //     appService
    //       .deleteBeer(id)
    //         .then(data => {
                
    //         })
    //         .catch(error => {
    //             console.log('no se ha borrado', error);
    //         });
    //   }

    render() {
        const {beerlist} = this.state
    return (
        <div>
            {beerlist.map((beer, index) =>{
                return (
                    <div key={index}>
                        <Link to = {`/beers/${beer._id}`}>
                            {beer.name}
                        </Link>
                        {/* <button onClick={() => this.handleDeleteBeer(beer._id, index)}>Delete Beer</button> */}
                    </div>
                )               
            })
            }        
        </div>
    );
    }
}

export default withAuth(ListBeers);
