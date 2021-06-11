/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import persimg from "../images/personalbg.png";
import { Auth } from "aws-amplify";
import { showError } from '../App';
const divStyle = {
    backgroundSize: "cover",
    backgroundRepeat: 'no-repeat',
    width: '100%',
    height: '100%',
    opacity: 1,
    backgroundImage: `url(${persimg})`,
};
class Login extends Component {
    constructor() {
        super();
        this.state = {

        }

    }
    componentDidMount() {
        window.scrollTo(0, 80);
    }

    handleSignIn = event => {
        event.preventDefault();
        const { username, password } = this.props.inputs;
        if (!username) {
            showError("User name Required");
            return;
        }
        if (!password) {
            showError("Password required");
            return;
        }
        this.props.setOnLoad(false);
        // You can pass an object which has the username, password and validationData which is sent to a PreAuthentication Lambda trigger
        Auth.signIn({ username, password })
            .then(user => {
                console.log("1", user);
                this.props.setUser(user);
            })
            .then(() => {
                this.props.switchComponent("MainGrid");
                this.props.setOnLoad(true);
                this.props.clearInputs();
            })
            .catch(err => {
                if (err.code == "UserNotConfirmedException") {
                    this.props.switchComponent("Verify")
                } else {
                    if (err && err.message) {
                        showError(err.message);
                    }
                }
                this.props.setOnLoad(true);
                console.log("2", err);
            }
            );
    };
    render() {
        const { username, password } = this.props.inputs;
        return (
            <section>
                    <div className="personalbg">
                        <div className="centerdiv">
                            <div>
                                <div><h3>Great to have you back here!</h3></div>
                                <fieldset>
                                    <div className="new-line"><input onChange={(event) => this.props.handleFormInput(event)} name="username" value={username} className="input mb_25" autoComplete="off" type="email" placeholder="Email"></input></div>
                                </fieldset>
                                <fieldset>
                                    <div><input onChange={(event) => this.props.handleFormInput(event)} name="password" value={password} className="input mb_25" autoComplete="off" type="password" placeholder="Password"></input></div>
                                </fieldset>
                                <div >
                                    <button onClick={this.handleSignIn} className="frmbtn">Sign In</button>
                                </div>
                            </div>
                        </div>
                    </div>

            </section >
        );
    }
}
export default Login;