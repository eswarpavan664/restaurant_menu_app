import React,{useState,useEffect} from 'react';
 
import {
  useNavigate ,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
 
import LoadingScreen  from "../screens/LoadingScreen.js"
import DashboardScreen  from "../screens/DashboardScreen.js"
import LoginScreen  from "../screens/LoginScreen.js"
import PaymentScreen  from "../screens/PaymentScreen.js"
import RestaurantScreen  from "../screens/RestaurantScreen.js"

function MainNavigation() {
  const [status, setStatus] = useState(() => {
    if (navigator.onLine) {
      console.log("Connected to network.");
      return true;
    } else {
      return false;
    }
  });
  useEffect(() => {
    window.ononline = (e) => {
      console.log("Connected to network.");
      setStatus(true);
    };
    window.onoffline = (e) => {
      console.log("Network connection lost.");
      setStatus(false);
    };
  }, [status]);
 

  return (
    <BrowserRouter>
      
    <Routes>
        <Route path="/" element={<LoadingScreen />} />
        <Route path="/restaurant_screen" element={<RestaurantScreen />} />
        <Route path="/payment_screen" element={<PaymentScreen />} />
        <Route path="/dashboard_screen" element={<DashboardScreen />} />
        <Route path="/Login_screen" element={<LoginScreen />} />
 
       
    </Routes>
 
  </BrowserRouter>
  );
}

export default MainNavigation;
