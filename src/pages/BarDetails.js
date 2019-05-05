import React, { Component } from 'react';
import appService from "../lib/AppService";
import { Link } from "react-router-dom";

class BarDetails extends Component {

  state = {
    barType: "",
    name: "",
    categoryType: "",
    street: "",
    neighbourhood: "",
    city: "",
    _id: "",
    draftBeer: [],
    bottleBeer:[],
    price: "",
    beerlist: [],
    error: null,
    isLoaded: false,
  } 
  
  componentDidMount() {
    appService
      .getSingleBar(this.props.match.params)
      .then(bar => {
        this.setState({
          barType: bar.barType,
          name: bar.name,
          categoryType: bar.category.categoryType,
          street: bar.address.street,
          neighbourhood: bar.address.neighbourhood,
          city: bar.address.city,
          _id: bar._id,
          draftBeer: bar.draftBeer,
          bottleBeer:bar.bottleBeer,
          price: bar.price,
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
    const { _id, barType, name, street, neighbourhood, city, price, draftBeer, bottleBeer } = this.state; 
    return (
      <div>
      <h2>{name}</h2>
      <p>{neighbourhood}, {city}</p>
      {street}
      {price}
      <h2>Draft beers</h2>
        {draftBeer.map((beer, index) =>{
          return (
            <div key = {index}>
              {beer.name}          
            </div>  
            
            )})}
      <h2>Bottle beers</h2>
        {bottleBeer.map((beer, index) =>{
          return (
            <div key = {index}>
              {beer.name}          
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