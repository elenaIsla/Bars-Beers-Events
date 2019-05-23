import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";

class ListBeers extends Component { 
    state = {
        beerlist: [],
        error: null,
        isLoaded: false,
    }
    componentDidMount() {
        this.getlistbeer();
    }

    getlistbeer = () => {
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
    
    handleDeleteBeer = (id) => {   
        appService
          .deleteBeer(id)
            .then(data => {
                this.getlistbeer();
            })
            .catch(error => {
            });
      }

    render() {
        const {beerlist} = this.state
    return (
        <div className="padding">
            {beerlist.map((beer, index) =>{
                return (
                    <div key={index}>
                       
                            <h3>{beer.name}</h3>
                      
                        <img width="200" src={beer.beerlogoImage} alt = ""/>
                        <button className="review-button"onClick={() => this.handleDeleteBeer(beer._id)}>Delete Beer</button>
                    </div>
                )               
            })
            }        
        </div>
    );
    }
}

export default withAuth(ListBeers);
