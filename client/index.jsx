import React, { useState } from 'react';
import { render } from 'react-dom';
import './styles/index.css';

const App = () => {
  const connection = new WebSocket('ws://localhost:4040');
  const [data, setData] = useState('');
  connection.onopen = (event) => {
    console.log('WebSocket is open now.');
  };
  connection.onclose = (event) => {
    console.log('WebSocket is closed now.');
  };
  connection.onerror = (event) => {
    console.log('WebSocket has had an error: ', event);
  };
  connection.onmessage = (event) => {
    // when message is received from server
    // append to dom
    setData((prevData) => {
      let newData = prevData;
      newData += event.data;
      return newData;
    });
  };
  return (
    <>
      <p id="chat">Data: { data }</p>
      <form>
        <input type="text" />
        <button type="submit" onClick={connection.send()}>Submit</button>
      </form>
    </>
  );
};

render(<App />, document.getElementById('root'));
