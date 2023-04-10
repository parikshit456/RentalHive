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
		<div className="mainDiv">
			<div className="formDiv">
				<h1>Profile</h1>
				<hr />
				<div className="gridContainer">
					<form className="formContainer">
						<div>
							<div className="item1">First Name</div>
							<input type="text" placeholder="John" />
						</div>
						<div>
							<div className="item2">Last Name</div>
							<input type="text" placeholder="Doe" />
						</div>
						<div>
							<div className="item3">Contact Number</div>
							<input type="tel" placeholder="987654321" />
						</div>
						<div>
							<div className="item4">
								<div style={{ marginRight: "340px" }}>Gender</div>
                                <button
                                    // className="formButtonActive btn1" 
									className={
										gender ? "formButtonActive1" : "formButton1"
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
											? "formButtonActive1"
											: "formButton1"
									}
									type="button"
									value={false}
									onClick={onMutate}
									>
									Female
								</button>
							</div>
						</div>
					</form>
				</div>
				<button className="submitButton1">Save Changes</button>
            <hr />
            </div>
		</div>
	);
};

export default Myprofile;