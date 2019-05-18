import React, { Component } from "react";
import { Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import AnonRoute from "./components/AnonRoute";
import AuthProvider from "./lib/AuthProvider";
import CreateBar from "./pages/CreateBar";
import CreateBeer from "./pages/CreateBeer";
import ListBars from "./components/ListBars"
import BarDetails from "./pages/BarDetails";
import UpdateBar from "./pages/UpdateBar";
import ListBeers from "./components/ListBeers";
import AddReview from "./pages/AddReview";
import LandingPage from "./pages/LandingPage";
import UserDetails from "./pages/UserDetails";
import UpdateUser from "./pages/UpdateUser";
import ListFavourites from "./components/ListFavourites";
import './App.scss';

import firebase from 'firebase';

const config = {
  storageBucket: 'gs://barsandevents.appspot.com/'
}
firebase.initializeApp(config);

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div>  
          <Navbar />
          <Switch>
            <AnonRoute exact path="/" component={LandingPage} />
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} /> 
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/createBar" component={CreateBar} />
            <PrivateRoute path="/createBeer" component={CreateBeer} />
            <PrivateRoute path="/listBeers" component={ListBeers} />
            <PrivateRoute path="/bars/:id/updateBar" component={UpdateBar} />
            <PrivateRoute path="/bars/:id/addReview" component={AddReview} />
            <PrivateRoute path="/bars/:id" component={BarDetails} />
            <PrivateRoute path="/bars" component={ListBars} />
            <PrivateRoute path="/users/:id/updateUser" component={UpdateUser} />
            <PrivateRoute path="/users/:id/listFavourite" component={ListFavourites} />
            <PrivateRoute path="/users/:id" component={UserDetails} />
            
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
