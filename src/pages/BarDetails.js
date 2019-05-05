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
          isLoaded: true,
        });
        console.log(bar);
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
    const { _id, barType, name, street, neighbourhood, city } = this.state; 
    return (
      <div>
      {name}
      {city}
      <button onClick={this.handleDeleteBar}>Delete Bar</button>
      <Link to = {`/bars/${_id}/updateBar`}> Edit Bar </Link>
      <Link to = {`/home`}>Back to home page</Link>
      </div>
    )}
}

export default BarDetails;