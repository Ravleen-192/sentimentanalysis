import React,{Component} from 'react';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import homeimg from "../images/home.png";
const divStyle = {
  backgroundposition: "50% 0",
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
  opacity:1,
  backgroundImage: `url(${homeimg})`,
};
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
 
  render() {
    
    return (
      <section>
      <div className="bg ">
        <div style={divStyle} className="homeimg">
          <div className="homebg">
            <div className="centerdiv">
              <h1 align="center">Lets Take A Step Towards the Next Generation!!</h1>
              <h2 align="center">Lets Take A Step Towards the Next Generation!!</h2>
              <h3 align="center">Lets Take A Step Towards the Next Generation!!</h3>
            </div>
          </div>
        </div>
      </div>
      </section>
    );
  }
}

export default Home;