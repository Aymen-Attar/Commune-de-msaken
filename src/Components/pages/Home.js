import React from "react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
 import "swiper/swiper-bundle.min.css"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from "react-router-dom";
import image1 from '../images/image1.png'



export default function Actualite(){
    return(
    
        <div>   
             <Swiper className='swiper'
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log('slide change')}
            effect={"cube"}
            cubeEffect={{
              shadow:true,
              slideShadows:true,
              shadowOffset:20,
              shadowScale:0.94,
            }}
            >
              <SwiperSlide><a href='#'><img src={image1} className="img"  /></a></SwiperSlide>
              <SwiperSlide><img src="" className="img" /></SwiperSlide>
              <SwiperSlide><img src="" className="img"/></SwiperSlide>
             

            </Swiper>
        </div>
            

    
    )
}