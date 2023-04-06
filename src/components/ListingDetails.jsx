import React from 'react'
import picture from '../assets/jpg/picture.jpg'
import owl from "../assets/jpg/owl.png"
import profile from '../assets/svg/profile.svg'
import { preferenceList } from "../assets/prefs";
import MultipleSelectCard from './MultipleSelectCard';
import sendreq from "../assets/svg/sendreq.svg"
import address from "../assets/svg/address.svg"

const ListingDetails = () => {
  return (
    <div style={{display: "flex" , justifyContent: "center"}}>
        <div className='listingdetail'>
        <div className='listingdetasilinside'>
            <div className='listingProfileCard'>
            <div className='listingImg'>
                <img src={profile} style={{width:"100%" , borderRadius:"50px"}}/>
                <p>Uday Kumar</p>
            </div>
            <div className='listingPhone'>
            <img src={address} style={{width:"60px"}}/>
            <p>Panamax House-2, Shilaj Circle, Ahemdabad, Gujarat, India</p>
            <button className='listingButton'><img src={sendreq}/> Send Request</button>
            </div>
            
            </div>

            <hr/>
            
            <h3>Basic Info</h3>
            <div className='listingProfile'>
            <div className='listingInfo'>
                <p>Gender</p>
                <h3>Male</h3>
            </div>
            <div className='listingInfo'>
                <p>Approx Rent</p>
                <h3>₹ 5000</h3>
            </div>
            <div className='listingInfo'>
                <p>Occupancy</p>
                <h3>Any</h3>
            </div>
            <div className='listingInfo'>
                <p>Looking For</p>
                <h3>Female</h3>
            </div>
            </div>
            
            <hr></hr>
            
            <h3>Pictures</h3>
            <img src={picture} style={{width:"50%" , height: "250px" }}/>
            
            
            
            <hr></hr>
            
            <h3>Preferences</h3>
            <div className='listingPref'>
          {preferenceList.map((project, index) => {
            return (
                <button
                key={index}
                className='listingPrefCard'
              >
                <img
                  src={project.src}
                  style={{ width: "60%", height: "30px" }}
                  className="selectCardImg"
                ></img>
                <p>{project.title}</p>
              </button>
            );
          })}
        </div>
            
            <hr></hr>
            <h3>Amenities</h3>

            <hr></hr>
            <h3>Description</h3>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>

        </div>
    </div>
    </div>
    
  )
}

export default ListingDetails