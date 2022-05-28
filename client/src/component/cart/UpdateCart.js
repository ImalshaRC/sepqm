import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Button, Grid, Link, Paper, TextField, Typography } from "@mui/material";

export default function UpdateCart() {

    let history = useNavigate();
    const { id } = useParams();

    
    const paperStyle={padding:20, height:'auto', width:600, margin:'20px auto'};
    const textStyle={margin:'0px 0px 12px 0px'};
    const btnStyle={margin:'8px 0'};

    useEffect(() => {
        loadCart();
      }, []);
  
      const loadCart = async () => {
          const result = await axios.get("http://localhost:5000/cart/get/" + id);
          setCart(result.data);
      }

    const [cart, setCart] = useState({
        email: "",
        name: "",
        theatre: "",
        showTime: ""
    });

    const { email, name, theatre, showTime } = cart;

    const onInputChange = e => {
        setCart({...cart, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();        
        // const valid = formValidation();
        if(true){
            await axios.put('http://localhost:5000/cart/update/' + id, cart).then(() => {
                alert("Cart Updated Successfully");
                window.location = "/dashboard/cart";
            }).catch((err) => {
                alert(err);
            })
            history.push("/cart-list");  
        }              
    }

    return(

        <Grid>

        <Paper elevation={10} style={paperStyle}>
          <Grid align='center'>
            <h2>Update theatre</h2>
          </Grid>
  
          <form onSubmit={onSubmit}>
          <TextField label="Name" type="text" name="name" fullWidth required style={textStyle} value={name}
            />
           <TextField label="email" type="text" name="email" fullWidth required style={textStyle} value={email}
            />
           <TextField label="Edit theatre" type="text" name="theatre" fullWidth required style={textStyle} value={theatre}
           onChange={onInputChange} />
          <TextField label="Show Time"  type="text" name="showTime" fullWidth required style={textStyle} value={showTime}
           />
            {/* {error && <div style={errorMsg}>{error}</div>} */}
          <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>Confirm</Button>
          </form>
  
          
        </Paper>
      </Grid>
    );
}