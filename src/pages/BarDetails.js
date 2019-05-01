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
        this.setState({
          bar,
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
      const {bar} = this.state;
      
    return (
      <div>
      {bar.name}
      <button onClick={this.handleDeleteBar}>Delete project</button>
      <Link to = {`/bars/${bar._id}/updateBar`}> Edit Bar </Link>
      <Link to = {`/home`}>Back to home page</Link>
      </div>
    )}
}

export default BarDetails;