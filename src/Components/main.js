import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';
 import "swiper/swiper-bundle.min.css"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
// Import images
import image1 from './images/image1.png';
import image2 from './images/image2.png';
import image3 from './images/image3.png';
//Import css
import "./main.css";


export default function Main()  {
  return (

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
              <SwiperSlide><img src={image1} className="img"  /></SwiperSlide>
              <SwiperSlide><img src={image2} className="img" /></SwiperSlide>
              <SwiperSlide><img src={image3} className="img"/></SwiperSlide>
             

            </Swiper>
            
        </div>

  );
};

//section div slideshow