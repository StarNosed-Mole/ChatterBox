import React, { useState } from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, key) {
    // on change of input box,
    // change the state of the passed in key
    // and return the new state with the
    // event.target.value (input box text)
    this.setState((prevState) => ({
      ...prevState,
      [key]: event.target.value,
    }));
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="username"
          onChange={(event) => this.handleChange(event, 'username')}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(event) => this.handleChange(event, 'password')}
        />
      </form>
    );
  }
}

export default Login;
