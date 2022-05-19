import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";

export default function UpdateMovie() {

    let history = useHistory();
    const { id } = useParams();

    
    const paperStyle={padding:20, height:'auto', width:600, margin:'20px auto'};
    const textStyle={margin:'0px 0px 12px 0px'};
    const btnStyle={margin:'8px 0'};

    useEffect(() => {
        loadMovie();
      }, []);
  
      const loadMovie = async () => {
          const result = await axios.get("http://localhost:5000/movie/get/" + id);
          setMovie(result.data);
      }

    const [movie, setMovie] = useState({
        name: "",
        description: "",
        cast: "",
        showTime: ""
    });

    const { name, description, cast, showTime } = movie;

    const onInputChange = e => {
        setMovie({...movie, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();        
        // const valid = formValidation();
        if(true){
            await axios.put('http://localhost:5000/movie/update/' + id, movie).then(() => {
                alert("Movie Updated Successfully");
            }).catch((err) => {
                alert(err);
            })
            history.push("/movie-list");  
        }              
    }

    return(
        
        <Grid>

        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <h2>Update Movie {name}</h2>
          </Grid>
  
          <form onSubmit={onSubmit}>
          <TextField label="Enter Movie Name" type="text" name="name" fullWidth required style={textStyle} value={name}
           onChange={onInputChange} />
           <TextField label="Enter Movie Description" type="text" name="description" fullWidth required style={textStyle} value={description}
           onChange={onInputChange} />
           <TextField label="Enter Cast" type="text" name="cast" fullWidth required style={textStyle} value={cast}
           onChange={onInputChange} />
          <TextField label="Enter Show Time"  type="text" name="showTime" fullWidth required style={textStyle} value={showTime}
           onChange={onInputChange}/>
            {/* {error && <div style={errorMsg}>{error}</div>} */}
          <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>Confirm</Button>
          </form>
  
          
        </Paper>
      </Grid>
    );
}