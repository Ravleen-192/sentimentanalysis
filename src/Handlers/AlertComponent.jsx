import React from 'react';
import { Alert, Col } from 'reactstrap';
import GLOBALS from './Globals';
export default class AlertComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          type : this.props.type,
          message : this.props.message
        };
        this.onDismiss = this.onDismiss.bind(this);
    }

    onDismiss() {
        var hidden ={"hasError":false}
        this.props.onHidden(hidden);
    }
    UNSAFE_componentWillReceiveProps(newProps) {
        if(newProps != null){
            this.setState({ type: newProps.type, message: newProps.message});
        }
    }
    render() {
        var ColStyle = { margin: '0px' };
        const { type, message } = this.state;
        return (
            <Col>
            <Col className="" style={ColStyle}>
                {type === GLOBALS.SUCCESS && <Col  className="alert alert-success alert-white rounded alert-position">
                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close" onClick={this.onDismiss}>×</button>
                    <Col className="icon">
                        
                    </Col>
                    <strong></strong> 
                    {message}
                </Col>}
                {type ===GLOBALS.INFO &&<Col className="alert alert-info alert-white rounded alert-position">
                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close" onClick={this.onDismiss}>×</button>
                    <Col className="icon">
                        
                    </Col>
                    <strong></strong> 
                    {message}
                </Col>}  
                {type === GLOBALS.WARNING && <Col  className="alert alert-warning alert-white rounded alert-position">
                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close" onClick={this.onDismiss}>×</button>
                    <Col className="icon">
                       
                    </Col>
                    <strong></strong> 
                    {message}
                </Col>}     
                {type === GLOBALS.DANGER &&<Col className="alert alert-danger alert-white rounded alert-position">
                    <button type="button" data-dismiss="alert" aria-hidden="true" class="close" onClick={this.onDismiss}>×</button>
                    <Col className="icon">
                       
                    </Col>
                    <strong></strong> 
                    {message}
                </Col>}    
            </Col>
            </Col>
        );
    }
}
