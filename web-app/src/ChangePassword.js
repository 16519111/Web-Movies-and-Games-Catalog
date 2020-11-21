import React, { useContext, useState } from "react"
import {UserContext} from "./UserContext"
import { Redirect } from "react-router-dom";
import { Grid } from "@material-ui/core/"
import axios from "axios" 

const ChangePass = () =>{
  const [, setUser] = useContext(UserContext)
  const [inputChange, setInputChange] = useState({password:"",new_password:"",new_confirm_password:""})
  
  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
  }
  function redirectLogin(){
      return <Redirect to ="/about"/>      
  }  

  const userData = JSON.parse(localStorage.getItem('email'))

  const handleSubmit = (event) =>{
    event.preventDefault()
      axios.post(`https://backendexample.sanbersy.com/api/change-password?token=${userData.token}&current_password=${inputChange.password}
      &new_password=${inputChange.new_password}&new_confirm_password=${inputChange.new_confirm_password}`, {
        token:userData.token,
        password:inputChange.password,
        new_password:inputChange.new_password,
        new_confirm_password: inputChange.new_confirm_password
      })
      .then(res => {
          setUser({email:inputChange.email})
          localStorage.setItem("email", JSON.stringify({...userData,password:inputChange.new_password}))
          redirectLogin()
          alert("Password successfully changed!",{
            button:"Close"
          })
          handleLogout()
      }).catch(res=>{
        alert ( "Invalid input!" ,  "Please recheck your password inputs!" ,  "error" )
      })
  }



  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "new_password":{
        setInputChange({...inputChange, new_password: value})
        break;
      }
      case "password":{
        setInputChange({...inputChange, password: value})
        break;
      }
      case "new_confirm_password":{
        setInputChange({...inputChange, new_confirm_password: value})
        break;
      }
      default:{break;}
    }
  }

  return(
    <div style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
        <h3 style={{textAlign:"center", marginBottom: "2%"}}>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <label for="inp" class="inp">
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={5}>
                <span>Current Password</span>
              </Grid>
              <Grid item md={5}>
                <input type="password" name="password" onChange={handleChange} value={inputChange.password} placeholder="&nbsp;"/>
              </Grid>
            </Grid>
          </label><br/>
          <label for="inp" class="inp">
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={4}>
                <span>New Password</span>
              </Grid>
              <Grid item md={4}>
                <input type="password" name="new_password" onChange={handleChange} value={inputChange.new_password} placeholder="&nbsp;" style={{width: "170px"}}/>
              </Grid>
            </Grid>
          </label><br/>
          <label for="inp" class="inp">
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={5}>
                <span>Confirm Password</span>
              </Grid>
              <Grid item md={5}>
                <input type="password" name="new_confirm_password" onChange={handleChange} value={inputChange.new_confirm_password} placeholder="&nbsp;"/>
              </Grid>
            </Grid>
          </label><br/><br/>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <button className="btn btn-info">Change Password</button>
          </div>
        </form>                
    </div>
  )
}

export default ChangePass