import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {  Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";

const paperStyle={padding:20, height:'auto', width:600, margin:'20px auto'};
const textStyle={margin:'0px 0px 12px 0px'};
const btnStyle={margin:'8px 0'};






export default function AddCart() {
    const search = useLocation().search;

    const [uEmail, SetuEmail] = useState([]);

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("userID");
        // const loggedInUserId = localStorage.getItem("userId");
        // const uEmail = (JSON.parse(loggedInUser));
        // SetuEmail(uEmail);

        if (!loggedInUser){
        window.location = "/signin"
        }else{

        }

        
    },[])


    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [name, setName] = useState(new URLSearchParams(search).get('name'));
    const [showTime, setShowTime] = useState(new URLSearchParams(search).get('showTime'));
    const [theatre, setTheatre] = useState("");


    // console.log(mName)
    // console.log(mShowTime)


    function sendData(e){
        e.preventDefault();
        
        const newCart={

            email,
            name,
            showTime,
            theatre    
        }

        axios.post('http://localhost:5000/cart/add/', newCart).then(() => {
                    alert("Cart Added Successfully");
                    console.log("1");

                }).catch((err)=>{
                    alert(err)
                    console.log("2");
                })
                    
                }

    
    return(
                <Grid>

      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Add a Cart </h2>
        </Grid>

        <form onSubmit={sendData}>
        <TextField label="Enter Email" type="text" name="email" value={email} fullWidth required style={textStyle} />
        <TextField label="Movie Name" type="text" name="name" value={name} fullWidth required style={textStyle} />
         <TextField label="Enter Theatre" type="text" name="theatre" fullWidth required style={textStyle} 
         onChange={(e)=>{ setTheatre(e.target.value) }} />
         
         {/* <TextField label="Enter Email" type="text" name="email" value={uEmail} fullWidth required style={textStyle} /> */}
        <TextField  type="text" name="showTime" value={showTime} fullWidth required style={textStyle} />
          {/* {error && <div style={errorMsg}>{error}</div>} */}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>Add To Cart</Button>
        </form>

        
      </Paper>
    </Grid>
    );  
}