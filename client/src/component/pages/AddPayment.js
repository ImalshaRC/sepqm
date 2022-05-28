import React, { useState } from "react";
import axios from 'axios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import {  Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";

const paperStyle={padding:20, height:'auto', width:600, margin:'20px auto'};
const textStyle={margin:'0px 0px 12px 0px'};
const btnStyle={margin:'8px 0'};

export default function AddPayment() {

    const search = useLocation().search;

    let history = useNavigate();
    const { id } = useParams();

    const [payment, setPayment] = useState({
        cardNo: "",
        cvcNo: "",
        holderName: "",
        noOfTicket: 1,
        amount: id,
        cartID: new URLSearchParams(search).get('cartID')
    });

    payment.amount =  id * payment.noOfTicket;

    const onInputChange = (e) => {
      setPayment({...payment, [e.target.name]: e.target.value});
    }

    

    console.log(payment.amount);

    const onSubmit = async (e) => {
        e.preventDefault();        
       
        try{
    
            if(true){
                await axios.post('http://localhost:5000/payment/add/', payment).then(() => {
                    alert(payment.holderName + " Please check your E-mail and verify it.");
                }).catch((err) => {
                    alert(err);
                })
                window.location = ("/dashboard/movie-store/cart-table");
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
         <TextField label="Enter CVC No" type="text" name="cvcNo" fullWidth required style={textStyle} value={payment.cvcNo}
         onChange={onInputChange} />
        <TextField label="Enter Card Holder's Name"  type="text" name="holderName" fullWidth required style={textStyle} value={payment.holderName}
         onChange={onInputChange}/>
         <TextField label="Enter Ticket Quantity"  type="text" name="noOfTicket" fullWidth required style={textStyle} value={payment.noOfTicket}
         onChange={onInputChange}/>
         <TextField label="Enter Payment Amount" type="text" name="amount" fullWidth required style={textStyle} value={id * payment.noOfTicket}
          />
          {/* {error && <div style={errorMsg}>{error}</div>} */}
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>Confirm</Button>
        </form>

        
      </Paper>
    </Grid>
    );
}