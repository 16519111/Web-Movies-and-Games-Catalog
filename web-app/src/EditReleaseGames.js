import React, {useState, useEffect} from "react"
import axios from "axios"
import "./App.css"
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { Dialog, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core/"

const EditGames = () => {
  
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
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false)

  useEffect( () => {
    if(statusForm === "edit"){
      setOpenConfirmation(true)
    }
    else{
      setOpenConfirmation(false)
    }
  }, [statusForm])

  useEffect(() => {
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
  
  function sortTable(attribute){
    let temp = []
    games.ForEach(function(value,index){
        temp.push(value[attribute])
        if(attribute === "rating" || attribute === "duration" || attribute === "year"){
            temp.sort((a, b) => a - b);
        }
        else{
            temp.sort()
        }
        console.log(temp)
    })                                
    console.log(temp)
    let temp2 = [];
    let temp3 = []
    for(let i=0;i<temp.length;i++){
        for(let j=0;j<games.length;j++){
            if(games[j][attribute] === temp[i]){
                if(!temp3.includes(j)){
                    temp2.push(games[j])
                    temp3.push(j)
                    break
                }

            }
        }
    }
    setGames(temp2)
    handleCloseDialog()
  }

  function handleOpenDialog(){
      setOpen(true)
  }

  function handleCloseDialog(){
      setOpen(false)
  }

  function handleCloseDialogConfirmation(){
    setStatusForm("create")
    setOpenConfirmation(false)
  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newGames = games.filter(el => el.id !== itemId)
  
      axios.delete(`https://backendexample.sanbersy.com/api/games/${itemId}`)
      .then(res => {
        console.log(res)
      }).catch((response) => console.log('error', response));
            
      setGames([...newGames])
      
    }
    
    const handleEdit = () =>{
      let singleGame = games.find(x=> x.id === itemId)
      setInput({
        name: singleGame.name, 
        singlePlayer: singleGame.singlePlayer,
        multiplayer: singleGame.multiplayer,
        platform: singleGame.platform,
        genre: singleGame.genre,
        release: singleGame.release,
        image_url: singleGame.image_url
      })
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{marginRight: "3%"}}>
        <Tooltip title="Edit">
          <button onClick={handleEdit} className="btn btn-warning" style={{ padding: "5px", borderRadius: "100%"}}><EditRoundedIcon style={{maxWidth: "20px"}}/></button>
        </Tooltip>
        </div>
        <div>
        <Tooltip title="Hapus">
          <button onClick={handleDelete} className="btn btn-danger" style={{padding: "5px", borderRadius: "100%"}}><DeleteIcon/></button>
        </Tooltip>
        </div>   
      </div>
    )
  }

  const submitSearch = (e) =>{
    e.preventDefault()
    axios.get(`https://backendexample.sanbersy.com/api/games`)
    .then(res => {
      let resGames = res.data.map(el=>{ return {
            id: el.id, 
            name: el.name, 
            singlePlayer: el.singlePlayer,
            multiplayer: el.multiplayer,
            platform: el.platform,
            genre: el.genre,
            release: el.release,
            image_url: el.image_url
        }
      })

      let filteredGames = resGames.filter(x=> x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      setGames([...filteredGames])
    })
    
 
  }

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

  return(
    <div className="container">
      <h2 style={{textAlign: "center", marginBottom: "2%"}}>List Of Games</h2>
      <div style={{display: "flex", justifyContent: "center", marginTop: "2%"}}>
        <form onSubmit={submitSearch}>
          <input type="text" value={search} onChange={handleChangeSearch} />
          <button class="btn-success">Search</button>
          <button class="btn-warning" onClick={handleOpenDialog}>Sort</button>
        </form>
      </div>
      <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
        <TableContainer component={Paper} style={{backgroundColor: "transparent"}}>
          <Table style={{width: "100%", marginTop: "3%", backgroundColor: "transparent"}} aria-label="simple table">
            <TableHead>
              <TableRow>   
                <TableCell style={{color: "white"}}>No</TableCell>
                <TableCell style={{color: "white"}}>Name</TableCell>
                <TableCell style={{color: "white"}}>Genre</TableCell>
                <TableCell style={{color: "white"}}>Single&nbsp;Player</TableCell>
                <TableCell style={{color: "white"}}>Multi&nbsp;Player</TableCell>
                <TableCell style={{color: "white"}}>Platform</TableCell>
                <TableCell style={{color: "white"}}>Release</TableCell>
                <TableCell style={{color: "white"}}>Action</TableCell>
              </TableRow> 
            </TableHead>
            <TableBody>

                {
                games !== null && games.map((item, index)=>{
                    return(                    
                      <TableRow key={index}>  
                        <TableCell style={{color: "white"}}>{index+1}</TableCell>
                        <TableCell style={{color: "white"}}>{item.name}</TableCell>
                        <TableCell style={{color: "white"}}>{item.genre}</TableCell>
                        <TableCell style={{color: "white"}}>{item.singlePlayer===1?"Yes":"No"}</TableCell>
                        <TableCell style={{color: "white"}}>{item.multiplayer===1?"Yes":"No"}</TableCell>
                        <TableCell style={{color: "white"}}>{item.platform}</TableCell>
                        <TableCell style={{color: "white"}}>{item.release}</TableCell>
                        <TableCell style={{color: "white"}}>
                          <Action itemId={item.id} />
                        </TableCell>
                      </TableRow> 
                    )
                })
                }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
          <h4 style={{color: "black"}}>Sort By : </h4>
          <Button onClick={() => sortTable("name")}>Name</Button>
          <Button onClick={() => sortTable("genre")}>Genre</Button>
          <Button onClick={() => sortTable("platform")}>Platform</Button>
          <Button onClick={() => sortTable("release")}>Release</Button>
      </Dialog>
      <Dialog
        fullWidth={true}
        open={openConfirmation}
        onClose={handleCloseDialogConfirmation}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{backgroundColor: "#1b1e21"}}>
          <h4 style={{color: "white"}}>Do you want to edit this game? </h4>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
            <Link className="nav-link" to={{pathname: "/Edit-Game-form", state: {edit: true, inp: input, select: selectedId, status: statusForm}}} style={{paddingRight:0}}><button className="btn btn-success" style={{color: "white"}}>Yes</button></Link>
            <Link className="nav-link" style={{paddingLeft:"1%"}}><button className="btn btn-danger" style={{color: "white"}} onClick={() => handleCloseDialogConfirmation()}>No</button></Link>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default EditGames