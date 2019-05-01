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

    render() {
        const {barlist} = this.state
    return (
        <div>
            {barlist.map((bar, index) =>{
                return (
                <div key={index}>
                    <Link to = {`/bars/${bar._id}`}>
                        {bar.name}
                    </Link>
                </div>
                )               
            })
            }        
        </div>
    );
    }
}

export default withAuth(ListBars);
