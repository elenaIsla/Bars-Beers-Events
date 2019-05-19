import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div className="landing">
    
            <img src={process.env.PUBLIC_URL + "images/logo.svg"} alt="logo"/>
            <p className="landing-text">Find the bars with your favourite beers</p>
            <Link to="/login"><button className="login-btn">Login</button></Link>
            <Link to="/signup"><button className="signUp-btn">Signup</button></Link>
        </div>
    )
}

export default LandingPage;