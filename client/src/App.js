import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandedPage from "./component/register/LandedPage";
import SignIn from "./component/register/SignIn";
import SignUp from "./component/register/SignUp";
import Verify from "./component/register/Verify";
import VerifyPayment from "./component/register/VerifyPayment";
import PaymentLanded from "./component/register/PaymentLanded";
import Dashboard from "./component/pages/Dashboard";

function App() {

  return (
    <BrowserRouter>
      <Routes>   

          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/verify/:token" element={<Verify/>}/>
          <Route path="/landedpage" element={<LandedPage/>}/>

          <Route path="/dashboard/*" element={<Dashboard/>} />

          <Route path="/verify-payment/:token"  element={<VerifyPayment/>}/>
          <Route path="/payment-landed/:token"  element={<PaymentLanded/>}/>
          
          
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
