import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';
import { Card } from '../../../components/card';
import { hotDishes } from '../../../arraysOfObjects';


export const ThirdSwiper = () => {

    const swiper = useRef<SwiperCore | null>(null);

    return (
        <Swiper
            onSwiper={(swiperInstance: SwiperCore) => (swiper.current = swiperInstance)}
            spaceBetween={20}
            pagination={{ clickable: true }}
            autoplay={{
                delay: 3000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                200: {
                    slidesPerView: 1,
                },
                600: {
                    slidesPerView: 1.8,
                },
                780: {
                    slidesPerView: 2.3,
                },
                1050: {
                    slidesPerView: 3,
                },
                1440: {
                    slidesPerView: 4.2,
                }
            }}
        >
            {hotDishes.map((dish, index) => (
                <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card
                        title={dish.title}
                        description={dish.description}
                        weight={dish.weight}
                        price={dish.price}
                        link={dish.link}
                        image={dish.image}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
