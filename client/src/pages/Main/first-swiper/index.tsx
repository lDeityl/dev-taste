import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';
import { Card } from '../../../components/card';
import { coldDishes } from '../../../arraysOfObjects';
import { useQuery } from 'react-query';
import { ICategory } from '../../../interfaces';

interface Props {
    el: ICategory
}

export const FirstSwiper = ({ el }: Props) => {

    const swiper = useRef<SwiperCore | null>(null);

    return (
        <>
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
                {el.Product.map((dish, index) => (
                    <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Card item={dish} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
