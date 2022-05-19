import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import AddMovie from "./component/movie/AddMovie";
import MovieList from "./component/movie/MovieList";
import UpdateMovie from "./component/movie/UpdateMovie";
import LandedPage from "./component/register/LandedPage";
import SignIn from "./component/register/SignIn";
import SignUp from "./component/register/SignUp";
import Verify from "./component/register/Verify";

function App() {

  return (
    <Router>
      <div className="App">        
        
        <switch> 

          <Route path="/signup" exact component={SignUp}/>
          <Route path="/signin" exact component={SignIn}/>
          <Route path="/verify/:token" exact component={Verify}/>
          <Route path="/landedpage" exact component={LandedPage}/>

          <Route path="/add-movie" exact component={AddMovie}/>
          <Route path="/movie-list" exact component={MovieList}/>
          <Route path="/update-movie/:id" exact component={UpdateMovie}/>
          
        </switch>
        
    </div>    
    </Router>
    
  )
}

export default App;
