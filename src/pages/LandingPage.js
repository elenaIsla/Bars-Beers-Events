import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
    return (
        <div>
            <h1>Bars and Events</h1>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
        </div>
    )
}

export default LandingPage;