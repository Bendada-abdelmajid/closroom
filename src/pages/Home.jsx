import React from "react";
import {FaFacebookF, FaInstagram, FaGithub} from "react-icons/fa"
import {BsDoorClosed} from "react-icons/bs"
import "./home.css";
import { Link } from "react-router-dom";
export default function Home() {

  return (
    <>
     <header className="space-b" >
        <div className="logo f-start"><img src="/logo.png"/>closroom</div>
        <div className="links">
          <a href="https://www.facebook.com/abdelmjid.bendada" className="icon center">
            <FaFacebookF />
          </a>
          <a href="https://www.instagram.com/abdelmajidbendada/" className="icon center">
            <FaInstagram/>
          </a>
          <a href="https://github.com/Bendada-abdelmajid" className="icon center">
            <FaGithub/>
          </a>
        </div>
        </header>
      <div className="hero center">
       

        <div className=" content">
         
            <h5>Hang out </h5>
            <h5> anytime,</h5>

            <h5 className="last">anywhere</h5>
            <p>
              With CloseRome, you'll get fast, simple, secure messaging for free
              with randome pepoale , available all over the world.
            </p>
            <Link to="/login">

           
            <button className="main-btn" >
              Join now
            </button>
            </Link>
          
         
            
        </div>

        <div className="hero-img">
          
        </div>
      </div>
    </>
  );
}
