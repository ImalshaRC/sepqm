import React, {useState, useEffect} from "react";
import axios from 'axios';
import { useNavigate, Routes, Route } from "react-router-dom";
import MovieTable from "./MovieTable";

import Button from '@mui/material/Button';

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

    let navigate = useNavigate();

    const goToAddMovie = () => {
        navigate("add-movie");
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
            
            <hr/>

    <Button variant="contained" color="primary" onClick={goToAddMovie}> Add Movie</Button>

            <div>
                <MovieTable/>
            </div>

                    
        </div>
    )
}