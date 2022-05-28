import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import {  Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";

const paperStyle={padding:20, height:'auto', width:600, margin:'20px auto'};
const textStyle={margin:'0px 0px 12px 0px'};
const btnStyle={margin:'8px 0'};

export default function AddMovie() {

    let history = useNavigate();
    const { id } = useParams();

    const [movie, setMovie] = useState({
        name: "",
        description: "",
        cast: "",
        showTime: ""
    });

    const onInputChange = (e) => {
        setMovie({...movie, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(movie);
        
       
        try{
    
            if(true){
                await axios.post('http://localhost:5000/movie/add/', movie).then(() => {
                    alert("Movie Added Successfully");
                }).catch((err) => {
                    alert(err);
                })
                window.location = ("/dashboard/movie-store")
            } 
            
            
          }catch(error){
            console.log(error)
          }
        }
        
    
    
    return(
                <Grid>

      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Add a Movie </h2>
        </Grid>

        <form onSubmit={onSubmit}>
        <TextField label="Enter Movie Name" type="text" name="name" fullWidth required style={textStyle} value={movie.name}
         onChange={onInputChange} />
         <TextField label="Enter Movie Description" type="text" name="description" fullWidth required style={textStyle} value={movie.description}
         onChange={onInputChange} />
         <TextField label="Enter Cast" type="text" name="cast" fullWidth required style={textStyle} value={movie.cast}
         onChange={onInputChange} />
        <TextField label="Enter Show Time"  type="text" name="showTime" fullWidth required style={textStyle} value={movie.showTime}
         onChange={onInputChange}/>
          {/* {error && <div style={errorMsg}>{error}</div>} */}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>Confirm</Button>
        </form>

        
      </Paper>
    </Grid>
    );
}