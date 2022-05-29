import { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';

const columns = [
  { field: '_id', headerName: 'PaymentID', width: 240 },
  { field: 'cardNo', headerName: 'Card No', width: 200 },
  { field: 'cvcNo', headerName: 'CVC No', width: 200 },
  { field: 'holderName', headerName: 'Holder Name', width: 200 },
  { field: 'amount', headerName: 'Amount', width: 200 },
  { field: 'noOfTicket', headerName: 'Number Of Ticket', width: 200 },
  { field: 'verify', headerName: 'Verify Ticket', width: 200 },

];

function PaymentTable() {
    

  const [tableData, setTableData] = useState([])

  useEffect(()=>{
    loadPayment();
  },[])

  const loadPayment =() =>{
    axios.get("http://localhost:5000/payment/").then((res) => 
    setTableData((res.data)))

  }




    

  return (
      <div>
          <hr/>
          
          <center><h3>Payment Table</h3></center>
      <center>
    <div style={{ height: 450, width: '95%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

      <Link to={`/dashboard/movie-store/cart-table`}>
        <Button
          variant="contained"
          className='float-start mt-4'
          color="primary"
          >
              Go To My Cart
        </Button>
        </Link>
    </div></center>
    </div>
  );
}

export default PaymentTable;