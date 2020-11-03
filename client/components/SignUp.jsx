import React from 'react';
import { useHistory } from 'react-router-dom';

class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            errorMessage: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event, key) {
        // on input box change, save username and password into state
        this.setState((prevState) => ({
            ...prevState,
            [key]: event.target.value,
        }));
    }

    handleClick() {
        const { push } = useHistory();
        const { password, username } =  this.state;
        // check if password is the same as confirmPassword
        if (this.state.password !== this.state.confirmPassword) {
            const errorMessage = 'Please enter the same password in the "Confirm Password" field';
        // if not, display error message
            this.setState((prevState) => ({
                ...prevState,
                errorMessage,
            }));
        } else {
            this.setState((prevState) => ({
                ...prevState,
                errorMessage: '',
            }));
        }  
       // send username and password to server and wait for response from server
        fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: {
                username,
                password,
            },
        })
        //if all ok from server response, redirect to main page of app
        .then(data => {
            const { isLoggedIn } = data;
            // if isLogged in is true, redirect to main page
            if (isLoggedIn) return push('/main');
            // else, redirect to login
            return push('/login');
        })
        .catch(err => console.log(err));

    }
    render() {
        return (
            <>
            <h3>Sign Up</h3>
            <form style={{display: 'flex', flexDirection: 'column'}}>
                <input 
                    type="text"
                    placeholder="username"
                    onChange={(event) => this.handleChange(event, 'username')}
                    required
                    />
                <input 
                    type="password"
                    placeholder="password"
                    onChange={(event) => this.handleChange(event, 'password')}
                    required
                    />
                <input 
                    type="password"
                    placeholder="confirm password"
                    onChange={(event) => this.handleChange(event, 'confirmPassword')}
                    required
                    />
                <button type="button" onSubmit={this.handleClick} onClick={this.handleClick}>Sign Up</button>
                <h2>{this.state.errorMessage}</h2>
            </form>
        </>
        )
    }
}

export default SignUp;
