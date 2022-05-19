import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {  Grid, CardActionArea, CardActions } from '@mui/material';

import img1 from './img1.png';

export default function MovieStore() {

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
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" class="bi bi-search" viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </form>
            </div>

            <i></i>
            <div className="tableContent">     

            <div>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >


                {
                    movies.map((movie, index) => (
                        <div className="">  
                            <div className="row">
                                <div className="col">
                                    <div className="mx-2">
                                        <Card sx={{ maxWidth: 345 }}>
                                            <CardActionArea>
                                                <CardMedia
                                                component="img"
                                                height="140"
                                                image={img1}
                                                alt="green iguana"
                                                />
                                                <CardContent>
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {movie.name} &nbsp;&nbsp;&nbsp;&nbsp; {movie.showTime}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {movie.description}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {movie.cast}
                                                </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                            <CardActions>
                                                <Button size="small" color="primary">
                                                Book now
                                                </Button>
                                                <Button size="small" color="primary">
                                                Show Details
                                                </Button>
                                            </CardActions>
                                        </Card>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        
                    ))
                }

            </Grid>
            </div>
        
    
  
{/* </div> */}
</div>
    {movies.length === 0 && <span>no records found to display</span>}







    




        </div>
        
    )
}