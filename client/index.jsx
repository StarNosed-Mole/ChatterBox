/* eslint-disable react/button-has-type */
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from 'react-dom';
import App from './App';
import './styles/index.css';

// ! Commenting out code because we plan to later move the
// ! chat elsewhere in a different file
// const App = () => {
//   const connection = new WebSocket('ws://localhost:4040');
//   const [data, setData] = useState('');
//   const [formText, setFormText] = useState('');
//   connection.onopen = (event) => {
//     console.log('WebSocket is open now.');
//   };
//   connection.onclose = (event) => {
//     console.log('WebSocket is closed now.');
//   };
//   connection.onerror = (event) => {
//     console.log('WebSocket has had an error: ', event);
//   };
//   connection.onmessage = (event) => {
//     // when message is received from server
//     // append to dom
//     setData((prevData) => {
//       let newData = prevData;
//       newData += event.data;
//       return newData;
//     });
//   };

//   const handleClick = () => {
//     console.log('hello');
//     connection.send(formText);
//   };
//   return (
//     <>
//       <p id="chat">Data: { data }</p>
//       <input
//         type="text"
//         onChange={(e) => {
//           setFormText(e.target.value);
//           console.log(formText);
//         }}
//       />
//       <button
//         onClick={handleClick}
//       >
//         Submit
//       </button>
//     </>
//   );
// };

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'),
);
