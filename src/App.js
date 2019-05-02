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

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <h1>Basic React Authentication</h1>
          <Navbar />
          <Switch>
            <AnonRoute path="/signup" component={Signup} />
            <AnonRoute path="/login" component={Login} />
            <PrivateRoute path="/home" component={Home} />
            <PrivateRoute path="/createBar" component={CreateBar} />
            <PrivateRoute path="/createBeer" component={CreateBeer} />
            <PrivateRoute path="/bars/:id/updateBar" component={UpdateBar} />
            <PrivateRoute path="/bars/:id" component={BarDetails} />
            <PrivateRoute path="/bars" component={ListBars} />
            
            
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
