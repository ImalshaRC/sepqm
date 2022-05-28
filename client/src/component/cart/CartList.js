import { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';




// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const updateUpUser= (event,userId) =>{
    console.log("Pressed Up")
}

const updateDownUser= (event,userId) =>{
console.log("Pressed Down")
}

const columns = [
  { field: '_id', headerName: 'CartID', width: 240 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'name', headerName: 'Movie Name', width: 200 },
  { field: 'theatre', headerName: 'Theatre', width: 200 },
  { field: 'showTime', headerName: 'Show Time', width: 200 },
  {
    headerName:"Update Cart",
    field: "Edit",
    width: 150,
    renderCell: (cellValues) => {
      return (
        <div>
            <Link to={`update-cart/${cellValues.row._id}`}>
        <Button
          variant="contained"
          color="primary"
          onClick={(event) => {
            updateUpUser(event, cellValues.row.role,cellValues.row._id);
            console.log(cellValues.row._id)
          }}>
              Update
        </Button></Link>
        </div>

      );
    }
  },{
    headerName:"Delete Cart",
    field: "Delete",
    width: 120,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="error"
          onClick={(event) => {
            axios.delete(`http://localhost:5000/cart/delete/${cellValues.row._id}`).then((res)=>{
              alert("Deleted");
              window.location = "/dashboard/cart";
            }).catch((err)=>{
                alert(err.message)
            })
          }}
        >
          Delete
        </Button>
      );
    }
  }

];

function CartTable() {
    

  const [tableData, setTableData] = useState([])

  useEffect(()=>{
    loadCart();
  },[])

  const loadCart =() =>{
    axios.get("http://localhost:5000/cart/").then((res) => 
    setTableData((res.data)))

  }




    

  return (
      <div>
          
          <center><h3>Cart Table</h3></center>
      <center>
    <div style={{ height: 450, width: '95%' }}>
      <DataGrid
        getRowId={(row) => row._id}
        rows={tableData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // customToolbarSelect
      />
    </div></center>
    </div>
  );
}

export default CartTable;