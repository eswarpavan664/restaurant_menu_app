import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/LoadingScreen.css'; // Import the CSS file

function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer for 5 seconds, then navigate to the dashboard
    const timer = setTimeout(() => {
      navigate('/Login_screen'); // Replace '/dashboard' with the actual route to your dashboard
    }, 5000); // 5000ms = 5 seconds

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <div className="loading-text">MenuKing</div>
    </div>
  );
}

export default LoadingScreen;
