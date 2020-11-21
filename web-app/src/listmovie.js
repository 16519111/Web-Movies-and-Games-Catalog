import React, {useState, useEffect} from "react"
import axios from "axios"
import "./App.css"
import "./bootstrap.css"
import { Link } from "react-router-dom";
import { Dialog, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core/"
import DeleteIcon from "@material-ui/icons/Delete";
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Tooltip from '@material-ui/core/Tooltip';

const EditMovies = () => {
  
  const [movies, setMovies] =  useState(null)
  const [input, setInput]  =  useState({
    title: "",
    description: "",
    year: 2020,
    duration: 120,
    genre: "",
    rating: 0
  })

  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const [search, setSearch] = useState("")
  const [open, setOpen] = useState(false)
  const [openConfirmation, setOpenConfirmation] = useState(false)
  
  function sortTable(attribute){
    let temp = []
    movies.forEach(function(value,index){
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
        for(let j=0;j<movies.length;j++){
            if(movies[j][attribute] === temp[i]){
                if(!temp3.includes(j)){
                    temp2.push(movies[j])
                    temp3.push(j)
                    break
                }

            }
        }
    }
    setMovies(temp2)
    handleCloseDialog()
  }

  function handleOpenDialog(){
      setOpen(true)
  }

  function handleCloseDialog(){
      setOpen(false)
  }

  function handleOpenDialogConfirmation(){
    setOpenConfirmation(true)
  }

  function handleCloseDialogConfirmation(){
    setOpenConfirmation(false)
  }

  useEffect( () => {
    if (movies === null){
      axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
      .then(res => {
          setMovies(res.data.map(el=>{ return {
            id: el.id, 
            title: el.title, 
            description: el.description,
            year: el.year,
            duration: el.duration,
            genre: el.genre,
            rating: el.rating,
            image_url: el.image_url
          }
        }))
      })
    }
  }, [movies])
  
  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newMovies = movies.filter(el => el.id !== itemId)
  
      axios.delete(`https://www.backendexample.sanbersy.com/api/movies/${itemId}`)
      .then(res => {
        console.log(res)
      })
            
      setMovies([...newMovies])
      
    }
    
    const handleEdit = () => {
      let singleMovie = movies.find(x=> x.id === itemId)
      setInput({
        title: singleMovie.title,
        description: singleMovie.description,
        year: singleMovie.year,
        duration: singleMovie.duration,
        genre: singleMovie.genre,
        rating: singleMovie.rating,
        image_url: singleMovie.image_url
      })
      setSelectedId(itemId)
      setStatusForm("edit")
      handleOpenDialogConfirmation()
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

  function truncateString(str, num) {
    if (str === null){
      return ""
    }else{
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + '...'
    }
  }
  

  const submitSearch = (e) =>{
    e.preventDefault()
    axios.get(`https://www.backendexample.sanbersy.com/api/movies`)
    .then(res => {
      let resMovies = res.data.map(el=>{ return {
          id: el.id, 
          title: el.title, 
          description: el.description,
          year: el.year,
          duration: el.duration,
          genre: el.genre,
          rating: el.rating,
          image_url: el.image_url
        }
      })

      let filteredMovies = resMovies.filter(x=> x.title.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      setMovies([...filteredMovies])
    })
 
  }

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

  return(
    <div className="container">

      <h2 style={{textAlign: 'center', marginBottom: "2%"}}>Daftar Film</h2>
      <div style={{display: "flex", justifyContent: "center", marginTop: "2%"}}>
        <form onSubmit={submitSearch}>
          <input type="text" value={search} onChange={handleChangeSearch} />
          <button class="btn-success">Search</button>
          <button class="btn-warning" onClick={handleOpenDialog}>Sort</button>
        </form>
      </div>
      <div style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "center"}}>
        <TableContainer component={Paper} style={{backgroundColor: "transparent"}}>
          <Table style={{width: "100%", marginTop: "3%", backgroundColor: "transparent"}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{color: "white"}}>No</TableCell>
                <TableCell style={{color: "white"}}>Title</TableCell>
                <TableCell style={{color: "white"}}>Description</TableCell>
                <TableCell style={{color: "white"}}>Year</TableCell>
                <TableCell style={{color: "white"}}>Duration</TableCell>
                <TableCell style={{color: "white"}}>Genre</TableCell>
                <TableCell style={{color: "white"}}>Rating</TableCell>
                <TableCell style={{color: "white"}}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {
                movies !== null && movies.map((item, index)=>{
                    return(     
                      <TableRow key={index}>              
                        <TableCell style={{color: "white"}}>{index+1}</TableCell>
                        <TableCell style={{color: "white"}}>{item.title}</TableCell>
                        <TableCell title={item.description} style={{color: "white"}}>{truncateString(item.description, 20)}</TableCell>
                        <TableCell style={{color: "white"}}>{item.year}</TableCell>
                        <TableCell style={{color: "white"}}>{item.duration}</TableCell>
                        <TableCell style={{color: "white"}}>{item.genre}</TableCell>
                        <TableCell style={{color: "white"}}>{item.rating}</TableCell>
                        <TableCell style={{color: "white"}}>
                          <Action itemId={item.id}/>
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
          <Button onClick={() => sortTable("title")}>Title</Button>
          <Button onClick={() => sortTable("year")}>Year</Button>
          <Button onClick={() => sortTable("duration")}>Duration</Button>
          <Button onClick={() => sortTable("genre")}>Genre</Button>
          <Button onClick={() => sortTable("rating")}>Rating</Button>
      </Dialog>
      <Dialog
        fullWidth={true}
        open={openConfirmation}
        onClose={handleCloseDialogConfirmation}
        aria-labelledby="responsive-dialog-title"
      >
        <div style={{backgroundColor: "#1b1e21"}}>
          <h4 style={{color: "white"}}>Do you want to edit this movie? </h4>
          <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
            <Link className="nav-link" to={{pathname: "/movies-form", state: {edit: true, inp: input, select: selectedId, status: statusForm}}} style={{paddingRight:0}}><button className="btn btn-success" style={{color: "white"}}>Yes</button></Link>
            <Link className="nav-link" style={{paddingLeft:"1%"}}><button className="btn btn-danger" style={{color: "white"}} onClick={() => handleCloseDialogConfirmation()}>No</button></Link>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default EditMovies