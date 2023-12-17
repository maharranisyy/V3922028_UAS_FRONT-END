import React, { Component } from 'react';
import "../styles/Login.css"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    // Lakukan validasi atau permintaan login di sini
    console.log('Login clicked');
    console.log('Username:', this.state.username);
    console.log('Password:', this.state.password);
  };

  render() {
    return (
      <div className="login-container">
        <h1>Login</h1>
        <div className="input-container">
          <label htmlFor="username">Enter your username / email:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            placeholder="Enter your username / email"
            onChange={this.handleInputChange}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleInputChange}
          />
        </div>
        <a href="/"><button onClick={this.handleLogin}>Login</button></a>
        <a href="/reg">Don't have an account? Registration</a>
      </div>
    );
  }
}

export default Login;