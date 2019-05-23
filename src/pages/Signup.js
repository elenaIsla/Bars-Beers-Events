import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";
import FileUpload from "../components/FileUpload";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    city: "", 
    neighbourhood: "", 
    beerType: null,
    favouriteBeers: [],
    userimage: "",
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
    const { username, password, city, neighbourhood, beerType, favouriteBeers, userimage } = this.state;
    this.props.signup({ username, password, city, neighbourhood, beerType, favouriteBeers, userimage });
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleCheckFavoriteBeer = event => {
    const {value} = event.target;
    const {favouriteBeers} = this.state;
    this.setState({
        favouriteBeers: [...favouriteBeers, value]
    })
  }

  setImage = (url) => {
    this.setState({
      userimage: url
    })
  }
  
  render() {
    const { username, password, city, neighbourhood, listBeers, favouriteBeers } = this.state;
    const error = this.props.message;
    return (
      <div className="padding margin">

      <div className="container-login">
        <img className="logo" src={process.env.PUBLIC_URL + "images/logo.svg"} alt="logo"/>
        <form onSubmit={this.handleFormSubmit}>

          <label>USERNAME:</label>
          <input 
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            placeholder="Your username"
          />

          <label>PASSWORD</label>
          <input 
            type="password" 
            name="password" 
            value={password}
            onChange={this.handleChange}
            placeholder="********"
          />

          <label>CITY:</label>
          <div className="styled-select blue semi-square">
          <select 
            name="city" 
            id="city"
            value={city}
            onChange={this.handleChange}>
              <option></option>
              <option value="Barcelona">Barcelona</option>
              <option value="Madrid">Madrid</option>
              <option value="Valencia">Valencia</option>
              <option value="Almería">Almería</option>
              <option value="Granada">Granada</option>
              <option value="Bilbao">Bilbao</option>
          </select>
          </div>
          <label>NEIGHBOURHOOD:</label>
          <div className="styled-select blue semi-square">
          <select 
            name="neighbourhood" 
            id="neighbourhood"
            value={neighbourhood}
            onChange={this.handleChange}>
              <option></option>
              <option value="Poble Nou">Poble Nou</option>
              <option value="Poble Sec">Poble Sec</option>
              <option value="Sarria">Sarria</option>
              <option value="Raval">Raval</option>
              <option value="Borne">Borne</option>
              <option value="La Barceloneta">La Barceloneta</option>
          </select>
          </div>
          <p className="color-grey">CHOOSE YOUR FAVOURITE BEER TYPE</p>
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
          <p className="color-grey">CHOOSE YOUR FAVOURITE BEER</p>
               {listBeers.map((beer, index) => {
                    return (
                        <div className="center" key = {index}>
                            <input 
                               type="checkbox" 
                                name = { favouriteBeers }
                                value= { beer._id }
                                onChange={this.handleCheckFavoriteBeer}
                           />
                           <div>
                             <img width = "100" src= { beer.beerlogoImage } alt = {beer.name} />
                             </div>
                         </div>
                     )        
                })} 
          <FileUpload onUploadUrl={this.setImage}/>
          
          <input className="signUp-btn" type="submit" value="Create account" />
   
        </form>
        </div>
        <div><p className="color-grey">ALREADY HAVE AN ACCOUNT?</p> 
          <Link to={"/login"} className="login_link">LOGIN</Link>
          </div>
          <div>{error}</div>
      
      </div>
    );
  }
}

export default withAuth(Signup);
