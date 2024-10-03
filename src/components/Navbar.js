import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";

// all a replace with Link and href with to

const Navbar = () => {
    let navigate = useNavigate();
    const handlelogout = () =>{
        localStorage.removeItem('token');
        navigate("/login");
    }
    // it is used in make home or about to make dark when cursor points otherwise same
    let location = useLocation();
    useEffect(() => {
        // console.log(location);
    }, [location]);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/">iNoteBook</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className='d-flex'>
                    <Link role='button' to="/Signup" style={{ margin: "8px"}} className="btn btn-primary">SignUp</Link>
                    <Link role='button' to="/Login" style={{ margin: "8px"}} className="btn btn-primary">Login</Link></form> : <button onClick={handlelogout} className='btn btn-primary'>Logout</button>}
                </div>
            </nav>
        </div>
    )
}

export default Navbar