import React,{Component} from 'react';
import {node} from 'prop-types';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.png';
import {Collapse,Navbar,NavbarBrand,Nav,NavItem,NavLink,Col} from 'reactstrap';
import SignIn from "./components/Login";
import SignUp from "./components/Reg";
import Verify from "./components/Verify";
import Home from "./components/home";
import MainGrid from "./MainGrid";
import { Auth } from "aws-amplify";
import Amplify from 'aws-amplify'
import config from './aws-exports';
import Globals from './Handlers/Globals';
import AlertComponent from './Handlers/AlertComponent';
//import { FaBell } from 'react-icons/fa';
Amplify.configure(config);

var mContext;
class App extends Component {
  constructor() {
    super();
    this.state = { 
      isOpen: false,
      child:node,
      username: "",email: "",password: "",
      phone_number: "",address:"",address2:"",st:"",zip:"",city:"",
      code: "",role_id:'',
      user: null, // will contain our user data object when signed in
      status: "Home",loaded:true,hasError:false,type:"",message:"",
      noti_open:false,user_open:false,
      personalLinks : [
        { href: '#Home', text: 'Home', menuId:1,source:"PersonalHome",isActive:true },
        {href:"#Jobs",text:"Jobs",menuId:2,source:"Jobs",isActive:false},
        { href: '#NetWorks', text: 'My Network', menuId:3 ,source:"Networks",isActive:false},
      ],
      links : [
        { href: '#Home', text: 'Home', menuId:1,source:"Home",isActive:true },
        {href:"#Login",text:"Sign In",menuId:2,source:"SignIn", isActive:false},
        { href: '#Reg', text: 'Sign Up Free', menuId:3 ,className:"register",source:"SignUp",isActive:false},
      ]
    };
    mContext = this;
    this.toggle = this.toggle.bind(this);
    this.setOnLoad = this.setOnLoad.bind(this);
    //this.onHidden = this.onHidden.bind(this);
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
    let{links,personalLinks}= this.state;
    try {
      this.setOnLoad(false);
      Auth.signOut();
      this.setState({user:null});
      this.switchComponent("SignIn");
      this.setOnLoad(true);
      links.map((element)=>{
        element.isActive = element.menuId===2?true:false;
      });
      personalLinks.map((element)=>{
        element.isActive = element.menuId===1?true:false;
      });
      this.setState({links,personalLinks});
    } catch (error) {
      this.setOnLoad(true);
      console.log('error signing out: ', error);
    }
  };
  handleFormInput = (event,source) => {
    if(source==="phone"){
      this.setState({phone_number:event});
    }else if(source==="role"){
      this.setState({role_id:event?event.role_id:null});
    }else{
      this.setState({
        [event.target.name]: event.target.value
      });
    }
  };
  AuthComponent = () => {
    switch (this.state.status) {
      case "Home":
        return (
          <Home
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
            source ={this.state.status}
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
  
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  closeNavbar() {
    if (this.state.isOpen === true) {
      this.toggle();
    }
  }
  setOnLoad(source){
    this.setState({loaded:source});
  }
  setUser(user){
    mContext.setState({user:user});
  }
  onHidden(hidden){
    mContext.setState({hasError:hidden.hasError});
  }
  clearInputs(){
    mContext.setState({email:"",password:"",address:"",address2:"",st:"",city:"",phone_number:""})
  }
  
  toggleNavMenu(nav_item) {
    const {noti_open, user_open} = this.state;
    switch (nav_item) {
      case "noti":
          this.setState({ theam_open: false, fav_open: false, noti_open: !noti_open,other_noti_open:false, user_open: false });
          break;
      case "user":
        this.setState({theam_open: false, fav_open: false, noti_open: false,other_noti_open:false, user_open: !user_open });
          break;
      default:
          this.setState({ noti_open: false, user_open: false });
          break;
    }
  }
  setMenuActive(source,key){
    let{links,personalLinks}= this.state;
    switch (source) {
      case "Landing":
          links.map((element,index)=>{
            element.isActive = index === key?true:false;
          });
          this.setState({links});
        break;
      case "Personal":
        personalLinks.map((element,index)=>{
          element.isActive = index === key?true:false;
        });
        this.setState({personalLinks});
        break;
      default:
        break;
    }
  }
  loadMenus(){
    let{user,personalLinks} = this.state;
    if(user.role_id ===2){
      return(
        personalLinks.map((element,key)=>{
          return(
            <NavItem key={element.menuId} active={element.isActive}>
              <NavLink active={element.isActive} href={element.href}  className={element.className}  
              onClick={()=>{mContext.switchComponent(element.source);this.setMenuActive("personal",key)}}>{element.text}</NavLink>
            </NavItem>
          )
        })
      )
    }else{
      return;
    }
  }
  render() {
    let{user,type,message,hasError,user_open,links}= this.state;
    return (
      <section>
        <div>
          {!user?<Navbar dark expand="md" sticky={'top'} className="navbar-header">
            
            <NavbarBrand href="/"><img className="img img-responsive navbrand" src={logo} alt="logo" /></NavbarBrand>
          
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {links.map((element,key)=>{
                  return(
                    <NavItem key={element.menuId} active={element.isActive}>
                      <NavLink active={element.isActive} href={element.href}  className={element.className}  
                      onClick={()=>{mContext.switchComponent(element.source);this.setMenuActive("Landing",key)}}>{element.text}</NavLink>
                    </NavItem>
                  )
                })}
              </Nav>
            </Collapse>
          </Navbar>:
          <Navbar dark expand="md" sticky={'top'} className="navbar-header">
            <NavbarBrand href="/"><img className="img img-responsive navbrand" src={logo} alt="logo" /></NavbarBrand>
          
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto custom-menu" navbar>
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
  if (message && typeof(message) == 'string') {
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
  if (message && typeof(message) == 'string') {
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
  }, type === Globals.DANGER ? 2000 : 2000);
}
export default App;