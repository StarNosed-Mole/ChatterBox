import React from 'react';

const Input = (props) => (
  <input
    type={props.type}
    placeholder={props.placeholder}
    onChange={props.setState}
  />
);

export default Input;
