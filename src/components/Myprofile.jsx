import React, { useState } from "react";

const Myprofile = () => {

    const [gender , setGender] = useState()

    const onMutate = (e) => {
        if (e.target.value === 'true') {
            setGender(true)
        }
        if (e.target.value === 'false') {
            setGender(false)
        }
    }

	return (
		<div className="mainDivProfile">
			<div className="formDivProfile">
				<h1 style={{marginRight: '50vw', marginTop: '-30px',color: 'rgb(104, 107, 112)'}}>Profile</h1>
                <hr/>
				<div className="gridContainerProfile">
					<div >
						<div>
							<div className="item1Profile">First Name</div>
							<input className="inputProfile" type="text" placeholder="John" />
						</div>
						<div>
							<div className="item2Profile">Last Name</div>
							<input className="inputProfile" type="text" placeholder="Doe" />
						</div>
						<div>
							<div className="item3Profile">Contact No.</div>
							<input className="inputProfile" type="tel" placeholder="987654321" />
						</div>
						<div>
							<div className="item4Profile">
								<div style={{ marginRight: "250px" }}>Gender</div>
                                <button
                                    // className="formButtonActive btn1" 
									className={
										gender ? "formButtonActiveProfile" : "formButtonProfile"
									}
									type="button"
									value={true}
									onClick={onMutate}
								>
									Male
								</button>
                                <button
                                    // className="formButton"
									className={
										!gender && gender !== null
											? "formButtonActiveProfile"
											: "formButtonProfile"
									}
									type="button"
									value={false}
									onClick={onMutate}
									style={{ marginRight: "50px" }}>
									Female
								</button>
							</div>
						</div>
					</div>
				</div>
				<button className="submitButtonProfile" style={{marginRight: '70vw'}}>Save Changes</button>
            <hr style={{marginleft: '5px', width: '62vw',color: '#F3F4F6'}}/>
            </div>
		</div>
	);
};

export default Myprofile;
