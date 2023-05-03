import React from 'react';
import dhairya from "../../src/assets/jpg/dhairya.jfif"
import parikshit from '../../src/assets/jpg/parikshit.jpg'
import rohit from '../../src/assets/jpg/rohit.jpg'
import Footer from './Footer';
function AboutUs() {
  return (
    <div className="about-us-container">
      <div className="about-person">
        <img src={dhairya} alt="Person 1" className='ani' />
        <h3>Dhairya Parikh</h3>
      
        <a href="https://www.linkedin.com/in/person1/" target="_blank" rel="noreferrer">LinkedIn Profile</a>
      </div>
      <div className="about-person">
        <img src={parikshit} alt="Person 2"  className='ani' />
        <h3>Parikshit Agarwal</h3>
   
        <a href="https://www.linkedin.com/in/person2/" target="_blank" rel="noreferrer">LinkedIn Profile</a>
      </div>
      <div className="about-person">
        <img src={rohit} alt="Person 3"  className='ani' />
        <h3>Rohit Dubey</h3>
   
        <a href="https://www.linkedin.com/in/person3/" target="_blank" rel="noreferrer">LinkedIn Profile</a>
      </div>
      <Footer/>
    </div>
  );
}

export default AboutUs;
