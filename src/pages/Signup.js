import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
class Signup extends Component {
  state = {
    username: "",
    password: "",
    city: "", 
    neighbourhood: "", 
    beerType: "",
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, city, neighbourhood, beerType } = this.state;
    this.props.signup({ username, password, city, neighbourhood, beerType });
  };

  handleChange = event => {
    console.log(event.target)
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
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
          <div class="styled-select blue semi-square">
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
          <div class="styled-select blue semi-square">
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
          <div class="radio-input">
          <label class="radio-btn">Draft</label>
          <input 
            type="radio" 
            id="draft" 
            value="draft" 
            name={beerType}
            onChange={this.handleChange}
          />
          <label class="radio-btn">Bottle</label>
          <input 
            type="radio" 
            id="bottle" 
            value="bottle" 
            name={beerType}
            onChange={this.handleChange}
          />  
          </div>

          <h3>Choose your favorite beers</h3>
          <div class="radio-input">
              {/* <% beers.forEach((beer) => { %> 
                  <input type="checkbox" id="" value="<%= beer._id %>" name="favouriteBeers">
                  <label class="radio-btn" for="favouriteBeers"><%= beer.name %></label>
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

        {/* <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
          />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />
          <input type="submit" value="Signup" />
        </form>
        <p>
          Already have account?
          <Link to={"/login"}> Login</Link>
        </p> */}
      </div>
    );
  }
}

export default withAuth(Signup);
