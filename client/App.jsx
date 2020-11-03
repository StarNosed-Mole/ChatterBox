import React from 'react';
import { Route, useHistory } from 'react-router-dom';
import Login from './components/Login.jsx';
import SignUp from './components/SignUp.jsx';
import Main from './components/Main.jsx';

class App extends React.Component {
  // // when the component first mounts,
  // // send a fetch request to the back end
  // // see if the current user has a cookie session
  // // if they do, redirect to main page
  // // if they don't, redirect to login 
  // componentDidMount() {
  //   const { push } = useHistory();
  //   // as soon as the page loads,
  //   // send fetch request to see if
  //   fetch('/api/isLoggedIn', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }).then((isSignedIn) => {
  //     // current user isLoggedIn
  //     // if they are, display Main.jsx
  //     if(isSignedIn) push('/main');
  //     // if not, direct them to the login page
  //     push('/login');
  //   })
  // }

  render() {
    return (
      <div >
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/login' >
          <Login />
        </Route>
        <Route path='/signup'>
          <SignUp />
        </Route>
      </div>
    )
  }
}

export default App;
