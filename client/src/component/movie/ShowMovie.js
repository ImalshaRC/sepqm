import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowMovie() {

    let history = useNavigate();
    const { id } = useParams();

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

    const onSubmit = async e => {
        e.preventDefault();        
        // const valid = formValidation();
        if(true){
            await axios.put('http://localhost:5000/movie/update/' + id, movie).then(() => {
                alert("Movie Updated Successfully");
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

                    <table class="payment-table">
                        <tr>
                            <td>
                                Movie Name:{name}<br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Movie Description: {description}<br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Cast: {cast}<br/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Show Time: {showTime}<br/>
                            </td>
                        </tr>                        
                        
                    </table><br/>

                    <center>
                        <table>
                            <tr>
                                <td>
                                    <Link to="/dashboard/movie-store"><button type = "reset" class="button">Back</button></Link>                            
                                </td>
                            </tr>
                        </table>
                    </center> 
                </form>
            </div>
        </>
    );
}