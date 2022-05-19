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
  { field: '_id', headerName: 'MovieID', width: 240 },
  { field: 'name', headerName: 'Movie Name', width: 200 },
  { field: 'description', headerName: 'Description', width: 200 },
  { field: 'cast', headerName: 'Cast', width: 200 },
  { field: 'showTime', headerName: 'Show Time', width: 200 },
  {
    headerName:"Update Movie",
    field: "Edit",
    width: 150,
    renderCell: (cellValues) => {
      return (
        <div>
            <Link to={`/update-movie/${cellValues.row._id}`}>
        <Button
          variant="text"
          color="primary"
          onClick={(event) => {
            updateUpUser(event, cellValues.row.role,cellValues.row._id);
            console.log(cellValues.row._id)
          }}>
              UP
        </Button></Link>
        </div>

      );
    }
  },{
    headerName:"Delete Movie",
    field: "Delete",
    width: 120,
    renderCell: (cellValues) => {
      return (
        <Button
          variant="contained"
          color="error"
          onClick={(event) => {
            axios.delete(`http://localhost:5000/movie/delete/${cellValues.row._id}`).then((res)=>{
              alert("Deleted");
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

function MovieTable() {
    

  const [tableData, setTableData] = useState([])

  useEffect(()=>{
    loadMovie();
  },[])

  const loadMovie =() =>{
    axios.get("http://localhost:5000/movie/").then((res) => 
    setTableData((res.data)))

  }




    

  return (
      <div>
          <hr/>
          
          <center><h3>Movie Table</h3></center>
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

export default MovieTable;