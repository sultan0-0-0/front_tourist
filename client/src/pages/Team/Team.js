import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';
import style from './Team.module.css';
import nikesh from '../../assets/nikeshpic.jpg';
import dima from '../../assets/dima.jpg';
import victor from '../../assets/victor.jpg';
import maxim from '../../assets/maxim.jpg';
import sultan from '../../assets/sultan.jpg';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

function Team() {
  return (
    <div className={style.container}>
      <section className={style.content}>
        <div className={style.team_heading}>
          <h3>Our Team</h3>
        </div>
        <div className={style.team_box}>
          <div className={style.img1}>
            <Swiper
              effect="coverflow"
              grabCursor
              centeredSlides
              slidesPerView="auto"
              coverflowEffect={{
                stretch: 0,
                rotate: 50,
                modifier: 1,
                depth: 100,
                slideShadows: true,
              }}
              pagination
              modules={[EffectCoverflow, Pagination]}
              className={style.mySwiper}
            >
              <SwiperSlide>
                <img src={nikesh} alt="nikesh" />
                <strong>Nikesh Acharya</strong>
              </SwiperSlide>
              <SwiperSlide>
                <img src={dima} alt="dima" />
                <strong>Kirpa Dmitry</strong>
              </SwiperSlide>
              <SwiperSlide>
                <img src={maxim} alt="maxim" />
                <strong>Maxim Cucer</strong>
              </SwiperSlide>
              <SwiperSlide>
                <img src={victor} alt="victor" />
                <strong>Victor Pablov</strong>
              </SwiperSlide>
              <SwiperSlide>
                <img src={sultan} alt="sultan" />
                <strong>Sultan</strong>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Team;
