import React, { Component } from 'react';
import axios from 'axios'
import "./bootstrap.css"
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { Grid, Dialog } from "@material-ui/core/"

export default class Index extends Component{
    constructor(props){
        super(props)
        this.state = {
            daftarFilm: [],
            cek: 2,
            open: false,
            value: null
        };
    }

    componentDidMount(){
        let temp = this.state.daftarFilm
        let tampung = []
        axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
        .then(res => {
            tampung = res.data
            console.log(tampung)
            this.setState({daftarFilm: tampung, cek:true})
        })
        tampung.forEach((el)=>{ temp.push({id: el.id, created_at: el.created_at, updated_at: el.updated_at, title: el.title, description: el.description,
            year: el.year, duration: el.duration, genre: el.genre, rating: el.rating, review: el.review, image_url: el.image_url })}); 
        console.log(temp)
        console.log(tampung[0])
    }

    handleOpenDialog(i){
        this.setState({value: i}, () => { 
            this.setState({open: true}) 
        });
    }
  
    handleCloseDialog(){
        this.setState({open: false})
        this.setState({value: null})
    }  
    
    
    render(){
        return (
            <div className="container">
                    <h2 className="modal-title" style={{marginBottom: "3%", display: "flex", justifyContent: "center"}}>MOVIE RELEASES</h2>
                    <p style={{textAlign: "center", fontStyle: "italic"}}>Last Updated : 24 October 2020</p>
                    <Grid container justify="center" style={{display: "flex"}}>
                        
                    {
                        this.state.daftarFilm.map((value,index) => {
                            return (
                                <Grid item md={5} className="article" justify="center" alignItems="stretch" direction="row">
                                    {(this.state.value === null ? null :
                                    <Dialog
                                        fullWidth={true}
                                        open={this.state.open}
                                        onClose={this.handleCloseDialog.bind(this)}
                                        aria-labelledby="responsive-dialog-title"
                                        maxWidth="md"
                                    >
                                        <div style={{backgroundColor: "black"}}>
                                            <div class="card mb-3" style={{backgroundColor: "#1b1e21"}}>
                                                <div style={{display: "flex", alignItems: "flex-start", flexDirection:"row", margin: "2%"}}>
                                                    <Grid container direction="row" spacing={2}>
                                                        <Grid item md={5}>
                                                            <div style={{background: "linear-gradient(#000000, #000000)", position: "absolute", width: "400px", height: "auto"}}></div>
                                                            <img style={{height: "450px", width: "100%", borderRadius: "5px", objectFit: "cover", opacity:1}} src={this.state.daftarFilm[this.state.value].image_url} alt="Card"/>
                                                        </Grid>
                                                        <Grid item md={7}>
                                                            <div style={{marginLeft: "2.5%", display: "flex", justifyContent: "space-between", flexDirection: "column"}}>
                                                                <div style={{display:"flex", justifyContent: "flex-end"}}>
                                                                    <button type="button" class="btn btn-primary" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                        {this.state.daftarFilm[this.state.value].genre}                                            
                                                                    </button>
                                                                </div>
                                                                <h4 style={{color: "white", marginTop: "4%"}}>{this.state.daftarFilm[this.state.value].title}</h4>
                                                                <hr style={{backgroundColor: "#666666", color: "#666666", width: "100%"}}/>
                                                                <p style={{textAlign: "left", color: "#878787"}}>{this.state.daftarFilm[this.state.value].description}</p>
                                                                
                                                                <div style={{display: "flex", flexDirection: "row"}}>
                                                                    <button type="button" class="btn btn-outline-warning" style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                                                                        <StarRoundedIcon/>
                                                                        {value.rating}                                            
                                                                    </button>
                                                                    <button type="button" class="btn btn-outline-danger" style={{display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "10px"}}>
                                                                        <QueryBuilderRoundedIcon/>
                                                                        {value.duration}                                            
                                                                    </button>
                                                                    <button type="button" class="btn btn-outline-success" style={{display: "flex", alignItems: "center", justifyContent: "center", marginLeft: "10px"}}>
                                                                        <EventNoteIcon/>
                                                                        {value.year}                                            
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </Grid>
                                                    </Grid>
                                                </div>
                                            </div>    
                                        </div>                     
                                    </Dialog>
                                    )}
                                    <div class="row" style={{display: "flex", justifyContent: "center", flexDirection: "row", alignItems: "stretch"}}>
                                        <div style={{padding: "10%"}}>
                                        <div class="card">
                                            <img style={{height: "300px", width: "100%", borderRadius: "5px", objectFit: "cover"}} src={value.image_url} alt="Card"/>
                                            <div class="container">
                                            <h5 style={{marginTop:"10px"}}>{value.title}</h5>
                                            <p class="title">{value.genre} </p>
                                            <p><button class="button" onClick={() => this.handleOpenDialog.bind(this)(index)}>Details</button></p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                
                                </Grid>
                                
                            )
                      })
                      
                    }
                    
                </Grid>  
            </div>
        );
    }
}