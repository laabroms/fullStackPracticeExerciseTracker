import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            username: '',
            error: null,
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const newUser = {
            username: this.state.username,
        };
        this.setState({ error: null })
        axios.post('http://localhost:5000/users/add', newUser)
        .then(res => {
            console.log(res.data); 
            this.setState({ error: false })
        })
        .catch(err=> {
            console.log(err); 
            this.setState({ error: true })
        })
        
        this.setState({
            username: ''
        })
    }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        {this.state.error === false ? 
        <Alert variant='success'>
            Your username was successfully saved.
        </Alert>
        : null}
        {this.state.error === true ? 
        <Alert variant='danger'>
            There was an error saving your username. Please try another.
        </Alert>
        : null}
        <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}
                />
            </div>
            <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
            </div>
        </form>
      </div>
    )
  }
}