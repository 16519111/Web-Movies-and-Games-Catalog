import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import "./App.css"
import "./bootstrap.css"

function NavBar(props) {

        const [user, setUser] = useContext(UserContext)
        const handleLogout = () =>{
          setUser(null)
          localStorage.removeItem("user")
        }

    return (
        <div>
            <nav class="navbar  navbar-dark bg-dark" style={{display: "flex", flexDirection: "row", justifyContent: "space-around", position:"sticky"}}>
                <div>
                    <a class="navbar-brand" href="/">Created By Gregorius Dimas ~ AMDG</a>
                </div>
              
                <div class="collapse navbar-collapse" id="navbarColor02">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="/about">About </Link>
                    </li>
                    { user && <li class="nav-item"><Link className="nav-link" to="/movies">Movie List Editor </Link></li> }
                    { user === null && <li class="nav-item"><Link className="nav-link" to="/login">Login </Link></li> }
                    { user && <li class="nav-item"><button style={{cursor: "pointer"}} className="nav-link" onClick={handleLogout}>Logout</button></li> }
                  </ul>
                </div>
              </nav>                                    
        </div>
    );
}

export default NavBar;