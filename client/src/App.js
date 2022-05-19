import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import AddMovie from "./component/movie/AddMovie";
import MovieList from "./component/movie/MovieList";
import MovieStore from "./component/movie/MovieStore";
import ShowMovie from "./component/movie/ShowMovie";
import UpdateMovie from "./component/movie/UpdateMovie";
import Header from "./component/pages/Header";
import LandedPage from "./component/register/LandedPage";
import SignIn from "./component/register/SignIn";
import SignUp from "./component/register/SignUp";
import Verify from "./component/register/Verify";
import AddPayment from "./component/pages/AddPayment";
import PaymentList from "./component/pages/PaymentList";
import VerifyPayment from "./component/register/VerifyPayment";
import PaymentLanded from "./component/register/PaymentLanded";
import GenerateQR from "./component/pages/GenerateQR";

function App() {

  return (
    <Router>
      <div className="App">    

            
        
        <switch>      

          <Header/>     

          <Route path="/signup" exact component={SignUp}/>
          <Route path="/signin" exact component={SignIn}/>
          <Route path="/verify/:token" exact component={Verify}/>
          <Route path="/landedpage" exact component={LandedPage}/>

          <Route path="/add-movie" exact component={AddMovie}/>
          <Route path="/movie-store" exact component={MovieStore}/>
          <Route path="/movie-list" exact component={MovieList}/>
          <Route path="/show-movie/:id" exact component={ShowMovie}/>
          <Route path="/update-movie/:id" exact component={UpdateMovie}/>

          <Route path="/add-payment" exact component={AddPayment}/>
          <Route path="/payment-list" exact component={PaymentList}/>
          <Route path="/verify-payment/:token" exact component={VerifyPayment}/>
          <Route path="/payment-landed" exact component={PaymentLanded}/>
          <Route path="/qr" exact component={GenerateQR}/>
          
        </switch>
        
    </div>    
    </Router>
    
  )
}

export default App;
