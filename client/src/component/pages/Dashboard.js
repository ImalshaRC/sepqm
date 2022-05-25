import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import MovieList from "./../movie/MovieList";
import MovieStore from "./../movie/MovieStore";
import ShowMovie from "./../movie/ShowMovie";
import UpdateMovie from "./../movie/UpdateMovie";
import AddMovie from "./../movie/AddMovie"

function Dashboard() {
    return(
        <div>
            <Header/>

            <Routes>
                <Route path="/movie-list/add-movie"  element={<AddMovie/>}/>
                <Route path="/movie-store/add-movie"  element={<AddMovie/>}/>
                <Route path="/movie-store"  element={<MovieStore/>}/>
                <Route path="/movie-list"  element={<MovieList/>}/>
                <Route path="/movie-store/show-movie/:id"  element={<ShowMovie/>}/>
                <Route path="/movie-list/update-movie/:id"  element={<UpdateMovie/>}/>
            </Routes>
        </div>
    )
}

export default Dashboard;