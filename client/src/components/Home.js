import React from 'react';
import { Link } from 'react-router-dom';
import videoBG from '../assets/mountain.mp4';

function Home() {
  return (
    <>
      <div className="wrapper">
        <video autoPlay loop muted id="video-bg">
          <source src={videoBG} type="video/mp4" />
        </video>
      </div>
      <div className="sign-up">
        <Link to="/register">Register Now</Link>
      </div>
    </>
  );
}

export default Home;
