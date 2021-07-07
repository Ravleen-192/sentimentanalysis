import React,{Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import homeimg from "../images/home.png";
/*const divStyle = {
  backgroundposition: "50% 0",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
  opacity:1,
  //backgroundImage: `url(${homeimg})`,
};*/
class Home extends Component {
  constructor() {
    super();
    this.state = { 
      activeIndex :0,isActivePre:false,
      
    };
  }
  componentDidMount(){
    window.scrollTo(0,0);
    
  }
  handleClick = event => {
    this.props.switchComponent("SignIn");
    this.props.setOnLoad(true);
    this.props.clearInputs();
  }
  render() {
    
    return (
      <section>
      <div className="bg ">
        
          
            <div className="centerdiv">
              <h2 align="center">Welcome to Triadh’s StoLav Adaptive Intelligence Platform.</h2>
              <h3 align="center" > Analyze and get intelligence from your unstructured data (text, scanned documents, audio, video) .</h3>
              <h6 align="center">Explore our Computer Vision Catalog of libraries, utilities and models optimized for Cloud and edge,IOT and embedded devices.</h6>
              <button align="center" className="frmbtn" onClick={this.handleClick}>Sign in </button>
            </div>
          
        
      </div>
      </section>
    );
  }
}

export default Home;