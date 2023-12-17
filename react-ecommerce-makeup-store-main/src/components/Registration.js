import React, { Component } from 'react';
import "../styles/Reg.css"

class Registration extends Component {
  constructor() {
    super();
    this.state = {
      // State untuk data registrasi (misalnya, email, username, password)
      email: '',
      username: '',
      password: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleRegistration = () => {
    // Lakukan validasi atau permintaan registrasi di sini
    console.log('Registration clicked');
    console.log('Username:', this.state.username);
    console.log('Email:', this.state.email);
    console.log('Password:', this.state.password);
  };

  render() {
    return (
      <section id="Registration" className="registration--section">
        <div className="registration-container">
          <h1>Registration</h1>
          <div className="input-container">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Choose a username"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              placeholder="Enter your email"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Create a password"
              onChange={this.handleInputChange}
            />
          </div>
          <a href="/login"><button onClick={this.handleRegistration}>Register</button></a>
          <a href="/login">Already have an account? Login</a>
        </div>
      </section>
    );
  }
}

export default Registration;