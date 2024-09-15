import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import SwiperCore from 'swiper';
import { Card } from '../../../components/card';
import { dishes } from '../../../arraysOfObjects';
import { ICategory, IProduct } from '../../../interfaces';
import { getProduct } from '../../../api';
import { useQuery } from 'react-query';

interface Props {
    el: IProduct
}

export const SecondSwiper = ({ el }: Props) => {

    const swiper = useRef<SwiperCore | null>(null);

    const { data, isLoading } = useQuery({
        queryFn: () => getProduct(),
        queryKey: ["get-product-current"]
    })

    let alsoBuy = data?.filter((item) => (item.ProductType.name === el.ProductType.name) && (item.id !== el.id))

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
            {alsoBuy?.map((dish, index) => (
                <SwiperSlide key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card item={dish} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
