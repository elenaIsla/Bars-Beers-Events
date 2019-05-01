import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";

class UpdateBar extends Component {
    state = {
        barType: this.props.barType,
        name: "",
        categoryType: "",
        street: "",
        neighbourhood: "",
        city: ""   
    };

    handleFormSubmit = event => {
    event.preventDefault();
    const { barType, name, categoryType, street, neighbourhood, city} = this.state;
    appService.createBar({ barType, name, categoryType, street, neighbourhood, city })
        .then(data => {
            console.log('ok');
            this.props.history.push('/Home');
        })
        .catch(error => {
            console.log('tu bar no se ha creado', error);
        });
    };

    handleChange = event => {
    console.log(event.target)
    const { name, value } = event.target;
    console.log(value);
    this.setState({ [name]: value });
    };

    render() {
        const { barType, name, street, neighbourhood, city } = this.state;
        return (
        <div>
            
            <form onSubmit={this.handleFormSubmit}>
            <label>Type of bar:</label>
            <select 
                name="barType" 
                id="barType"
                value = {barType}
                onChange={this.handleChange}>
                <option value="Bar">Bar</option>
                <option value="Restaurante">Restaurante</option>
                <option value="Taberna">Taberna</option>
                <option value="Bodega">Bodega</option>
                <option value="Casa">Casa</option>
                <option value="Cockteleria">Cockteleria</option>
                <option value="Cafeteria">Cafeteria</option>
            </select><br/>

            <label>Bar name</label><br/>
            <input 
                type="text" 
                name="name"
                value = {name}
                onChange={this.handleChange} 
                placeholder="Bar name" 
            /><br/>       
            
            <label>Select Category</label><br/>
            <div className="checkbox">
            <label>Cutre</label>
            <input 
                type="radio" 
                value="Cutre" 
                name="categoryType"
                checked={this.state.categoryType === 'Cutre'}
                onChange={this.handleChange}/>
            <label>Moderno</label>
            <input 
                type="radio" 
                value="Moderno" 
                name="categoryType"
                checked={this.state.categoryType === 'Moderno'}
                onChange={this.handleChange}/>
        
            
            <h3>Address</h3>
            <label>Street:</label>
            <input 
                type="text" 
                name="street"
                value = {street} 
                placeholder="C/..."
                onChange={this.handleChange}
            />
            <label>City:</label>
            <select 
                name="city" 
                id="city"
                value = {city}
                onChange={this.handleChange}>
                <option value="Barcelona">Barcelona</option>
                <option value="Almeria">Almería</option>
                <option value="Madrid">Madrid</option>
            </select>
            <label>Neighbourhood:</label>
            <select 
                name="neighbourhood" 
                id="neighbourhood"
                value = {neighbourhood}
                onChange={this.handleChange}>
                <option value="Poble Nou">Poble Nou</option>
                <option value="Poble Sec">Poble Sec</option>
                <option value="Raval">Raval</option>
                <option value="Borne">Borne</option>
                <option value="Gótico">Gótico</option>
                <option value="Sarria">Sarria</option> 
            </select>

            </div>

            {/* <h3>Draft Beers</h3>
            <div className="bar">
            <% beers.forEach((beer) => { %>
                <div className="flex location">
                    <div className="checkbox">
                        <input type="checkbox" name="BeersDraft" value="<%= beer._id %>">
                    </div>
                    <div className="img-beer">
                        <img className="img-size" src="<%= beer.beerlogoImage %>" alt="">
                    </div>    
                </div>
            <% }) %>
            </div>

            <h3>Bottle Beers</h3>
            <div className="bar">
                <% beers.forEach((beer) => { %>
                    
                    <div className="flex location">
                        <div className="checkbox">
                            <input type="checkbox" name="BeersBottle" value="<%= beer._id %>">
                        </div>
                        <div className="img-beer">
                            <img className="img-size" src="<%= beer.beerlogoImage %>" alt="">
                        </div>
                    </div>
                
                <% }) %>
            </div> */}
            
            <input type="submit" value="Create BAR" /> 
        
            </form>
        </div>
    );
  }
}

export default withAuth(UpdateBar);