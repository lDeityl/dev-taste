import React, { useEffect, useLayoutEffect } from 'react'
import styles from './index.module.scss'
import { Wrapper } from '../../../../components/wrapper'
import { Fs12Fw300White, Fs12Fw500Black, Fs13Fw400Gray, Fs13Fw500White, Fs14Fw500White, Fs16Fw400White, Fs25BoldWhite } from '../../../../components/typography'
import m from '../../../../assets/images/hot/meat-1.png'
import { useNavigate } from 'react-router-dom'
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { HeadLine } from '../../../../components/headline'
import { ThirdSwiper } from '../../../Main/third-swiper'
import { SecondSwiper } from '../../../Main/second-swiper'
import { Contacts } from '../../../../components/contacts'
import { useParams } from 'react-router-dom';
import ScrollToTop from '../../../../utils/scrollToTop'
import { FirstSwiper } from '../../../Main/first-swiper'
import { IProduct } from '../../../../interfaces'
import image from '../../../../assets/images/hot/meat-3.png'
import { useQuery } from 'react-query'
import { getProduct, getSettingsAdmin, getUserProduct } from '../../../../api'
import { useCartStore } from '../../../../stores'
import { toast } from 'react-toastify'

export const Product = () => {

    const { id } = useParams();

    const { data: el, isLoading } = useQuery({
        queryFn: () => getUserProduct(Number(id)),
        queryKey: ["get-product", id]
    })

    const { addToCart } = useCartStore()

    const handleAddToCartProduct = () => {
        if (!el) return;
        addToCart(el, 1)
        toast.success(`${String(el.name)} добавлен в корзину`, {
            position: "top-left"
        })
    }

    const { data } = useQuery({
        queryFn: getSettingsAdmin,
        queryKey: ['user-settings'],
        keepPreviousData: true,
    });

    return (
        <div className={styles.box}>
            {isLoading ?
                <Wrapper>
                    <HeadLine title='Загружаем товар 🤭' />
                </Wrapper>
                :
                <>
                    {el ?
                        <Wrapper className={styles.cart}>
                            <img src={el.imageUrl} alt={el.name} />
                            <div className={styles.blocks}>
                                <div className={styles.up}>
                                    <Fs25BoldWhite.h4>{el.name}</Fs25BoldWhite.h4>
                                    <Fs13Fw400Gray.p>{el.description}</Fs13Fw400Gray.p>
                                </div>
                                <div className={styles.bottom}>
                                    <div className={styles.up2}>
                                        <Fs16Fw400White.span style={{ paddingLeft: '40px' }}>Компания: <b>{el?.Category?.name}</b></Fs16Fw400White.span>
                                        <Fs16Fw400White.span style={{ paddingLeft: '40px' }}>Тип продукта: <b>{el?.ProductType?.name}</b></Fs16Fw400White.span>
                                    </div>
                                    <div className={styles.cartBox}>
                                        <div className={styles.cartt} onClick={() => { handleAddToCartProduct() }}>
                                            <Fs14Fw500White.span>Корзина</Fs14Fw500White.span>
                                            <div className={styles.unvisibleSqr}>
                                                <HiOutlineShoppingBag />
                                            </div>
                                        </div>
                                        <Fs25BoldWhite.span>{el.price} ₽</Fs25BoldWhite.span>
                                    </div>
                                    <div className={styles.bjy}>
                                        <div className={styles.characteristic}>
                                            <Fs12Fw300White.span>Белки</Fs12Fw300White.span>
                                            <Fs12Fw300White.span>Жиры</Fs12Fw300White.span>
                                            <Fs12Fw300White.span>Углеводы</Fs12Fw300White.span>
                                            <Fs12Fw300White.span>Ккал</Fs12Fw300White.span>
                                            <Fs12Fw300White.span>Вес</Fs12Fw300White.span>
                                        </div>
                                        <hr />
                                        <div className={styles.digits}>
                                            <Fs13Fw500White.span>{el.squirrels}</Fs13Fw500White.span>
                                            <Fs13Fw500White.span>{el.fats}</Fs13Fw500White.span>
                                            <Fs13Fw500White.span>{el.carbohydrates}</Fs13Fw500White.span>
                                            <Fs13Fw500White.span>{el.calories}</Fs13Fw500White.span>
                                            <Fs13Fw500White.span>{el.weight}</Fs13Fw500White.span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Wrapper>
                        :
                        <Wrapper>
                            <HeadLine title='Товар не найден 😅' />
                        </Wrapper>
                    }
                </>
            }
            <div className={styles.customHR} />
            {el &&
                <Wrapper>
                    <SecondSwiper el={el} />
                </Wrapper>
            }
            {data && <Wrapper className={styles.wrapperContacts}>
                <Contacts data={data} />
            </Wrapper>}
        </div>
    )
}
