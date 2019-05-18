import React, { Component } from "react";
import auth from "./auth-service";
const { Consumer, Provider } = React.createContext();

export { Consumer };

export const withAuth = Comp => {
  return class WithAuth extends Component {
    render() {
      return (
        <Consumer>
          {authStore => {
            return (
              <Comp
                login={authStore.login}
                signup={authStore.signup}
                user={authStore.user}
                logout={authStore.logout}
                isLoggedin={authStore.isLoggedin}
                message={authStore.message}
                {...this.props}
              />
            );
          }}
        </Consumer>
      );
    }
  };
};

class AuthProvider extends Component {
  state = {
    isLoggedin: false,
    user: null,
    isLoading: true,
    message: ""
  };

  componentDidMount() {
    auth
      .me()
      .then(user => {
        this.setState({
          isLoggedin: true,
          user,
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({
          isLoggedin: false,
          user: null,
          isLoading: false
        });
      });
  }

  signup = user => {
    const { username, password, city, neighbourhood, beerType, favouriteBeers, userimage } = user;
    auth
      .signup({ username, password, city, neighbourhood, beerType, favouriteBeers, userimage })
      .then(user => {
        this.setState({
          isLoggedin: true,
          user
        });
      })
      .catch(({ response: { data: error } }) => {
        this.setState({
          message: error.message
        });
      });
  };

  login = user => {
    const { username, password } = user;
    auth
      .login({ username, password })
      .then(user => {
        this.setState({
          isLoggedin: true,
          user
        });
      })
      .catch(() => {});
  };

  logout = () => {
    auth
      .logout()
      .then(() => {
        this.setState({
          isLoggedin: false,
          user: null
        });
      })
      .catch(() => {});
  };
  render() {
    const { isLoading, isLoggedin, user, message } = this.state;
    return isLoading ? (
      <div>Loading</div>
    ) : (
      <Provider
        value={{
          isLoggedin,
          user,
          login: this.login,
          logout: this.logout,
          signup: this.signup,
          message,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default AuthProvider;
