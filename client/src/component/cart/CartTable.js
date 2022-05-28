import { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';

const columns = [
  { field: '_id', headerName: 'CartID', width: 240 },
  { field: 'email', headerName: 'E-mail', width: 200 },
  { field: 'name', headerName: 'Movie Name', width: 200 },
  { field: 'showTime', headerName: 'Show Time', width: 200 },
  { field: 'theatre', headerName: 'Theatre', width: 200 },
  { field: 'payment', headerName: 'Payment', width: 100 },
  {
    headerName:"Update Theatre",
    field: "Edit",
    width: 150,
    renderCell: (cellValues) => {
      return (
        <div>
            <Link to={`/dashboard/cart/update-cart/${cellValues.row._id}`}>
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            // updateUpUser(event, cellValues.row.role,cellValues.row._id);
            // console.log(cellValues.row._id)
          }}>
              Update
        </Button></Link>
        </div>

      );
    }
  }
  ,{
    headerName:"Make Payment",
    width: 120,
    renderCell: (cellValues) => {
      return (
        <Link to={`/dashboard/add-payment/${cellValues.row.payment}/?cartID=${cellValues.row._id}`}>
          <Button variant="contained" color="error" style={{ textDecoration: 'none' }}>
            Payment
          </Button>
        </Link>
      );
    }
  }

];

function CartTable() {

    // const [count, setCount] = useState(0);

    // var netCount = 0;

    // const makePayment = () => {
    //     netCount = 0;
    //     tableData.map((data) => {
    //         netCount += data.payment;            
    //     })
    //     window.location = ("/dashboard/add-payment/" + netCount);
    // }

    

  const [tableData, setTableData] = useState([])

  useEffect(()=>{
    loadPayment();
  },[])

  const loadPayment =() =>{
    axios.get("http://localhost:5000/cart/").then((res) => 
    setTableData((res.data)))

  }

  



    

  return (
      <div>
          <hr/>
          
          <center><h3>My Cart</h3></center>
      <center>
    <div style={{ height: 450, width: '95%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
      {/* <Link to={`/dashboard/add-payment/?amount=`}> */}
        {/* <Button
          variant="contained"
          className='float-start mt-4'
          color="primary"
          onClick={() => {
            makePayment()
          }}>
              Make Payment
        </Button> */}
        {/* </Link> */}
      
    </div></center>

    
    </div>
  );
}

export default CartTable;