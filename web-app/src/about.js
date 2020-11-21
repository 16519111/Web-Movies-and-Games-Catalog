import React, {Component} from 'react';
import './App.css';
import './about.css'
import Picture from "./Picture1.png"

export default class List extends Component {

    render() {
        return (
        <div className="container">
          
          <h2 style={{textAlign: "center"}}>Tentang Saya</h2>
          <div class="row" style={{margin: "auto", display: "flex", justifyContent: "center"}}>
            
          
            <div class="column">
              <div class="card">
                <img src={Picture} alt="Mike" style={{width: "100%", opacity:0.8}}/>
                <div class="container">
                  <h5 style={{marginTop:"10px"}}>Gregorius Dimas Baskara</h5>
                  <p class="title">Mahasiswa Teknik Informatika</p>
                  <p>Tahun Kedua Institut Teknologi Bandung</p>
                  <p>gregdimasbaskara@gmail.com</p>
                  <p><button class="button">Contact</button></p>
                </div>
              </div>
            </div>
          
          </div>
          </div>
        )
      }
    
}