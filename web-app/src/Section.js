import React, {useContext} from "react"
import { Switch, Route, Redirect } from "react-router-dom";

import Home from "./home"
import Login from "./Login"
import Game from "./game"
import About from "./about"
import MovieEditor from "./listmovie"
import MovieEditorForm from "./editmovie"
import GamesEditor from "./EditReleaseGames"
import GamesEditorForm from "./editGames"
import {UserContext} from "./UserContext"
import ChangePassword from "./ChangePassword"


const Section = () =>{

  const [user] = useContext(UserContext);

  const PrivateRoute = ({user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({user, ...props }) =>
  user ? <Redirect to="/" /> : <Route {...props} />;

  return(    
    <section >
      <Switch>
        <LoginRoute exact path="/login" user={user} component={Login}/>
        <PrivateRoute exact path="/" user={user} component={Home}/>
        <Route exact path="/Home" user={user} component={Home}/>
        <Route exact path="/Game" user={user} component={Game}/>
        <Route exact path="/About" user={user} component={About}/>
        <PrivateRoute exact path="/movies" user={user} component={MovieEditor}/>
        <PrivateRoute exact path="/movies-form" user={user} component={MovieEditorForm}/>
        <PrivateRoute exact path="/Edit-Game" user={user} component={GamesEditor}/>
        <PrivateRoute exact path="/Edit-Game-form" user={user} component={GamesEditorForm}/>
        <PrivateRoute exact path="/Change-Pass" user={user} component={ChangePassword}/>
      </Switch>
    </section>
  )
}

export default Section
