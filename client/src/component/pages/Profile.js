import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Button, FormControl, Grid, InputLabel, Paper, Select, TextField, Typography } from "@mui/material";

const paperStyle={padding:20, height:'auto', width:600, margin:'20px auto'};
const textStyle={margin:'0px 0px 12px 0px'};
const btnStyle={margin:'8px 0'};

export default function Profile() {

    const { id } = useParams();

    const [user, setUser] = useState({
        userName: "",
        email: "",
        phone: "",
        role: ""
      });

    const { userName, email, phone, role } = user;

    useEffect(() => {
        loadUser();
      }, []);
  
    const loadUser = async () => {
        const result = await axios.get("http://localhost:5000/user/get/" + localStorage.getItem("userID"));
        console.log(result);
        setUser(result.data);
    }

    const onInputChange = e => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const onSubmit = async e => {
        e.preventDefault();     
        if(true){
            await axios.put('http://localhost:5000/user/update/' + localStorage.getItem("userID"), user).then(() => {
                alert("User Updated Successfully");
            }).catch((err) => {
                alert(err);
            }) 
            window.location = "/dashboard/profile";
        }              
    }

    return(
        // <div class="customer-profile">
        //     <form>

        //         <ToastContainer style={{ width: "450px", textAlign: 'center', fontSize: '17px', fontFamily: 'fantasy' }}
        //             position="top-center"
        //             theme='light'
        //             autoClose={5000}
        //             hideProgressBar={false}
        //             newestOnTop={false}
        //             closeOnClick
        //             rtl={false}
        //             pauseOnFocusLoss
        //             draggable
        //             pauseOnHover
        //             limit={1}
        //         />

        //         <br/><br/><center><h3>Customer Profile</h3></center><br/>

        //         <center>
        //         <table class="payment-table">
        //             <tr>
        //                 <td>
        //                     User Name
        //                     <input type="text" name="userName" value={userName}/>
        //                 </td>
        //             </tr>
        //             <tr>
        //                 <td>
        //                     E-mail
        //                     <input type="text" name="email" value={email}/>
        //                 </td>                        
        //             </tr>         
        //             <tr>
        //                 <td>
        //                     Phone
        //                     <input type="text" name="phone" value={phone}/>
        //                 </td>                        
        //             </tr> 
        //             <tr>
        //                 <td>
        //                     Role
        //                     <input type="text" name="role" value={role}/>
        //                 </td>                        
        //             </tr>          
        //         </table><br/>
        //         </center>

        //         <center>
        //             {/* <table>
        //                 <tr>
        //                     <td>
        //                         <Link to={`/section/update-customer/${id}`}><button type = "submit" class="button">Go To Update</button></Link>
        //                     </td>
        //                 </tr>
        //             </table> */}
        //         </center> 
        //     </form>
        // </div>

       


<div>
        <Grid>

      <Paper elevation={10} style={paperStyle}>
        <Grid align='center'>
          <h2>Profile </h2>
        </Grid>

        <form onSubmit={e => onSubmit(e)}>
        <TextField label="User Name" type="text" name="userName" value={userName} fullWidth required style={textStyle} onChange={ e => onInputChange(e)} />
        <TextField label="E-mail" type="text" name="email" value={email} fullWidth required style={textStyle} />
        <TextField label="Phone"  type="text" name="phone" value={phone} fullWidth required style={textStyle} onChange={ e => onInputChange(e)} />
        <TextField label="Role"  type="text" name="role" value={role} fullWidth required style={textStyle} />
          
        <Button type="submit" color="primary" variant="contained" fullWidth style={btnStyle}>Update Customer</Button>
        </form>

        
      </Paper>
    </Grid>

    </div>


    
    );
}