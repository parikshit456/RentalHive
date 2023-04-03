import React from 'react'
import owl from "../assets/jpg/owl.png"
import earlybird from "../assets/jpg/earlybird.png"
import studious from "../assets/jpg/studious.png"
import fitness from "../assets/jpg/fitness.png"
import sporty from "../assets/jpg/sporty.png"
import wonderer from "../assets/jpg/wonderer.png"
import partylover from "../assets/jpg/partylover.png"
import petlover from "../assets/jpg/petlover.png"
import vegan from "../assets/jpg/vegan.png"
import daru from "../assets/jpg/daru.png"
import music from "../assets/jpg/music.png"
import smoking from "../assets/jpg/smoking.png"

import { useState } from 'react'


const Pref = () => {
    
    let pref1 = [
        {
          title: "Night Owl",
          src: owl,
          selected: false
        },
        {
            title: "Early Bird",
            src: earlybird,
            selected: false
        },
        {
            title: "Studious",
            src: studious,
            selected: false
        },
        {
            title: "Fitness Freak",
            src: fitness,
            selected: false
        },
        {
            title: "Sporty",
            src: sporty,
            selected: false
          },
          {
              title: "Wonderer",
              src: wonderer,
              selected: false
          },
          {
              title: "Party Lover",
              src: partylover,
              selected: false
          },
          {
              title: "Pet Lover",
              src: petlover,
              selected: false
          },
          {
            title: "Vegan",
            src: vegan,
            selected: false
          },
          {
              title: "Non-Alcholic",
              src: daru,
              selected: false
          },
          {
              title: "Music Lover",
              src: music,
              selected: false
          },
          {
              title: "Non-Smoker",
              src: smoking,
              selected: false
          }
      ];
    const [prefList,setPrefList] = useState(pref1)
    const onClick = (pref,i) => {
        let prefs = [...prefList];
        let selectedPref = {...prefs[i],selected: !prefs[i].selected}
        prefs[i] = selectedPref;
        setPrefList(prefs)

    } 
   

  return (
    <div style={{display : "flex" , justifyContent : "center"}}>
    <div className="prefCard">
        <p style={{textAlign: "center" , fontSize: "23px" }}>What type of flatmate you like?</p>
        <p style={{textAlign: "center" , fontSize: "13px" , padding: "15px"}}> select at least 5 categories </p>
        <div className='prefCardInside'> 
            {
              prefList.map((project, index) => {
                return (

                    <button  
                        onClick={()=>onClick(project,index)}
                        key={index} 
                        className={project.selected ? 'prefInsideActive' : 'prefInside'}>
                        <img src={project.src} style={{width:"90%" , height: "50px" }} className='prefImg' ></img>
                        <p>{project.title}</p>
                    </button>
                        )    
                  }) 
                }
        
        </div>

        <div style={{display: "flex" , justifyContent: "center"}}>
            <button className='prefBtn'>Continue</button>
        </div>
        
    </div>
    </div>
  )
}

export default Pref




