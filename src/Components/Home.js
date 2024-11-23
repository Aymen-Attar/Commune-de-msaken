import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y, EffectCube, Autoplay, EffectFade } from 'swiper/core';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles


import YouTube from 'react-youtube';
import moment from 'moment';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import { Link } from 'react-router-dom';
import {FaBullhorn, FaNewspaper} from 'react-icons/fa'
import { MdOutlineWork } from 'react-icons/md';
import { RiBuildingLine } from 'react-icons/ri';
import Calendar from "./Calendar"
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';
import './Home.css';
import Events from "./actualite";
import Weather from'./weather';

const Main = () => {
  const mapStyles = {
    height: "600px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 35.730317789042516,
    lng: 10.578548725764797,
  };
  // Render the Main component
  return (
    <div>
      {/* Swiper Slider */}
      <Swiper
        className="swiper"
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
        effect="fade"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        <SwiperSlide>
          <img src={image1} className="img" alt="Image 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image2} className="img" alt="Image 2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src={image3} className="img" alt="Image 3" />
        </SwiperSlide>
      </Swiper>

    <div className="section-container">
    <h1 className="big-title">Services</h1>
    <div className="animated-background"></div>
      <div className="icon-container" >
      <Link to="/Plan-annuel-d'investissement" className="icon-link">
        <FaNewspaper className="icon" />
        <span className="icon-title">Plan-annuel-d'investissement</span>
      </Link>
      <Link to="/Contact" className="icon-link">
        <FaBullhorn className="icon" />
        <span className="icon-title">Contact</span>
      </Link>
      <Link to="/Concoursu" className="icon-link">
        <MdOutlineWork className="icon" />
        <span className="icon-title">Concours</span>
      </Link>
      <Link to="/Organisation-municipale" className="icon-link">
        <RiBuildingLine className="icon" />
        <span className="icon-title">Administration du commune</span>
      </Link>
    </div>
    </div>
    <div>
      <Events />
    </div>


      {/* YouTube Video */}
      <div className="youtube-container">
        <YouTube videoId="uyaNR268AJk" className="youtube-player" />
      </div>
      <div>
        <Calendar />
      </div>
      <div>
        <Weather />
      </div>

      <div>
      <LoadScript googleMapsApiKey="">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={18} // Adjust the zoom level as needed
        center={defaultCenter}
      >
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>

      </div>


      

      

      {/* Weather Information */}
      {/* ... Existing code ... */}

      {/* Google Map */}
      {/* ... Existing code ... */}
    </div>
  );
};

export default Main;
