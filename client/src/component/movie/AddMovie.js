import React, { useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddMovie() {

    let history = useHistory();
    const { id } = useParams();

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
            await axios.post('http://localhost:5000/movie/add/', movie).then(() => {
                alert("Movie Added Successfully");
            }).catch((err) => {
                alert(err);
            })
            history.push("/");  
        }              
    }

    // const formValidation = () =>{
  
    //     let isValid = true;

    //     if(pID.trim().length === 0){
    //         toast.error("Please insert color");
    //         isValid = false;
    //     }
    //     else if(pName.trim().length === 0){
    //         toast.error("Please insert size");
    //         isValid = false;
    //     }
    
    //     else if(category.trim().length === 0){
    //         toast.error("Please insert quantity");
    //         isValid = false;
    //     }

    //     else if(price.trim().length === 0){
    //         toast.error("Please insert quantity");
    //         isValid = false;
    //     }

    //     else if(size.trim().length === 0){
    //         toast.error("Please insert quantity");
    //         isValid = false;
    //     }

    //     else if(status.trim().length === 0){
    //         toast.error("Please insert quantity");
    //         isValid = false;
    //     }

    //     else if(quantity.trim().length === 0){
    //         toast.error("Please insert quantity");
    //         isValid = false;
    //     }

    //     else if(color.trim().length === 0){
    //         toast.error("Please insert quantity");
    //         isValid = false;
    //     }

    //     else if(date.trim().length === 0){
    //         toast.error("Please insert quantity");
    //         isValid = false;
    //     } 
  
    //     return isValid;
    //   }

    return(
        
        <>
            
            <div class="product-include">
            
                <form onSubmit={e => onSubmit(e)}>

                    <ToastContainer style={{ width: "450px", textAlign: 'center', fontSize: '17px', fontFamily: 'fantasy' }}
                        position="top-center"
                        theme='light'
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        limit={1}
                    />

                    <br/><center><h3>Add Movie</h3></center>

                    <table class="payment-table">
                        <tr>
                            <td>
                                Movie Name
                                <input type="text" name="name" value={name} placeholder="Enter Code" onChange={ e => onInputChange(e)}/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Movie Description
                                <input type="text" name="description" value={description} placeholder="Enter Product Name" onChange={ e => onInputChange(e)}/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Cast
                                <input type="text" name="cast" value={cast} placeholder="Enter Price" onChange={ e => onInputChange(e)}/><br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Show Time
                                <input type="text" name="showTime" value={showTime} placeholder="Enter Your Color" onChange={ e => onInputChange(e)}/><br/>
                            </td>
                        </tr>                        
                        
                    </table><br/>

                    <center>
                        <table>
                            <tr>
                                <td>
                                    <button type = "reset" class="button">Reset</button>                            
                                </td>
                                <td>
                                    <button type = "submit" onclick="" class="button">Confirm</button>
                                </td>
                            </tr>
                        </table>
                    </center> 
                </form>
            </div>
        </>
    );
}