import React, { useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import {  Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";

const paperStyle={padding:20, height:'auto', width:600, margin:'20px auto'};
const textStyle={margin:'0px 0px 12px 0px'};
const btnStyle={margin:'8px 0'};

export default function AddPayment() {

    let history = useNavigate();
    const { id } = useParams();

    const [payment, setPayment] = useState({
        cardNo: "",
        amount: "",
        cvcNo: "",
        holderName: ""
    });

    const onInputChange = (e) => {
      setPayment({...payment, [e.target.name]: e.target.value});
    }

    const onSubmit = async (e) => {
        e.preventDefault();        
       
        try{
    
            if(true){
                await axios.post('http://localhost:5000/payment/add/', payment).then(() => {
                    alert("Payment Added Successfully");
                }).catch((err) => {
                    alert(err);
                })
                history.push("/movie-store");  
            } 
            
          }catch(error){
            console.log(error)
          }
        }
    
    return(
                <Grid>

      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Payment Form</h2>
        </Grid>

        <form onSubmit={onSubmit}>
        <TextField label="Enter Credit Card No" type="text" name="cardNo" fullWidth required style={textStyle} value={payment.cardNo}
         onChange={onInputChange} />
         <TextField label="Enter Payment Amount" type="text" name="amount" fullWidth required style={textStyle} value={payment.amount}
         onChange={onInputChange} />
         <TextField label="Enter CVC No" type="text" name="cvcNo" fullWidth required style={textStyle} value={payment.cvcNo}
         onChange={onInputChange} />
        <TextField label="Enter Card Holder's Name"  type="text" name="holderName" fullWidth required style={textStyle} value={payment.holderName}
         onChange={onInputChange}/>
          {/* {error && <div style={errorMsg}>{error}</div>} */}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>Confirm</Button>
        </form>

        
      </Paper>
    </Grid>
    );
}