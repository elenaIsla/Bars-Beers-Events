import React, { Component } from 'react';
import appService from "../lib/AppService";
import { Link } from "react-router-dom";

class BarDetails extends Component {

  state = {
    bar: {},
    error: null,
    isLoaded: false,
  } 
  
  componentDidMount() {
    appService
      .getSingleBar(this.props.match.params)
      .then(bar => {
        console.log(bar);
        this.setState({
          bar,
          isLoaded: true,
        });
        console.log(bar.draftBeer);
      })
      .catch((error) => {
        this.setState({  
            isLoaded: true,
            error
        });
      }); 

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

  handleDeleteBar = () => {
    const {params} = this.props.match;
    appService
      .deleteBar(params)
      .then(data => {
        console.log('ok');
        this.props.history.push('/home');
      })
      .catch(error => {
        console.log('no se ha borrado', error);
      }); 
  }

  render(){
    console.log(this.state.bar);
    const { _id, barType, name, street, neighbourhood, city, price, draftBeer, bottleBeer } = this.state.bar; 
    
    return this.state.bar && (
      <div>
      <h2>{name}</h2>
      <p>{neighbourhood}, {city}</p>
      {street}
      {price}
      <h3>Draft beers</h3>
        {draftBeer && draftBeer.map((beer, index) =>{
          return !beer ? (
            <div>
            So saaad!! Noone has registered any draft beer in this bar.
          </div>
            
            ):(
              <div key = {index}>
              {beer.name}          
            </div>
              
            )})}
      <h3>Bottle beers</h3>
        {bottleBeer && bottleBeer.map((beer, index) =>{
          return beer ? (
            <div key = {index}>
              {beer.name}          
            </div>  
            ):(
              <div>
                So saaad!! Noone has registered any bottle beer in this bar.
              </div>
            )})}
      <br/>
      <Link to = {`/bars/${_id}/addReview`}> Add a review</Link>
      <button onClick={this.handleDeleteBar}>Delete Bar</button><br/>
      <Link to = {`/bars/${_id}/updateBar`}> Edit Bar </Link>
      
      </div>
    )}
}

export default BarDetails;