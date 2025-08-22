import React, { useState } from "react";
import * as signupFunc from "./SignupFunctions";
import { FaFacebookF, FaTwitterSquare } from "react-icons/fa";
import "./signup.css";

export default function Signup({ history }) {
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        mobile: "",
        gender: "",
        password: ""
    });
    const [errors, setErrors] = useState({});

    const validateEmail = (email) => {
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return mailformat.test(email);
    };

    const validatePassword = (password) => {
        const passwordFormat = /^[A-Za-z]\w{7,14}$/;
        return passwordFormat.test(password);
    };

    const validateMobile = (mobile) => {
        const mobileFormat = /^\d{10,15}$/;
        return mobileFormat.test(mobile);
    };

    const handleChangeEvent = (e, field) => {
        const fieldValue = e.target.value;
        
        // Validate fields in real-time
        if (field === 'email' && fieldValue && !validateEmail(fieldValue)) {
            setErrors({...errors, email: "Please enter a valid email address"});
        } else if (field === 'password' && fieldValue && !validatePassword(fieldValue)) {
            setErrors({...errors, password: "Password must be 7-15 characters starting with a letter"});
        } else if (field === 'mobile' && fieldValue && !validateMobile(fieldValue)) {
            setErrors({...errors, mobile: "Please enter a valid mobile number (10-15 digits)"});
        } else {
            const newErrors = {...errors};
            delete newErrors[field];
            setErrors(newErrors);
        }

        setNewUser({...newUser, [field]: fieldValue});
    };

    const getToSignIn = (e) => {
        e.preventDefault();
        history.push("/login");
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!newUser.name) newErrors.name = "Name is required";
        if (!newUser.email) {
            newErrors.email = "Email is required";
        } else if (!validateEmail(newUser.email)) {
            newErrors.email = "Please enter a valid email";
        }
        if (!newUser.mobile) {
            newErrors.mobile = "Mobile number is required";
        } else if (!validateMobile(newUser.mobile)) {
            newErrors.mobile = "Please enter a valid mobile number";
        }
        if (!newUser.gender) newErrors.gender = "Gender is required";
        if (!newUser.password) {
            newErrors.password = "Password is required";
        } else if (!validatePassword(newUser.password)) {
            newErrors.password = "Password must be 7-15 characters starting with a letter";
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const submitData = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        try {
            await signupFunc.registerUser(newUser);
            history.push("/login");
        } catch (error) {
            console.error("Registration failed:", error);
            // Handle error (e.g., show error message to user)
        }
    };

    return (
        <div className="container">
            <div className="flex-container">
                <div className="row full">
                    <div className="col-md-12">
                        <div className="form-container">
                            <div className="form-container-in"></div>
                            <div className="row sgnUp">
                                <div className="col-md-6 right-divider pdding">
                                    <h3 className="lead-text mn-txt">Join Us with Social</h3>
                                    <div className="icon-soc-fb">
                                        <FaFacebookF />
                                    </div>
                                    <div className="icon-soc-tw">
                                        <FaTwitterSquare />
                                    </div>
                                </div>
                                <div className="left-divider">
                                    <div className="col-md-6">
                                        <form onSubmit={submitData}>
                                            <div className="form-group2">
                                                <label htmlFor="name">Name:</label>
                                                <input 
                                                    id="name"
                                                    type="text"
                                                    className={`form-control sgnUp ${errors.name ? 'is-invalid' : ''}`}
                                                    onChange={(e) => handleChangeEvent(e, "name")}
                                                    value={newUser.name}
                                                />
                                                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                            </div>
                                            <div className="form-group2">
                                                <label htmlFor="email">Email - ID:</label>
                                                <input 
                                                    id="email"
                                                    type="email"
                                                    className={`form-control sgnUp ${errors.email ? 'is-invalid' : ''}`}
                                                    onChange={(e) => handleChangeEvent(e, "email")}
                                                    value={newUser.email}
                                                />
                                                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                            </div>
                                            <div className="form-group2">
                                                <label htmlFor="mob-number">Mobile - No.:</label>
                                                <input 
                                                    id="mob-number"
                                                    type="text"
                                                    className={`form-control sgnUp ${errors.mobile ? 'is-invalid' : ''}`}
                                                    onChange={(e) => handleChangeEvent(e, "mobile")}
                                                    value={newUser.mobile}
                                                />
                                                {errors.mobile && <div className="invalid-feedback">{errors.mobile}</div>}
                                            </div>
                                            <div className="form-group2">
                                                <div className="form-check form-check-inline rd">
                                                    <input 
                                                        className="form-check-input"
                                                        type="radio"
                                                        id="Male"
                                                        name="gender"
                                                        value="Male"
                                                        onChange={(e) => handleChangeEvent(e, "gender")}
                                                        checked={newUser.gender === "Male"}
                                                    />
                                                    <label className="form-check-label" htmlFor="Male">
                                                        Male
                                                    </label>
                                                </div>
                                                <div className="form-check form-check-inline rd">
                                                    <input 
                                                        className="form-check-input"
                                                        type="radio"
                                                        id="Female"
                                                        name="gender"
                                                        value="Female"
                                                        onChange={(e) => handleChangeEvent(e, "gender")}
                                                        checked={newUser.gender === "Female"}
                                                    />
                                                    <label className="form-check-label" htmlFor="Female">
                                                        Female
                                                    </label>
                                                </div>
                                                {errors.gender && <div className="invalid-feedback d-block">{errors.gender}</div>}
                                            </div>
                                            <div className="form-group2">
                                                <label htmlFor="password">Password:</label>
                                                <input 
                                                    id="password"
                                                    type="password"
                                                    className={`form-control sgnUp ${errors.password ? 'is-invalid' : ''}`}
                                                    onChange={(e) => handleChangeEvent(e, "password")}
                                                    value={newUser.password}
                                                />
                                                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                            </div>
                                            <div className="form-group2">
                                                <input 
                                                    type="submit"
                                                    value="Submit"
                                                    className="btn-primary btnn form-submit sub-btn sgnUp"
                                                />
                                            </div>
                                            <div>
                                                <small className="form-text text-muted link-text">
                                                    Already a User?
                                                </small>
                                                <span className="signuptext">
                                                    <a href="/#" onClick={getToSignIn}>
                                                        Sign In
                                                    </a>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}