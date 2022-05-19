import axios from "axios";
import {React, useEffect} from "react";
import {  useParams } from 'react-router-dom';

const VerifyPayment = () => {

    const { token } = useParams();

    useEffect(async () => {            
        try{
            await axios.post('http://localhost:5000/payment/verify/' + token).then(() => {
                window.location.href = "/payment-landed";
            }) 
        }
        catch(err){
            console.log(err)
        }            
    })

    return(
        <div>
            
        </div>
    )
}

export default VerifyPayment;