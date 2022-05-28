import Header from "./Header";
import { Routes, Route } from "react-router-dom";
import MovieList from "./../movie/MovieList";
import MovieStore from "./../movie/MovieStore";
import ShowMovie from "./../movie/ShowMovie";
import UpdateMovie from "./../movie/UpdateMovie";
import AddMovie from "./../movie/AddMovie"

import AddCart from "./../cart/AddCart";
import GenerateQR from "./GenerateQR";
import PaymentList from "./PaymentList";
import AddPayment from "./AddPayment";
import CartTable from "../cart/CartTable";
import PaymentTable from "./PaymentTable";


function Dashboard() {
    return(
        <div>
            <Header/>
            <Routes>
                <Route path="/movie-list"  element={<MovieList/>}/>
                <Route path="/movie-list/add-movie"  element={<AddMovie/>}/>
                <Route path="/movie-list/update-movie/:id"  element={<UpdateMovie/>}/>
                <Route path="/movie-store"  element={<MovieStore/>}/>
                <Route path="/movie-store/show-movie/:id"  element={<ShowMovie/>}/>
                <Route path="/movie-store/add-movie"  element={<AddMovie/>}/>

                <Route path="/movie-store/add-cart"  element={<AddCart/>}/>

                <Route path="/qr/:token"  element={<GenerateQR/>}/>
                <Route path="/add-payment/:id"  element={<AddPayment/>}/>
                <Route path="/payment-table"  element={<PaymentTable/>}/>

                <Route path="/movie-store/cart-table"  element={<CartTable/>}/>

            </Routes>
        </div>
    )
}

export default Dashboard;