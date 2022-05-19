import { useState,useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import axios from 'axios';

const columns = [
  { field: '_id', headerName: 'PaymentID', width: 240 },
  { field: 'cardNo', headerName: 'Card No', width: 200 },
  { field: 'amount', headerName: 'Amount', width: 200 },
  { field: 'cvcNo', headerName: 'CVC No', width: 200 },
  { field: 'holderName', headerName: 'Holder Name', width: 200 },
//   {
//     headerName:"Update Movie",
//     field: "Edit",
//     width: 150,
//     renderCell: (cellValues) => {
//       return (
//         <div>
//             <Link to={`/update-movie/${cellValues.row._id}`}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={(event) => {
//             updateUpUser(event, cellValues.row.role,cellValues.row._id);
//             console.log(cellValues.row._id)
//           }}>
//               Update
//         </Button></Link>
//         </div>

//       );
//     }
//   },{
//     headerName:"Delete Movie",
//     field: "Delete",
//     width: 120,
//     renderCell: (cellValues) => {
//       return (
//         <Button
//           variant="contained"
//           color="error"
//           onClick={(event) => {
//             axios.delete(`http://localhost:5000/movie/delete/${cellValues.row._id}`).then((res)=>{
//               alert("Deleted");
//             }).catch((err)=>{
//                 alert(err.message)
//             })
//           }}
//         >
//           Delete
//         </Button>
//       );
//     }
//   }

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
    </div></center>
    </div>
  );
}

export default PaymentTable;