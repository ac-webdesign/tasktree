import React, { useEffect, useState } from 'react';
import '../styles/splashScreen.css'
import forkimage from '../images/tasktreefork.png'
const SplashScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 7, 100);
      });
    }, 150);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <img src={forkimage} alt="forkimage" className='forkimage'/>
        <h1>TASKTREE</h1>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p>Loading... {progress}%</p>
      </div>
    </div>
  );
};

export default SplashScreen;
