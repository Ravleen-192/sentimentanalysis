/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Col, Container, Form } from 'reactstrap';
import { Auth } from "aws-amplify";
import { showError } from '../App';

var validator = require("email-validator");

class Reg extends Component {
  constructor() {
    super();
    this.state = {
      isNextPage: false, isLastPage: false
    }
  }
  componentDidMount() {
    window.scrollTo(0, 80);
  }
  handleSignUp() {
    const { username, email, password } = this.props.inputs;
    this.props.setOnLoad(false);
    Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
      },
      validationData: [] //optional
    })
      .then(data => console.log(data))
      .then(() => {
        this.props.switchComponent("Verify");
        this.props.setOnLoad(true);
        this.props.clearInputs();
      }) // switches Sign Up to Verification
      .catch(err => {
        console.log(err);
        this.props.setOnLoad(true);
        switch (err.code) {
          case "UsernameExistsException":
          case "InvalidParameterException":
            this.setState({ isNextPage: false, isLastPage: false });
            break;
          default:
            break;
        }
        if (err && err.message) {
          showError(err.message);
        }
      })
  };

  setOnClickSignUp() {
    const { username, email, password } = this.props.inputs;
    if (!username) {
      showError("User Name Required");
      return
    }
    if (!email) {
      showError("Email Required");
      return;
    }
    if (!validator.validate(email)) {
      showError("Please enter valid email");
      return;
    }
    if (username !== email) {
      showError("Username should be an email");
      return
    }
    if (!password) {
      showError("Password Required");
      return;
    }
    if (password.length < 6) {
      showError("Password must have length greater than or equal to 6");
      return;
    }
    this.setState({ isNextPage: false });
    showError(null);
    window.scrollTo(0, 0);
    this.handleSignUp();
  }

  render() {
    const { username, email, password} = this.props.inputs;
    return (
      <section>
        <div className="personalbg">
          <div className="centerdiv">
            <div >
              <h2>Join Us, Know Us and Let Others Know About US!</h2>
            </div>
            <fieldset>
              <div className="new-line" >
                <input onChange={(event) => this.props.handleFormInput(event)} value={username} className="from-control input mb_25" name="username" autoComplete="off" type="text" placeholder="Email as username"></input>
              </div>
            </fieldset>
            <fieldset>
              <div >
                <input onChange={(event) => this.props.handleFormInput(event)} value={email} className="from-control input mb_25" name="email" autoComplete="off" type="email" placeholder="Email"></input>
              </div>
              </fieldset>
              <fieldset>
                <div>
                  <input onChange={(event) => this.props.handleFormInput(event)} value={password} className="from-control input mb_25" name="password" autoComplete="off" type="password" placeholder="Password"></input>
                </div>
              </fieldset>
              <div>
                <button className="frmbtn signup" onClick={() => this.setOnClickSignUp()}>Sign Up</button>
              </div>
        </div>
      </div>
    </section>
    );
  }
}
export default Reg;