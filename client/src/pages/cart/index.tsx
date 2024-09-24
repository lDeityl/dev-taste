import React, { useState, useRef, useEffect } from 'react'
import styles from './index.module.scss'
import { HeadLine } from '../../components/headline'
import { Wrapper } from '../../components/wrapper'
import { Fs12Fw400White, Fs13Fw500White, Fs14Fw500White, Fs16BoldWhite, Fs18Fw400Gray, Fs18Fw500White, Fs20Fw500White, Fs25BoldWhite, Fs30BoldWhite } from '../../components/typography'
import { ButtonGreen } from '../../ui/buttons'
import { VisibleDesktop900, VisibleHandheld900 } from '../../utils/visibleComponents'
import { useNavigate } from 'react-router-dom'
import { CartItem, useCartStore } from '../../stores'
import { formatNumber } from '../../utils/formatMoney'
import { useQuery } from 'react-query'
import { getCategoryId, getProductFive } from '../../api'
import { Curtain } from '../../components/curtain'
import './index.css'



export const Cart = () => {

    const navigate = useNavigate()

    const { cartItems, removeFromCart, removeFromCartTo1, addToCart } = useCartStore()
    let summa = cartItems.reduce((prev, curr) => prev + curr.product.price * curr.quantity, 0)

    const { data, isLoading } = useQuery({
        keepPreviousData: true,
        queryFn: getProductFive,
        queryKey: ['random-products']
    })

    const cloudRef = useRef<HTMLDivElement>(null);

    const rain = () => {
        const cloud = cloudRef.current;
        if (!cloud) return;

        const e = document.createElement('div');
        e.classList.add('drop');

        let left = Math.floor(Math.random() * 310);
        let width = Math.random() * 5;
        let height = Math.random() * 50;
        let duration = Math.random() * .5;

        cloud.appendChild(e);

        e.style.left = left + 'px';
        e.style.width = 0.5 + width + 'px';
        e.style.height = 0.5 + height + 'px';
        e.style.animationDuration = 1 + duration + 's';

        setTimeout(() => {
            cloud.removeChild(e);
        }, 2000);
    };

    useEffect(() => {
        const interval = setInterval(rain, 20);
        return () => clearInterval(interval);
    }, []);

    const { data: dataCategory } = useQuery({
        queryFn: getCategoryId,
        queryKey: ['data-category'],
        keepPreviousData: true
    });

    return (
        <Wrapper>
            <Curtain />
            {cartItems.length > 0 ?
                <>
                    <HeadLine title='КОРЗИНА' />
                    <div className={styles.cart}>
                        <VisibleDesktop900>
                            {cartItems?.map((el, idx) => {

                                const category = dataCategory?.find((cat) => cat.id === el.product.categoryId);

                                console.log(category, 'asdasd');


                                return (
                                    <React.Fragment key={idx}>
                                        <div className={styles.up}>
                                            <img src={el.product.imageUrl} alt={el.product.name} />
                                            <div className={styles.name}>
                                                <Fs18Fw500White.span>
                                                    {el.product.name} {category?.name && `(${category.name})`}
                                                </Fs18Fw500White.span>
                                                <Fs12Fw400White.p className={styles.gray}>{el.product.description}</Fs12Fw400White.p>
                                            </div>
                                            <div className={styles.count}>
                                                <div className={styles.green} onClick={() => removeFromCartTo1(el.product.id)}>-</div>
                                                <Fs20Fw500White.span>{formatNumber(el.quantity)}</Fs20Fw500White.span>
                                                <div className={styles.green} onClick={() => addToCart(el.product, 1)}>+</div>
                                            </div>
                                            <Fs20Fw500White.span>{formatNumber(el.product.price * el.quantity)} ₽</Fs20Fw500White.span>
                                            <div className={`${styles.green} ${styles.close}`} onClick={() => removeFromCart(el.product.id)}>+</div>
                                        </div>
                                        {cartItems.length - 1 !== idx && <div className={styles.customProfile} />}
                                    </React.Fragment>
                                )
                            })}
                        </VisibleDesktop900>
                        <VisibleHandheld900>
                            {cartItems.map((el, idx) => (
                                <div className={styles.up} key={idx}>
                                    <div className={styles.parent}>
                                        <div></div>
                                        <div className={styles.rowMobile}>
                                            <img src={el.product.imageUrl} alt="cart_name" />
                                            <div className={`${styles.green} ${styles.close}`} onClick={() => removeFromCart(el?.product?.id)}>+</div>
                                        </div>
                                    </div>
                                    <div className={styles.name}>
                                        <Fs18Fw500White.span>{el.product.name}</Fs18Fw500White.span>
                                        <Fs12Fw400White.p className={styles.gray}>{el.product.description}</Fs12Fw400White.p>
                                    </div>
                                    <div className={styles.count}>
                                        <div className={styles.green} onClick={() => removeFromCartTo1(el.product.id)}>-</div>
                                        <Fs20Fw500White.span>{formatNumber(el?.quantity)}</Fs20Fw500White.span>
                                        <div className={styles.green} onClick={() => addToCart(el.product, 1)}>+</div>
                                    </div>
                                    <Fs20Fw500White.span>{formatNumber(el.product.price * el.quantity)} ₽</Fs20Fw500White.span>
                                </div>
                            ))}
                        </VisibleHandheld900>
                    </div>
                    <div className={styles.addToCart}>
                        {data && data.length > 0 &&
                            <>
                                <Fs30BoldWhite.h4>ДОБАВИТЬ К ЗАКАЗУ</Fs30BoldWhite.h4>
                                <div className={styles.blockCart}>
                                    {data?.map((product, idx) => (
                                        <div key={product.id} className={`${styles.item} ${idx === data.length - 1 ? styles.lastHidden : ''} ${idx === data.length - 2 ? styles.prevLastHidden : ''} ${idx === data.length - 3 ? styles.prev2LastHidden : ''}`}>
                                            <img src={product.imageUrl} alt={product.name} />
                                            <Fs14Fw500White.span style={{ fontWeight: '700', textAlign: 'center' }}>{product.name}</Fs14Fw500White.span>
                                            <div className={styles.add}>
                                                <Fs12Fw400White.span style={{ color: '#C6CED1' }}>Добавить</Fs12Fw400White.span>
                                                <div className={styles.green} onClick={() => addToCart(product, 1)}>+</div>
                                            </div>
                                            <Fs13Fw500White.span className={styles.priceCost}>{product.price} ₽</Fs13Fw500White.span>
                                        </div>
                                    ))}
                                </div>
                                <hr className={styles.hr} />
                            </>
                        }
                        <div className={styles.totalPrice}>
                            <div className={styles.total}>
                                <div className={styles.fifty}>
                                    <Fs18Fw400Gray.span>Итого:</Fs18Fw400Gray.span>
                                    <Fs25BoldWhite.span>{formatNumber(summa)} ₽</Fs25BoldWhite.span>
                                </div>
                                {summa < 1200 ?
                                    <Fs13Fw500White.span>
                                        До бесплатной доставки не хватает:
                                        <Fs25BoldWhite.span style={{ color: '#72a479' }}> {1200 - summa} ₽</Fs25BoldWhite.span>
                                    </Fs13Fw500White.span>
                                    :
                                    <Fs13Fw500White.span>
                                        Бесплатная доставка
                                    </Fs13Fw500White.span>}
                                <Fs12Fw400White.span>Минимальная сумма заказа 800 ₽</Fs12Fw400White.span>
                            </div>
                            <ButtonGreen onClick={() => navigate('/making')} className={styles.offer}><Fs16BoldWhite.span>Оформить заказ</Fs16BoldWhite.span></ButtonGreen>
                        </div>
                    </div>
                </>
                :
                <div className={styles.column}>
                    <HeadLine title='Корзина пуста 😞' />
                    <div className={styles.container}>
                        <div className={styles.cloud} id='cloud' ref={cloudRef}></div>
                    </div>
                </div>
            }
        </Wrapper>
    )
}