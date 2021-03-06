import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {  Button, FormControl, Grid, InputLabel, Link, Paper, Select, TextField, Typography } from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';

const paperStyle={padding:20, height:'auto', width:600, margin:'20px auto'};
const textStyle={margin:'0px 0px 12px 0px'};
const btnStyle={margin:'8px 0'};


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  
}));



export default function AddCart() {
    const search = useLocation().search;

    const classes = useStyles();

    const [uEmail, SetuEmail] = useState([]);

    useEffect(()=>{
        const loggedInUser = localStorage.getItem("userID");
        // const loggedInUserId = localStorage.getItem("userId");
        // const uEmail = (JSON.parse(loggedInUser));
        // SetuEmail(uEmail);

        if (!loggedInUser){
          window.location = "/signin";
        }else{

        }

        
    },[])


    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [name, setName] = useState(new URLSearchParams(search).get('name'));
    const [showTime, setShowTime] = useState(new URLSearchParams(search).get('showTime'));
    const [theatre, setTheatre] = useState("");
    const [payment, setPayment] = useState(500);

    console.log(theatre)
    console.log(payment)

    function sendData(e){

      if(theatre === 'jothi'){
        setPayment(300);
      }else if(theatre === 'liberty'){
        setPayment(400);
      }else if(theatre === 'elphinstone'){
        setPayment(420);
      }else if(theatre === 'majestic'){
        setPayment(370);
      }else if(theatre === 'prince'){
        setPayment(400);
      }else if(theatre === 'regal'){
        setPayment(500);
      }

      e.preventDefault();
      const newCart={
        email,
        name,
        showTime,
        theatre,
        payment
      }

      axios.post('http://localhost:5000/cart/add/', newCart).then(() => {
          alert("Cart Added Successfully");
          window.location = ("/dashboard/movie-store/cart-table");
        }).catch((err)=>{
            alert(err);
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
         {/* <TextField label="Enter Theatre" type="text" name="theatre" fullWidth required style={textStyle} 
         onChange={(e)=>{ setTheatre(e.target.value) }} /> */}


        <Grid item xs={12} className='mb-3'>
          <FormControl fullWidth variant="outlined" className={classes.formControl}>
            <InputLabel htmlFor="filled-age-native-simple">Theatre</InputLabel>

            <Select native name="theatre" value={theatre} onChange={ e => setTheatre(e.target.value)}>
              <option aria-label="None" />
              <option value="jothi">Jothi Theatre</option>
              <option value="liberty">Liberty Theatre</option>
              <option value="elphinstone">Elphinstone Theatre</option>
              <option value="majestic">Majestic Cinema</option>
              <option value="prince">Prince Cinema</option>
              <option value="regal">Regal Cinema</option>
            </Select>
          </FormControl>
        </Grid>
         
         {/* <TextField label="Enter Email" type="text" name="email" value={uEmail} fullWidth required style={textStyle} /> */}
        <TextField  type="text" name="showTime" value={showTime} fullWidth required style={textStyle} />
          {/* {error && <div style={errorMsg}>{error}</div>} */}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>Add To Cart</Button>
        </form>

        
      </Paper>
    </Grid>
    );  
}