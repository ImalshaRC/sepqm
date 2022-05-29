import React, { Component } from 'react';
import './css/hero.css';
import slide1 from './images/1.jpg';
import slide2 from './images/2.jpg';
import slide3 from './images/3.jpg';
import Button from '@material-ui/core/Button';



class Home extends Component {
    render() {
        return (
          <div class="slideshow">
          <div class="slideshow-item">
              <img src={slide1} alt=""/>
          </div>
          <div class="slideshow-item">
              <img src={slide2} alt=""/>
          </div>
          <div class="slideshow-item">
              <img src={slide3} alt=""/>
          </div>
      
        <div class="hero">
          
          <div class="container spacing">
            <div class="subhero">
            <p>If you're bonkers for cinema, then you’ve come to the right place to experience the most amazing cinematic experience. Just like you, we at BookMyShow eat, pray and love movies. Whether you want to book tickets for the most current movies or advance book for the upcoming biggies such as Prithviraj or Downton Abbey: A New Era, we give you options for both. Tamil, Sinhala, Hollywood or Bollywood – you will find it all right here!</p>
                        <Button variant="outlined" color="inherit" size="medium" href="movie-store">
                           EXPLORE
                          </Button>
          </div>
          </div>
        </div>
      </div>
        );
    }
}


export default Home;