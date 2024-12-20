import React from "react";
import dhairya from "../../src/assets/jpg/dhairya.jfif";
import parikshit from "../../src/assets/jpg/parikshit.jpg";
import rohit from "../../src/assets/jpg/rohit.jpg";
import Footer from "./Footer";
import github from "../assets/svg/github.svg";
import linkedin from "../assets/svg/linkedin.svg";
import instagram from "../assets/svg/instagram.svg";

function AboutUs() {
  return (
    <div>
      <div className="about-us-container">
        <div className="about-person">
          <img src={dhairya} alt="Person 1" className="ani" />
          <h3 className="animate-charcter">Dhairya Parikh</h3>

          <div style={{display:"flex" , justifyContent:"center"}}>
            <a>
              <img
                src={instagram}
                className="about-img"
              />
            </a>
            <a>
              <img
                src={github}
                className="about-img" style={{height:"50px" ,width:"50px" , marginTop:"0px"}}/>
            </a>
            <a>
              <img
                src={linkedin}
                className="about-img"
              />
            </a>
          </div>
        </div>
       
        <div className="about-person">
          <img src={rohit} alt="Person 3" className="ani" />
          <h3 className="animate-charcter">Rohit Dubey</h3>

          <div style={{display:"flex" , justifyContent:"center"}}>
            <a href="https://www.instagram.com/rohit_dubey_._/?r=nametag" target="_blank">
              <img
                src={instagram}
                className="about-img"
              />
            </a>
            <a href="https://github.com/Rohit5464" target="_blank">
              <img
                src={github}
                className="about-img" style={{height:"50px" ,width:"50px" , marginTop:"0px"}}/>
            </a>
            <a href="https://www.linkedin.com/in/rohit-dubey-232742224/" target="_blank">
              <img
                src={linkedin}
                className="about-img"
              />
            </a>
            
          </div>
        </div>

        <div className="about-person">
          <img src={parikshit} alt="Person 2" className="ani" />
          <h3 className="animate-charcter" >Parikshit Agarwal</h3>
          <div>
          <div style={{display:"flex" , justifyContent:"center"}}>
            <a href="https://www.instagram.com/_parikshitagarwal_/?igshid=ZDdkNTZiNTM%3D" target="_blank">
              <img
                src={instagram}
                className="about-img"
              />
            </a>
            <a href="https://github.com/parikshit456" target="_blank">
              <img
                src={github}
                className="about-img" style={{height:"50px" ,width:"50px" , marginTop:"0px"}}/>
            </a>
            <a href="https://www.linkedin.com/in/parikshit-agarwal-37b533202/" target="_blank">
              <img
                src={linkedin}
                className="about-img"
              />
            </a>
            
          </div>
        </div>
        </div>
      </div>
      <div className="high">Hover on the name if you are high or wanna see the matrix glitch!</div>
      <Footer />
    </div>
  );
}

export default AboutUs;
