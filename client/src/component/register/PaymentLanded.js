import { Button } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const PaymentLanded = () => {

    const { token } = useParams();

    return(
        <div className='d-flex justify-content-center'>
            <div className='row '>
                <div className='col pt-5'>
                    <h3>Your payment is successfull.</h3>

                    <div className='mt-lg-5'>
                        <h5>To Generate A Ticket Please Click here</h5>
                    </div>

                    <div className='mt-2 d-flex justify-content-center'>
                        
                        <Link to={`/dashboard/qr/${token}`}><Button variant="contained">
                            Genrate Ticket
                        </Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaymentLanded;