import React, { useContext, useEffect, useState } from "react"
import {UserContext} from "./UserContext"
import { Grid } from "@material-ui/core/"
import { Redirect } from "react-router-dom";
import axios from "axios"

const Login = () =>{
  const [, setUser] = useContext(UserContext)
  const [input, setInput] = useState({email: "", password: "",token:"",name:""})
  const [statusLogin, setStatusLogin] = useState("login");

  function redirectLogin(){
      return <Redirect to ="/Home"/>      
  }  
  useEffect( ()=>{
    console.log(input)
  })

  const handleSubmit = (event) =>{
    event.preventDefault()
    if (statusLogin === "login"){        
      axios.post(`https://backendexample.sanbersy.com/api/user-login?email=${input.email}&password=${input.password}`, {
        email:input.email,
        password:input.password
      })
      .then(res => {
          setInput({...input,name:res.data.user.name,token:res.data.token})                                
          setUser({email:input.email})
          localStorage.setItem("email", JSON.stringify({ email: input.email, password: input.password,token:input.token, name: res.data.user.name }))
          redirectLogin()
          alert("Successfully logged in!",{
            button:"Close"
          })
      }).catch(res=>{
          alert( "Login failed!" ,  "Invalid credentials! Have you made an account?" ,  "error" )
      })
    }
    else if(statusLogin==="register"){
      axios.post(`https://backendexample.sanbersy.com/api/register?name=${input.name}&email=${input.email}&password=${input.password}`, {
        email:input.email,
        password:input.password,
        name:input.name
      })
      .then(res => {
          setUser({email:input.email})         
          localStorage.setItem("email", JSON.stringify({email: input.email, password: input.password,token:res.data.token,name:res.data.user.name}))
          redirectLogin()
          alert("Account successfully registered!",{
            button:"Close"
          })
      }).catch(res=>{
        alert ( "Registration failed!" ,  "Recheck your inputs or register under a different email." ,  "error" )
      })
    }
  }



  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name
    switch (name){
      case "email":{
        setInput({...input, email: value})
        break;
      }
      case "password":{
        setInput({...input, password: value})
        break;
      }
      case "name":{
        setInput({...input, name: value})
        break;
      }      
      default:{break;}

    }
  }

  const switchToRegister = () =>{
    setStatusLogin("register")
  }

  const switchToLogin = () => {
    setStatusLogin("login")
  }

  return(
    <>
      {statusLogin==="login"?
      <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
        <h3 style={{textAlign:"center", marginBottom: "2%"}}>Login</h3>
        <form onSubmit={handleSubmit} >
          <label for="inp" class="inp">
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={4}>
                <span>Email</span>
              </Grid>
              <Grid item md={5}>
                <input type="text" name="email" onChange={handleChange} value={input.email} placeholder="&nbsp;"/>
              </Grid>
            </Grid>
          </label><br/>
          <label for="inp" class="inp">
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={6}>
                <span>Password</span>
              </Grid>
              <Grid item md={6}>
                <input type="password" name="password" onChange={handleChange} value={input.password} placeholder="&nbsp;" style={{width: "70%", marginLeft: "5%"}}/>
              </Grid>
            </Grid>
          </label><br/><br/>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
            <button class="btn-success" style={{marginRight:"1%", padding: "2%", borderRadius: "3%"}}>Login</button>
            <button class="btn-warning" style={{padding: "2%", borderRadius: "3%"}} onClick={switchToRegister}>Register a New Account</button>
          </div>
        </form>        
      </div>
    
      :
      <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
        <h3 style={{textAlign:"center", marginBottom: "3%"}}>Register</h3>        
        <form onSubmit={handleSubmit}>
        <label for="inp" class="inp">
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={6}>
                <span>Email</span>
              </Grid>
              <Grid item md={6}>
                <input type="text" name="email" onChange={handleChange} value={input.email} placeholder="&nbsp;"/>
              </Grid>
            </Grid>
        </label><br/>
        <label for="inp" class="inp">
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={6}>
                <span>Name</span>
              </Grid>
              <Grid item md={6}>
                <input type="text" name="name" onChange={handleChange} value={input.name} placeholder="&nbsp;"/>
              </Grid>
            </Grid>
        </label><br/>
        <label for="inp" class="inp">
            <Grid container justify="space-between" alignItems="center">
              <Grid item md={6}>
                <span>Password</span>
              </Grid>
              <Grid item md={6}>
                <input type="password" name="password" onChange={handleChange} value={input.password} placeholder="&nbsp;" style={{width: "90%"}}/>
              </Grid>
            </Grid>
        </label><br/><br/>

        <button class="btn-outline-info" style={{marginRight:"1%"}}>Register</button>
        <button class="btn-outline-warning" onClick={switchToLogin}>Back To Login</button>
      </form>         
      </div>
     
      }

    </>
  )
}

export default Login