import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import {
  Autoplay,
  Pagination,
  Navigation,
  HashNavigation,
} from "swiper/modules";
export default function Slider() {
  return (
    // <Swiper
    //     spaceBetween={30}
    //     centeredSlides={true}
    //     autoplay={{
    //       delay: 2500,
    //       disableOnInteraction: false,
    //     }}
    //     pagination={{
    //       clickable: true,
    //     }}
    //     navigation={true}
    //     modules={[Autoplay, Pagination, Navigation]}
    //     className="mySwiper"
    //   ></Swiper>
    <>
      <Swiper
        spaceBetween={30}
        // hashNavigation={{
        //   watchState: true,
        // }}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide data-hash="slide1">
          <div>
            <img
              className="w-full h-[200px] md:h-[300px] lg:h-[450px]"
              src="https://i.ibb.co/dJM4Kw0/shopping-concept-close-up-portrait-young-beautiful-attractive-redhair-girl-smiling-looking-camera.jpg"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide data-hash="slide2">
          <div>
            <img
              className="w-full h-[200px] md:h-[300px] lg:h-[450px]"
              src="https://i.ibb.co/wNsWs1S/young-asia-lady-using-phone-credit-bank-card-with-positive-expression-smile-broadly-dressed-casual-c.jpg"
              alt=""
            />
          </div>
        </SwiperSlide>
        <SwiperSlide data-hash="slide3">
          <div>
            <img
              className="w-full h-[200px] md:h-[300px] lg:h-[450px]"
              src="https://i.ibb.co/CBc5G0F/technology-emotions-gadgets-concept-cheerful-goodlooking-redhead-woman-dancing-with-hands-up-clo.jpg"
              alt=""
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
