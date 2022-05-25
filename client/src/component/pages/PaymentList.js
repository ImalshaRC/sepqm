import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import PaymentTable from './PaymentTable'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function PaymentList() {

    const [payments, setPayment] = useState([]);
    useEffect(() => {
        loadPayment();
    }, []);

    const loadPayment = async() => {
        const result = await axios.get('http://localhost:5000/payment/');
        setPayment(result.data.reverse());
    }

    const [searchText, setSearchText] = useState('');


    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);   
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            loadPayment();
        }
        else{      
            const filteredData = payments.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setPayment(filteredData);
        }
    }

    let history = useNavigate();

    const goToAddPayment = () => {
        history.push("/add-payment");
    }

    const  [movieID, setMovieID] = useState("");

    const [open, setOpen] = useState(false); 

    const handleClickOpen = (id) => {
        setOpen(true);
        setMovieID(id);
    };
  
    const onCancel = () => {
        setOpen(false);
    };

    const deleteMovie = async () => {
        await axios.delete("http://localhost:5000/movie/delete/" + movieID);
        loadPayment();
        setOpen(false);
    }

    return(
        <div>
            <Button variant="contained" color="primary" onClick={goToAddPayment}> Add Payment</Button>
            <PaymentTable/>


            
</div>
    )
}