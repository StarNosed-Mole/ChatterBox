import React, { useState } from 'react';

const url = 'ws://localhost:4040';

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            message: '',
            messages: [],
        };
        this.handleChange = this.handleChange.bind(this);
    }

    // connect to a new Websocket
    connection = new WebSocket(url);

    // when component mounts
    componentDidMount() {
        this.connection.onopen = (event) => {
            console.log('WebSocket is open now.');
        };

        this.connection.onclose = (event) => {
            console.log('WebSocket is closed now.');
            this.setState(prev => {
                return {
                    ...prev,
                    ws: new WebSocket(url),
                }
            })
        };

        this.connection.onerror = (event) => {
            console.log('WebSocket has had an error: ', event);
        };

        this.connection.onmessage = (event) => {
        // when message is received from server
        // append to dom
            this.setState((prevState) => {
                return {
                    ...prevState, 
                    messages: [...prevState.messages, event.data],
                }
            });
        }
    }


    // on change of input box, save message to state
    handleChange(event) {
        this.setState(prevState => {
            return {
                ...prevState,
                message: event.target.value,
            }
        })
    }

    render() {
        return (
            <div>
                <div className='chatroom'>
                    { this.state.messages.map(message => (
                    <>
                        <p>{message}</p>
                        <hr />
                    </>
                    ))}
                </div>
                <hr />
                <form>
                    <input 
                        type='text'
                        className='message'
                        placeholder='message'
                        onChange={this.handleChange}
                        />
                    <button
                        type='button'
                        onClick={(e) => {
                            e.preventDefault();
                            this.connection.send(this.state.message);
                            const textbox = document.querySelector('.message');
                            textbox.value = '';
                        }}
                        >
                        Send
                    </button>
                </form>
            </div>
        )
    }
}

export default Main;