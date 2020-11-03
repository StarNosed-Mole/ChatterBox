import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      errorMessage: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick() {
    const { username, password } = this.state;
    const { push } = useHistory();
    // fetch user info by sending username and password
    fetch('/api/login', {
      method: 'GET',
      'Content-Type': 'multipart/form-data',
      data: {
        username, 
        password,
      },
    }).then((data) => {
      const { isLoggedIn } = data;
      // if user is logged in
      // redirect to main page
      if (isLoggedIn) return push('/main');
      // else
      // set error message to 'Wrong username or password!'
      this.setState((prevState) => {
        return {
          ...prevState,
          errorMessage: 'Wrong username or password!',
        }
      });
      // redirect to login page
      return push('/login');
    }).catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        <p>{this.state.errorMessage}</p>
        <h3>Login</h3>
        <form style={{display: 'flex', flexDirection: 'column'}}>
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
          <button
            type="button"
            onClick={this.handleClick}
          >
            Log In
          </button>
        </form>
        <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
      </>
    );
  }
}

export default Login;
