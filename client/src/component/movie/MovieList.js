import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import MovieTable from "./MovieTable";

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function MovieList() {

    const [movies, setMovies] = useState([]);
    useEffect(() => {
        loadMovies();
    }, []);

    const loadMovies = async() => {
        const result = await axios.get('http://localhost:5000/movie/');
        setMovies(result.data.reverse());
    }

    const [searchText, setSearchText] = useState('');


    const handlesearchArea = value => {
        setSearchText(value);
        filterData(value);   
    }

    const filterData = value => {
        const lowerCaseValue = value.toLowerCase().trim();
        if(!lowerCaseValue){
            loadMovies();
        }
        else{      
            const filteredData = movies.filter(item => {
                return Object.keys(item).some(key => {
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setMovies(filteredData);
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
        loadMovies();
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

            <div>
                <MovieTable/>
            </div>

            <div className="searchPanel">
                <div className="searchPanel_addNew">
                <div className="d-flex">
                    <button className="newCustomer_btn" onClick={goToAddMovie}>
                        Add Movie
                    </button>
                    {/* <button onClick={goToProductSummary} className="newCustomer_btn mx-4">
                        Product Summary
                    </button>                     */}
                </div>
                </div>
                <form className="searchBar">
                <input type="text" onChange={ e => handlesearchArea(e.target.value)} placeholder="Search here..."/>
                    <button type="submit">Search
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
                <th scope="col">Movie Name</th>
                <th scope="col">Description</th>
                <th scope="col">cast</th>
                <th scope="col">show Time</th>            
                <th scope="col">action</th>
            </tr>
        </thead>
        <tbody>
    {
        movies.map((movie, index) => (
            <tr>
                <center><td >{index + 1}</td></center>
                <td><center>{movie.name}</center></td>   
                <td><center>{movie.description}</center></td>
                <td><center>{movie.cast}</center></td>
                <td><center>{movie.showTime}</center></td>            
                <td scope="col"><center>
                    <Link to={`/update-movie/${movie._id}`}><button class="table_btns">Update</button></Link>&nbsp;
                    <button onClick={() => {handleClickOpen(movie._id)}} class="table_btns">Delete</button></center>
                </td>
            </tr> 
        ))
    }
  </tbody>
</table>
{/* </div> */}
</div>
    {movies.length === 0 && <span>no records found to display</span>}
        </div>
    )
}