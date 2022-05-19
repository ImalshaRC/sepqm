import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

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

    let history = useHistory();

    const goToAddMovie = () => {
        history.push("/add-movie");
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

            <Dialog
                open={open}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Are you sure you want to delete this?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Please confirm Here
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={deleteMovie} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>

            <div className="searchPanel">
                <div className="searchPanel_addNew">
                <div className="d-flex">
                    <button className="newCustomer_btn" onClick={goToAddMovie}>
                        Add Payment
                    </button>
                    {/* <button onClick={goToProductSummary} className="newCustomer_btn mx-4">
                        Product Summary
                    </button>                     */}
                </div>
                </div>
                <form className="searchBar">
                <input type="text" onChange={ e => handlesearchArea(e.target.value)} placeholder="Search here..."/>
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </form>
            </div>

            <i></i>
            <div className="tableContent">

            {/* <div> */}

            <table id="table">
        <thead>
            <tr>
                <th scope="col">Index No</th>
                <th scope="col">card No</th>
                <th scope="col">Amount</th>
                <th scope="col">cvc No</th>
                <th scope="col">Holder Name</th>            
                {/* <th scope="col">action</th> */}
            </tr>
        </thead>
        <tbody>
    {
        payments.map((payment, index) => (
            <tr>
                <center><td >{index + 1}</td></center>
                <td><center>{payment.cardNo}</center></td>   
                <td><center>{payment.amount}</center></td>
                <td><center>{payment.cvcNo}</center></td>
                <td><center>{payment.holderName}</center></td>            
                {/* <td scope="col"><center>
                    <Link to={`/update-movie/${movie._id}`}><button class="table_btns">Update</button></Link>&nbsp;
                    <button onClick={() => {handleClickOpen(movie._id)}} class="table_btns">Delete</button></center>
                </td> */}
            </tr> 
        ))
    }
  </tbody>
</table>
{/* </div> */}
</div>
    {payments.length === 0 && <span>no records found to display</span>}
        </div>
    )
}