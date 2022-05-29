import React, {useState, useEffect} from "react";
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

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
import TextField from '@material-ui/core/TextField';

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
    const [role, setRole] = useState(localStorage.getItem("role"));

    console.log(role);


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

    let history = useNavigate();

    const goToAddMovie = () => {
        history("add-movie");
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
            
            
            <hr/>

            <div className="searchPanel">
                <div className="searchPanel_addNew">
                {role==="movie_admin" &&
                    <div style={{marginLeft:10}}>
                    <Button variant="contained" color="primary" onClick={goToAddMovie}> Add Movie</Button>
                </div>
                }
                {/* <form className="searchBar mb-5">
                <input type="text" onChange={ e => handlesearchArea(e.target.value)} placeholder="Search here..."/>
                    <button type="submit">
                        Search
                    </button> */}
                    <div style={{marginLeft:10}}>
                    <TextField variant="outlined" margin="normal" label="Search Movie Here..." name="search" onChange={ e => handlesearchArea(e.target.value)}
               autoFocus/></div>
                {/* </form> */}
                </div>
                <br/>
                
            </div>

            <i></i>
            <div className="tableContent">     

            <div className="d-flex align-items-center container" style={{ marginLeft: "auto" }}>
            <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
            >


                {
                    movies.map((movie, index) => (
                        <div className="" >  
                            <div className="row">
                                <div className="col">
                                    <div className="mx-2 mb-4">
                                        <Card sx={{ maxWidth: 250, maxHeight: 400, minWidth: 250, minHeight: 400 }}>
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

                                                <Link to={`/dashboard/movie-store/add-cart/?name=${movie.name}&showTime=${movie.showTime}`} style={{ textDecoration: 'none' }}><Button size="small" color="primary">
                                                Book now
                                                </Button></Link>

                                                {/* <Link to={`add-cart/${movie._id}`} style={{ textDecoration: 'none' }}><Button size="small" color="primary">
                                                    Book now
                                                </Button></Link> */}

                                                <Link to={`show-movie/${movie._id}`} style={{ textDecoration: 'none' }}><Button size="small" color="primary">
                                                    Show Details
                                                </Button></Link>
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