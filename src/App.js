/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { node } from 'prop-types';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';
import { default as Home } from "./components/home";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Col } from 'reactstrap';
import SignIn from "./components/Login";
import SignUp from "./components/Reg";
import Verify from "./components/Verify";
import MainGrid from "./MainGrid";
import { Auth } from "aws-amplify";
import Amplify from 'aws-amplify'
import config from './aws-exports';
import Globals from './Handlers/Globals';
import AlertComponent from './Handlers/AlertComponent';
import userImg from './logo1.png';
Amplify.configure(config);


var mContext;
class App extends Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            child: node,
            username: "", email: "", password: "",
            phone_number: "", address: "", address2: "", st: "", zip: "", city: "",
            code: "",
            user: null, // will contain our user data object when signed in
            status: "Home", loaded: true, hasError: false, type: "", message: "",
            noti_open: false, user_open: false,
            personalLinks: [
                { href: '#Home', text: 'Home', menuId: 1, source: "PersonalHome", isActive: true },
                { href: "#Jobs", text: "Jobs", menuId: 2, source: "Jobs", isActive: false },
                { href: '#NetWorks', text: 'My Network', menuId: 3, source: "Networks", isActive: false },
            ],
            links: [
                { href: '#Home', text: 'Home', menuId: 1, source: "Home", isActive: true },
                { href: "#Login", text: "Sign In", menuId: 2, source: "SignIn", isActive: false },
                { href: '#Reg', text: 'Sign Up Free', menuId: 3, className: "register", source: "SignUp", isActive: false },
            ]
        };
        mContext = this;
        this.toggle = this.toggle.bind(this);
        this.setOnLoad = this.setOnLoad.bind(this);
        //this.onHidden = this.onHidden.bind(this);
    }
    componentWillMount() {
    }
    componentDidMount() {
        this.setOnLoad(false);
       Auth.currentAuthenticatedUser({
          bypassCache: true // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
        })
        .then(data => {
          let user = {username:data.username,...data.attributes}
          this.setUser(user);
          console.log(user);
        })
        .catch(err =>{
           this.setOnLoad(true);
            console.log(err)
          }
        );
      }
    handlesignOut = event => {
        try {
            this.setOnLoad(false);
            Auth.signOut();
            this.setState({ user: null });
            this.switchComponent("SignIn");
            this.setOnLoad(true);
        } catch (error) {
            this.setOnLoad(true);
            console.log('error signing out: ', error);
        }
    };
    handleFormInput = (event, source) => {
        if (source == "phone") {
            this.setState({ phone_number: event });
        } else {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
    };
    AuthComponent = () => {
        switch (this.state.status) {
            case "Home":
                return (<Home
                    switchComponent={this.switchComponent}
                    inputs={this.state}
                    handleFormInput={this.handleFormInput}
                    setOnLoad={this.setOnLoad}
                    clearInputs={this.clearInputs}
                />
                );
            case "SignUp":
                return (
                    <SignUp
                        switchComponent={this.switchComponent}
                        inputs={this.state}
                        handleFormInput={this.handleFormInput}
                        setOnLoad={this.setOnLoad}
                        clearInputs={this.clearInputs}
                    />
                );
            case "Verify":
                return (
                    <Verify
                        switchComponent={this.switchComponent}
                        inputs={this.state}
                        handleFormInput={this.handleFormInput}
                        setOnLoad={this.setOnLoad}
                        clearInputs={this.clearInputs}
                    />
                );

            case "SignIn":
                return (
                    <SignIn
                        switchComponent={this.switchComponent}
                        inputs={this.state}
                        handleFormInput={this.handleFormInput}
                        setOnLoad={this.setOnLoad}
                        clearInputs={this.clearInputs}
                        setUser={this.setUser}
                    />
                );
            case "MainGrid":
                return (<MainGrid
                    switchComponent={this.switchComponent}
                    inputs={this.state}
                    handleFormInput={this.handleFormInput}
                    setOnLoad={this.setOnLoad}
                    clearInputs={this.clearInputs}
                    source={this.state.status}
                />
                );
            default:
                break;
        }
    };
    switchComponent = status => {
        this.setState({ status });
        this.closeNavbar();
    };
    // onClickMenuItem(menuId){
    //   var Component = ImportComponent(menuId);
    //   this.setState({child:<Component.default 
    //     onClickMenuItem={this.onClickMenuItem}
    //   />});
    //   this.closeNavbar();
    // }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    closeNavbar() {
        if (this.state.isOpen == true) {
            this.toggle();
        }
    }
    setOnLoad(source) {
        this.setState({ loaded: source });
    }
    setUser(user) {
        mContext.setState({ user: user });
    }
    onHidden(hidden) {
        mContext.setState({ hasError: hidden.hasError });
    }
    clearInputs() {
        mContext.setState({ email: "", password: "", address: "", address2: "", st: "", city: "", phone_number: "" })
    }
    scroll(container, key, loop = false) {
        var element = document.getElementById(container);
        if (loop && this.state.mouseout) {
            return;
        }
        if (element) {
            var scroll_height = element.scrollTop;
            switch (key) {
                case "top":
                    if (scroll_height > 0) {
                        scroll_height -= 10;
                        element.scrollTop = scroll_height;
                        window.setTimeout(() => { this.scroll(container, key, true) }, 100);
                    }
                    break;
                case "bottom":
                    var scrollable_height = scroll_height + element.clientHeight;
                    if (scrollable_height < element.scrollHeight) {
                        scroll_height += 10;
                        element.scrollTop = scroll_height;
                        window.setTimeout(() => { this.scroll(container, key, true) }, 100);
                    }
                    break;

                default:
                    break;
            }
        }
    }
    toggleNavMenu(nav_item) {
        const { noti_open, user_open } = this.state;
        switch (nav_item) {
            case "noti":
                this.setState({ theam_open: false, fav_open: false, noti_open: !noti_open, other_noti_open: false, user_open: false });
                break;
            case "user":
                this.setState({ theam_open: false, fav_open: false, noti_open: false, other_noti_open: false, user_open: !user_open });
                break;
            default:
                this.setState({ noti_open: false, user_open: false });
                break;
        }
    }
    setMenuActive(source, key) {
        let { links, personalLinks } = this.state;
        switch (source) {
            case "Landing":
                links.map((element, index) => {
                    element.isActive = index == key ? true : false;
                });
                this.setState({ links });
                break;
            case "Personal":
                personalLinks.map((element, index) => {
                    element.isActive = index == key ? true : false;
                });
                this.setState({ personalLinks });
                break;
            default:
                break;
        }
    }
    render() {
        let { type, message, hasError, user, noti_open, user_open, personalLinks, links } = this.state;
        return (
            <section>
                <div>
                    {!user ? <Navbar dark expand="md" sticky={'top'} className="navbar-header">

                        <NavbarBrand href="/"><img className="img img-responsive navbrand" src={logo} alt="logo" /></NavbarBrand>

                        {this.state.isOpen ?
                            <a onClick={this.toggle} type="button" className="navbar-toggle pull-right closebtn">X</a>
                            :
                            <NavbarToggler onClick={this.toggle} />
                        }

                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {links.map((element, key) => {
                                    return (
                                        <NavItem key={element.menuId} active={element.isActive}>
                                            <NavLink active={element.isActive} href={element.href} className={element.className}
                                                onClick={() => { mContext.switchComponent(element.source); this.setMenuActive("Landing", key) }}>{element.text}</NavLink>
                                        </NavItem>
                                    )
                                })}
                            </Nav>
                        </Collapse>
                    </Navbar> :
                        <Navbar dark expand="md" sticky={'top'} className="navbar-header">

                            <NavbarBrand href="/"><img className="img img-responsive navbrand" src={logo} alt="logo" /></NavbarBrand>

                            {this.state.isOpen ?
                                <a onClick={this.toggle} type="button" className="navbar-toggle pull-right closebtn">X</a>
                                :
                                <NavbarToggler onClick={this.toggle} />
                            }

                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto custom-menu" navbar>
                                   
                                    <NavItem className={noti_open ? "dropdown notifications-menu open" : "dropdown notifications-menu"} >
                                        <a onClick={() => { this.toggleNavMenu("noti") }} />
                                    </NavItem>
                                   
                                    <NavItem className={user_open ? "user user-menu open" : "user user-menu"} onClick={this.handlesignOut}>
                                        <a href="#" className=" prof_bg">
                                            <span className="hidden-xs"><span id="lblUserNameInner" className="frmbtnSO">{"Sign Out"}</span></span>
                                        </a>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>}
                    <section>
                        {hasError && <Col>
                            <AlertComponent
                                onHidden={this.onHidden}
                                type={type}
                                message={message}
                            />
                        </Col>}
                    </section>
                    <div>{this.AuthComponent()}</div>
                </div>

            </section>
        );
    }
}
export const showSuccess = (message) => {
    if (!mContext) {
        return;
    }
    if (message && typeof (message) == 'string') {
        mContext.setState({ type: Globals.SUCCESS, message: message, hasError: true });
        setTimer(Globals.SUCCESS);
    } else {
        mContext.setState({ hasError: false });
    }
}

export const showError = (message) => {
    if (!mContext) {
        return;
    }
    if (message && typeof (message) == 'string') {
        mContext.setState({ type: Globals.DANGER, message: message, hasError: true });
        setTimer(Globals.DANGER);
    } else {
        mContext.setState({ hasError: false });
    }
}

export const showInfo = (message) => {
    if (!mContext) {
        return;
    }
    if (message) {
        mContext.setState({ type: Globals.INFO, message: message, hasError: true });
        setTimer(Globals.INFO);
    } else {
        mContext.setState({ hasError: false });
    }
}
const setTimer = (type) => {
    if (mContext.timerHandle) { return; }
    // Remember the timer handle
    mContext.timerHandle = setTimeout(() => {
        mContext.setState({ hasError: false });
        mContext.timerHandle = 0;
    }, type == Globals.DANGER ? 20000 : 2000);
}
export default App;