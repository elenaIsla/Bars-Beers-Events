import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";
import FileUpload from "../components/FileUpload";

class CreateBeer extends Component {
    state = {
        name: "", 
        description: "", 
        beerlogoImage: "",      
    };

    handleFormSubmit = event => {
    event.preventDefault();
    const { name, description, beerlogoImage} = this.state;
    appService.createBeer({ name, description, beerlogoImage })
        .then(data => {
            this.props.history.push('/Home');
        })
        .catch(error => {
            console.log('tu beer no se ha creado', error);
        })
        ;
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    setImage = (url) => {
        this.setState({
            beerlogoImage: url
        })
    }

    render() {
        const { name, description } = this.state;
        return (
        <div className="padding">
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

                <FileUpload onUploadUrl={this.setImage}/>
            
                <input type="submit" value="Create Beer" />    
            </form>
        </div>
        )
    }
}

export default withAuth(CreateBeer);