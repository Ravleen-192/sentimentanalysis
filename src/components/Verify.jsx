/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Col} from 'reactstrap';
import { Auth } from "aws-amplify";
import { showError } from '../App';

class Verify extends Component {
    constructor() {
        super();
        this.state = {}
       
    }
    componentDidMount(){
        window.scrollTo(0,0);
    }
    
    handleVerification = event => {
        event.preventDefault();
        const { username, code } = this.props.inputs;
        if(!code){
            showError("Verification Code Required");
            return;
        }
        this.props.setOnLoad(false);
        // After retrieveing the confirmation code from the user
        Auth.confirmSignUp(username, code, {
            // Optional. Force user confirmation irrespective of existing alias. By default set to True.
            forceAliasCreation: true
        })
        .then(data => console.log(data))
        .then(()=>{this.props.switchComponent("SignIn");
            this.props.clearInputs();
            this.props.setOnLoad(true);})
        .catch(err => {if(err&&err.message){
            showError(err.message);}this.props.setOnLoad(true);});
    };
    render() {
        const { code} = this.props.inputs;
        return (
            <section>
            <div className="personalbg">
                <div className="personalfrm">
                    <Col md={12} lg={12} xl={12} sm={12}>
                    <Col md={6} lg={6} xl={6} sm={12}>
                        <div className="txt-reg">
                        <h2>Email is not verifed.</h2>
                        </div>
                    </Col>
                    <Col md={6} lg={6} xl={6} sm={12}>
                        <div className="input-reg">
                            <input onChange={(event)=>this.props.handleFormInput(event)} name="code" value={code} className="from-control input mb_25" autoComplete="off" type="text" placeholder="Verification Code"></input>
                            <Col md={12} lg={12} xl={12} sm={12}>
                                <button style={{float:'right'}}onClick={this.handleVerification} className="frmbtn signup">Submit</button>
                            </Col>
                        </div>
                    </Col>
                    </Col>
                </div>
            </div>
        </section>
        );
    }
}
export default Verify;