import React from "react";
import github from "../assets/svg/github.svg";
import linkedin from "../assets/svg/linkedin.svg";
import facebook from "../assets/svg/facebook.svg";
import instagram from "../assets/svg/instagram.svg";

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div>
          <span>Services</span>
          <a>Branding</a>
          <a>Design</a>
          <a>Marketing</a>
          <a>Advertisement</a>
        </div>
        <div>
          <span>Company</span>
          <a>About us</a>
          <a>Contact</a>
          <a>Jobs</a>
          <a>Press kit</a>
        </div>
        <div>
          <span>Legal</span>
          <a>Terms of use</a>
          <a>Privacy policy</a>
          <a>Cookie policy</a>
        </div>
      </footer>
      <footer className="footer">
        <div>
          <p>Copyright © 2023 - All right reserved by HouseHunter.in</p>
        </div>
        <div>
          <div style={{display:"flex"}}>
            <a>
              <img
                src={facebook}
              />
            </a>
            <a>
              <img
                src={instagram}
              />
            </a>
            <a>
              <img
                src={linkedin}
              />
            </a>
            <a>
              <img
                src={github}
              style={{height:"40px" ,width:"40px" , marginTop:"0px"}}/>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
