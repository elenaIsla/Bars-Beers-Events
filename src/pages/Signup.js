import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
class Signup extends Component {
  state = {
    username: "",
    password: "",
    city: "", 
    neighbourhood: "", 
    beerType: null,
    beerTypeIsgoing: true,
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, city, neighbourhood, beerType } = this.state;
    this.props.signup({ username, password, city, neighbourhood, beerType });
  };

  handleChange = event => {
    console.log(event.target)
    const { name, value } = event.target;
    console.log('CHEEEEECCK: ', name, value, this.state);
    this.setState({ [name]: value });
  };
  
  render() {
    console.log('render')
    const { username, password, city, neighbourhood, beerType } = this.state;
    return (
      <div>

        <form onSubmit={this.handleFormSubmit}>

          <label>Username:</label>
          <input 
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            placeholder="Your username"
          />

          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            value={password}
            onChange={this.handleChange}
            placeholder="********"
          />

          <label>City:</label>
          <div className="styled-select blue semi-square">
          <select 
            name="city" 
            id="city"
            value={city}
            onChange={this.handleChange}>
              <option value="Barcelona">Barcelona</option>
              <option value="Madrid">Madrid</option>
              <option value="Valencia">Valencia</option>
              <option value="Almería">Almería</option>
              <option value="Granada">Granada</option>
              <option value="Bilbao">Bilbao</option>
          </select>
          </div>
          <label>Neighbourhood:</label>
          <div className="styled-select blue semi-square">
          <select 
            name="neighbourhood" 
            id="neighbourhood"
            value={neighbourhood}
            onChange={this.handleChange}>
              <option value="Poble Nou">Poble Nou</option>
              <option value="Poble Sec">Poble Sec</option>
              <option value="Sarria">Sarria</option>
              <option value="Raval">Raval</option>
              <option value="Borne">Borne</option>
              <option value="La Barceloneta">La Barceloneta</option>
          </select>
          </div>
          <h3>Choose your favourite Beer Type</h3>
          <div className="radio-input">
          <label htmlFor= "draft" className="radio-btn">Draft</label>
          <input 
            type="radio" 
            id="draft" 
            value='Draft' 
            name= 'beerType'
            checked={this.state.beerType === 'Draft'}
            onChange={this.handleChange}
          />
          <label htmlFor= "draft" className="radio-btn">Bottle</label>
          <input 
            type="radio" 
            id="bottle" 
            value='Bottle' 
            name='beerType'
            checked={this.state.beerType === 'Bottle'}
            onChange={this.handleChange}
          />  
          </div>

          <h3>Choose your favorite beers</h3>
          <div className="radio-input">
              {/* <% beers.forEach((beer) => { %> 
                  <input type="checkbox" id="" value="<%= beer._id %>" name="favouriteBeers">
                  <label className="radio-btn" for="favouriteBeers"><%= beer.name %></label>
              <% }) %>     */}
            </div>

          {/* <label >Upload a picture of you</label><br>
          <input type="file" name="image"> */}
          
          <input type="submit" value="Create account" />
   
        </form>

        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p> 

      </div>
    );
  }
}

export default withAuth(Signup);
