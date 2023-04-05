import React from 'react'
import picture from '../assets/jpg/picture.jpg'
import owl from "../assets/jpg/owl.png"

const ListingDetails = () => {
  return (
    <div style={{display: "flex" , justifyContent: "center"}}>
        <div className='listingdetail'>
        <div className='listingdetasilinside'>
            <h3>Location</h3>
            <p>ahemdabad</p>
            
            <hr></hr>
            
            <h3>Basic Info</h3>
            <div style={{display : "flex"}}>
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
            <button  style={{pointerEvents: "none"}} className='multiple-select-card' >
                <img src={owl} style={{width:"90%" , height: "50px" }} className='selectCardImg' />
                <p>Night Owl</p>
            </button>
            
            <hr></hr>
            <h3>Amenities</h3>

            <hr></hr>
            <h3>Description</h3>
            <p>description</p>

        </div>
    </div>
    </div>
    
  )
}

export default ListingDetails