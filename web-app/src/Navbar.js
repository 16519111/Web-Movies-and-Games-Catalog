import React, {useContext} from 'react';
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
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style={{display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
                <div>
                    <a class="navbar-brand" href="/">the CONSERVATIVE GEEKS</a>
                </div>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
              
                <div class="collapse navbar-collapse" id="navbarColor02">
                  <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <Link className="nav-link" to="/Home">Home</Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="/about">About </Link>
                    </li>
                    <li class="nav-item">
                        <Link className="nav-link" to="/Game">Games </Link>
                    </li>
                    { user && <li class="nav-item"><Link className="nav-link" to="/movies">Movie List</Link></li> }
                    { user && <li class="nav-item"><Link className="nav-link" to="/movies-form">Movie Editor </Link></li> }
                    { user && <li class="nav-item"><Link className="nav-link" to="/Edit-Game">Game List </Link></li> }
                    { user && <li class="nav-item"><Link className="nav-link" to="/Edit-Game-form">Game Editor </Link></li> }
                    { user === null && <li class="nav-item"><Link className="nav-link" to="/login">Login </Link></li> }
                    { user && <li class="nav-item"><Link className="nav-link" to="/Change-Pass">Change Password </Link></li> }
                    { user && <li class="nav-item"><Link to="/login" style={{cursor: "pointer"}} className="nav-link" onClick={handleLogout}>Logout </Link></li> }
                  </ul>
                </div>
              </nav>                                    
        </div>
    );
}

export default NavBar;