import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";

class AddReview extends Component {
    state = {
        title: "",
        comment: "", 
              
    };

    handleFormSubmit = event => {
    event.preventDefault();
    const { name, description, beerlogoImage} = this.state;
    appService.createReview({ name, description, beerlogoImage })
        .then(data => {
            console.log('ok');
            this.props.history.push('/Home');
        })
        .catch(error => {
            console.log('tu beer no se ha creado', error);
        })
        ;
    };

    handleChange = event => {
    console.log(event.target)
    const { name, value } = event.target;
    console.log(value);
    this.setState({ [name]: value });
    };

    render() {
        const { name, description, beerlogoImage } = this.state;
        return (
        <div>
            <form onSubmit={this.handleFormSubmit}>                
                <label>Beer name</label><br/>
                <input 
                    type="text" 
                    name="name"
                    value = {name}
                    onChange={this.handleChange}
                    placeholder="Beer name"/>
                <label>Description</label><br/>
                <input 
                    type="text" 
                    name="description"
                    value = {description}
                    onChange={this.handleChange}
                    placeholder="description"/>

                <label >Upload beer logo</label><br/>
                <input 
                    type='file' 
                    name='image'
                    value = {beerlogoImage}
                    onChange={this.handleChange}
                    />
            
                <input type="submit" value="Create Beer" />    
            </form>
        </div>
        )
    }
}

export default withAuth(AddReview);