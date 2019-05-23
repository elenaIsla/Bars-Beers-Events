import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
import appService from "../lib/AppService";

class UpdateUser extends Component {
  state = {
    _id: "",
    username: "",
    city: "", 
    neighbourhood: "", 
    beerType: null,
    beerTypeIsgoing: true,
    favouriteBeers: [],
    // userimage: null,
    listBeers: [],
  };

  componentDidMount() {
    this.getUser();
    this.getlistBeer();
  }

  getUser = () => {
    appService
      .getSingleUser(this.props.match.params)
        .then(user => {
            this.setState({
                _id: user._id,
                username: user.username,
                city: user.name, 
                neighbourhood: user.neighbourhood, 
                beerType: user.beerType,
                favouriteBeers: user.favouriteBeers,
                // userimage: null,
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
    const {_id, username, city, neighbourhood, beerType, favouriteBeers } = this.state;
    appService
        .updateUser( {_id, username, city, neighbourhood, beerType, favouriteBeers} )
            .then(data => {
                this.props.history.push('/Home');
            })
            .catch(error => {
                console.log('tu bar no se ha creado', error);
            });
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
  
  render() {
    const { username, city, neighbourhood, beerType, favouriteBeers } = this.state;
    const {listBeers} = this.state;
    return (
      <div className="padding">
        <form onSubmit={this.handleFormSubmit}>

          <label>USERNAME:</label>
          <input 
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
            placeholder="Your username"
          />

          <label>CITY:</label>
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
          <label>NEIGHBOURHOOD:</label>
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
          <p>CHOOSE YOUR FAVOURITE BEER TYPE</p>
          <hr></hr>
          <div className="radio-input">
          <label className="radio-btn">Draft</label>
          <input 
            type="radio" 
            id="draft" 
            value='Draft' 
            name= 'beerType'
            checked={beerType === 'Draft'}
            onChange={this.handleChange}
          />
          <label className="radio-btn">Bottle</label>
          <input 
            type="radio" 
            id="bottle" 
            value='Bottle' 
            name='beerType'
            checked={beerType === 'Bottle'}
            onChange={this.handleChange}
          />  
          </div>
          <p>FAVOURITE BEER:</p>
          <hr></hr>
            {favouriteBeers && favouriteBeers.map((beer, index) => {
                return (
                    <div key = {index}>
                       <p>{beer.name}</p> 
                    </div>
                )
            })}   
          <p className="color-grey">CHANGE YOUR FAVOURITE BEER:</p>
            {listBeers && listBeers.map((beer, index) => {
                return (
                    <div className="beer-radio" key = {index}>
                        <div className="center"><input 
                            type="checkbox" 
                            name = { favouriteBeers }
                            value= { beer._id }
                            onChange={this.handleCheckFavoriteBeer}
                        />
                        </div> 
                            <div>
                              <img width="100" src= { beer.beerlogoImage } alt = {beer.name} />
                            </div>
                        </div>
                    )        
            })}          
          <input className="review-button margin" type="submit" value="UpDate Profile" />   
        </form>
      </div>
    );
  }
}

export default withAuth(UpdateUser);
