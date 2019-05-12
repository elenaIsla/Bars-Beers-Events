import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    city: "", 
    neighbourhood: "", 
    beerType: null,
    beerTypeIsgoing: true,
    favouriteBeers: [],
    // userimage: null,
    listBeers: [],
  };

  componentDidMount() {
    this.getlistBeer();
  }

  getlistBeer = () => {
    appService
      .listBeers()
          .then(listBeers => {
              this.setState({
              listBeers,
              isLoaded: true,
              });
            console.log(listBeers);
          })
          .catch((error) => {
              this.setState({  
                  isLoaded: true,
                  error
              });
          }); 
  }
  

  handleFormSubmit = event => {
    event.preventDefault();
    const { username, password, city, neighbourhood, beerType, favouriteBeers } = this.state;
    this.props.signup({ username, password, city, neighbourhood, beerType, favouriteBeers });
  };

  handleChange = event => {
    console.log(event.target)
    const { name, value } = event.target;
    console.log('CHEEEEECCK: ', name, value, this.state);
    this.setState({ [name]: value });
  };

  handleCheckFavoriteBeer = event => {
    const {value} = event.target;
    const {favouriteBeers} = this.state;
    console.log(value);
    this.setState({
        favouriteBeers: [...favouriteBeers, value]
    })
    console.log(favouriteBeers);
}
  
  render() {
    console.log('render')
    const { username, password, city, neighbourhood, listBeers, userimage, favouriteBeers } = this.state;
    return (
      <div>
        <img src={process.env.PUBLIC_URL + "images/logo.jpg"} alt="logo"/>
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
          <label className="radio-btn">Draft</label>
          <input 
            type="radio" 
            id="draft" 
            value='Draft' 
            name= 'beerType'
            checked={this.state.beerType === 'Draft'}
            onChange={this.handleChange}
          />
          <label className="radio-btn">Bottle</label>
          <input 
            type="radio" 
            id="bottle" 
            value='Bottle' 
            name='beerType'
            checked={this.state.beerType === 'Bottle'}
            onChange={this.handleChange}
          />  
          </div>
          <h3>Choose your favorite Beer</h3>
               {listBeers.map((beer, index) => {
                    return (
                        <div key = {index}>
                            <input 
                               type="checkbox" 
                                name = {favouriteBeers}
                                value= { beer._id }
                                onChange={this.handleCheckFavoriteBeer}
                           />
                             <img className="img-size" src= { beer.beerlogoImage } alt = {beer.name} />
                         </div>
                     )        
                })} 
          
          <input type="submit" value="Create account" />
   
        </form>

        <div><p>Already have account?</p> 
          <Link to={"/login"}> <button>Login</button></Link>
          </div>

      </div>
    );
  }
}

export default withAuth(Signup);
