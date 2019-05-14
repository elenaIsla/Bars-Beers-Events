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
        this.getlistUsers();
    }

    getlistUsers = () =>{
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

    handleDeleteUser = (id) => {
        appService
          .deleteUser (id)
            .then(data => {
                this.getlistUsers();
            })
            .catch(error => {
                console.log('no se ha borrado', error);
            });
    }

    render() {
        const {userlist} = this.state
        const userLogged = this.props.user.username
    return (
        <div>
            {userlist.map((user, index) =>{
                return (
                    <div key={index}>
                        <Link to = {`/users/${user._id}`}>
                            {user.username}
                        </Link>
                        {userLogged === 'admin' && (
                            <>
                                <button onClick={() => this.handleDeleteUser(user._id)}>Delete User</button>
                            </>
                        )} 
                    </div>
                )               
            })
            }        
        </div>
    );
    }
}

export default withAuth(ListUsers);
