import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";

class ListBars extends Component { 
    state = {
        barlist: [],
        error: null,
        isLoaded: false,
    }
    componentDidMount() {
       this.getlistBars();
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

    addtoFavourite = (idBar) => {
        const {BarID} = idBar;
        const {_id} = this.props.user;
        console.log(_id);   
        appService
            .addBartoFavourite(BarID, _id)
                .then(data => {
                    console.log('joder')
                })
                .catch((error) => {            
                })
    }
    
    render() {
        console.log(this.props.user.favouriteBars)
        console.log (this.props.user);
        const {barlist} = this.state
    return (
        <div>
            {barlist.map((bar, index) =>{
                return (
                <div key={index}>
                    <Link to = {`/bars/${bar._id}`}>
                        {bar.name}
                    </Link>
                    <button onClick = {() => {this.addtoFavourite(bar._id)}}>Add to Favorite</button>
                </div>
                )               
            })
            }        
        </div>
    );
    }
}

export default withAuth(ListBars);
