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
import { allProducts } from '../all'
import ScrollToTop from '../../../../utils/scrollToTop'

export const Product = () => {

    const nav = useNavigate();

    const { id } = useParams();
    const el = allProducts.find((item) => item.link === id);

    return (
        <div className={styles.box}>
            {el ?
                <Wrapper className={styles.cart}>
                    <img src={el?.image} alt="" />
                    <div className={styles.blocks}>
                        <div className={styles.up}>
                            <Fs25BoldWhite.h4>{el.title}</Fs25BoldWhite.h4>
                            <Fs13Fw400Gray.p>{el.description}</Fs13Fw400Gray.p>
                        </div>
                        <div className={styles.bottom}>
                            <Fs16Fw400White.span style={{ paddingLeft: '40px' }}>Вес {el.weight} г</Fs16Fw400White.span>
                            <div className={styles.cartBox}>
                                <div className={styles.cart} onClick={() => nav('/cart')}>
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
                                    <Fs13Fw500White.span>{el.protein}</Fs13Fw500White.span>
                                    <Fs13Fw500White.span>{el.fat}</Fs13Fw500White.span>
                                    <Fs13Fw500White.span>{el.carbs}</Fs13Fw500White.span>
                                    <Fs13Fw500White.span>{el.calories}</Fs13Fw500White.span>
                                    <Fs13Fw500White.span>{el.weight}</Fs13Fw500White.span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Wrapper>
                :
                <Wrapper>
                    <HeadLine title='товар не найден!' />
                </Wrapper>
            }
            <div className={styles.customHR} />
            <Wrapper>
                <HeadLine title='С ЭТИМ ТОВАРОМ ПОКУПАЮТ' />
                <SecondSwiper />
            </Wrapper>
            <Wrapper className={styles.wrapperContacts}>
                <Contacts />
            </Wrapper>
        </div>
    )
}
