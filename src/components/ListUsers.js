import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";

class ListUsers extends Component { 
    state = {
        userlist: [],
        error: null,
        isLoaded: false,
    }
    componentDidMount() {
        appService
          .listUsers()
          .then(userlist => {
            this.setState({
              userlist,
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
        const {userlist} = this.state
    return (
        <div>
            {userlist.map((user, index) =>{
                return (
                    <div key={index}>
                        <Link to = {`/users/${user._id}`}>
                            {user.username}
                        </Link>
                    </div>
                )               
            })
            }        
        </div>
    );
    }
}

export default withAuth(ListUsers);
