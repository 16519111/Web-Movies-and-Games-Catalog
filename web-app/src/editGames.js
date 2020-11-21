import React, {useState, useEffect} from "react"
import axios from "axios"
import "./App.css"

const EditGames = (props) => {
  
  const [games, setGames] =  useState(null)
  const [input, setInput]  =  useState({
    name: "",
    singlePlayer: 0,
    multiplayer: 0,
    platform: "",
    genre: "",
    release: "",
    image_url:""
  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")

  if(statusForm === "create"){
    try {
        setInput(props.location.state.inp)
        setSelectedId(props.location.state.select)
        setStatusForm(props.location.state.status)
    }
    catch(err) {
        console.log(null)
    }
  }
  useEffect( () => {
    if (games === null){
      axios.get(`https://backendexample.sanbersy.com/api/games`)
      .then(res => {
          setGames(res.data.map(el=>{ return {
            id: el.id, 
            name: el.name, 
            singlePlayer: el.singlePlayer,
            multiplayer: el.multiplayer,
            platform: el.platform,
            genre: el.genre,
            release: el.release,
            image_url: el.image_url
          }
        }))
      })
    }
  }, [games])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setInput({...input, name: event.target.value});
        break
      }
      case "singlePlayer":
      {
        setInput({...input, singlePlayer: event.target.value});
        break
      }
      case "multiplayer":
      {
        setInput({...input, multiplayer: event.target.value});
          break
      }
      case "platform":
      {
        setInput({...input, platform: event.target.value});
          break
      }
      case "genre":
        {
          setInput({...input, genre: event.target.value});
            break
        }
      case "release":
        {
          setInput({...input, release: event.target.value});
            break
        }
      case "image_url":
        {
          setInput({...input, image_url: event.target.value});
            break
        }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let name = input.name
    console.log(input)

    if (name.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://backendexample.sanbersy.com/api/games`, {
          name: input.name,
          genre: input.genre, 
          singlePlayer: input.singlePlayer,
          multiplayer: input.multiplayer,
          platform: input.platform,          
          release: input.release,
          image_url: input.image_url
        })
        .then(res => {
            setGames([...games, {id: res.data.id, ...input}])
        }).catch((res) => console.log('Isi', res));
      }else if(statusForm === "edit"){
        axios.put(`https://backendexample.sanbersy.com/api/games/${selectedId}`, {
            name: input.name, 
            singlePlayer: input.singlePlayer,
            multiplayer: input.multiplayer,
            platform: input.platform,
            genre: input.genre,
            release: input.release,
            image_url: input.image_url
        })
        .then(res => {
            let singleGame = games.find(el=> el.id === selectedId)
            singleGame.name = input.name
            singleGame.singlePlayer = input.singlePlayer
            singleGame.multiplayer = input.multiplayer
            singleGame.platform = input.platform
            singleGame.genre = input.genre
            singleGame.release = input.release
            singleGame.image_url = input.image_url
            setGames([...games])
        })
        
      }
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        name: "",
        singlePlayer: 0,
        multiplayer: 0,
        platform: "",
        genre: "",
        release: "",
        image_url: ""
      })
    }
    alert("Changes successfully made!")
  }

  return(
    <div className="container">
      <h2 style={{textAlign: "center", marginBottom: "2%"}}>Create and Edit Games</h2>
      {/* Form */}
      <form onSubmit={handleSubmit} style={{width: "50%", margin: "auto"}}>
        <div>
          <label style={{float: "left"}}>
            Name:
          </label>
          <input style={{float: "right"}} type="text" name="name" value={input.name} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{float: "left"}}>
            Genre:
          </label>
          <textarea style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
          <br/>
          <br/>
        </div>

        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Single Player (0=False, 1=True):
          </label>
          <input style={{float: "right"}} type="number" name="singlePlayer" max={1} min={0} value={input.singlePlayer} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Multi Player (0=False, 1=True):
          </label>
          <input style={{float: "right"}} type="number" name="multiplayer" max={1} min={0} value={input.multiplayer} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Platform:
          </label>
          <input style={{float: "right"}} type="text"  name="platform" value={input.platform} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Release:
          </label>
          <input style={{float: "right"}} type="number" name="release" value={input.release} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Image Url:
          </label>
          <textarea style={{float: "right"}} cols="50" rows="3" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <br/>
        <br/>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
            <button className="btn-success">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default EditGames