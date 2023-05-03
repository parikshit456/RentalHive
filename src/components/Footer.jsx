import React from "react";
import github from "../assets/svg/github.svg";
import linkedin from "../assets/svg/linkedin.svg";
import facebook from "../assets/svg/facebook.svg";
import instagram from "../assets/svg/instagram.svg";

const Footer = () => {
  return (
    <div>
      <footer className="footer" style={{marginTop:"20px"}}>
        <div>
          <span>Services</span>
          <a href="/about-us">Branding</a>
          <a href="/about-us">Design</a>
          <a href="/about-us">Marketing</a>
          <a href="/about-us">Advertisement</a>
        </div>
        <div>
          <span>Company</span>
          <a href="/about-us">About us</a>
          <a href="/about-us">Contact</a>
          <a href="/about-us">Jobs</a>
          <a href="/about-us">Press kit</a>
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
