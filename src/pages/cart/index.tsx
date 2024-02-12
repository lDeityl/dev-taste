import React from 'react'
import styles from './index.module.scss'
import { HeadLine } from '../../components/headline'
import { Wrapper } from '../../components/wrapper'
import { Fs12Fw400White, Fs13Fw500White, Fs14Fw500White, Fs16BoldWhite, Fs18Fw400Gray, Fs18Fw500White, Fs20Fw500White, Fs25BoldWhite, Fs30BoldWhite } from '../../components/typography'
import meat1 from '../../assets/images/hot/meat-1.png'
import { ButtonGreen } from '../../ui/buttons'

const products = [
    {
        id: 1,
        img: meat1,
        name: 'КВАС АНАНАСОВЫЙ',
        price: '1640 ₽'
    },
    {
        id: 2,
        img: meat1,
        name: 'КВАС АНАНАСОВЫЙ',
        price: '1640 ₽'
    },
    {
        id: 3,
        img: meat1,
        name: 'КВАС АНАНАСОВЫЙ',
        price: '1640 ₽'
    },
    {
        id: 4,
        img: meat1,
        name: 'КВАС АНАНАСОВЫЙ',
        price: '1640 ₽'
    },
    {
        id: 5,
        img: meat1,
        name: 'КВАС АНАНАСОВЫЙ',
        price: '1640 ₽'
    },
];

export const Cart = () => {
    return (
        <Wrapper>
            <HeadLine title='КОРЗИНА' />
            <div className={styles.cart}>
                <div className={styles.up}>
                    <img src={meat1} alt="cart_name" />
                    <div className={styles.name}>
                        <Fs18Fw500White.span>ПИЦЦА ДВОЙНАЯ ПЕППЕРОНИ</Fs18Fw500White.span>
                        <Fs12Fw400White.p className={styles.gray}>Кальмары, мидии, креветки, сыр маасдам, красный лук, микс оливок, базилик, соус песто</Fs12Fw400White.p>
                    </div>
                    <div className={styles.count}>
                        <div className={styles.green}>-</div>
                        <Fs20Fw500White.span>1</Fs20Fw500White.span>
                        <div className={styles.green}>+</div>
                    </div>
                    <Fs20Fw500White.span>1640 ₽</Fs20Fw500White.span>
                    <div className={`${styles.green} ${styles.close}`}>+</div>
                </div>
                <div className={styles.customProfile} />
                <div className={styles.up}>
                    <img src={meat1} alt="cart_name" />
                    <div className={styles.name}>
                        <Fs18Fw500White.span>ПИЦЦА ДВОЙНАЯ ПЕППЕРОНИ</Fs18Fw500White.span>
                        <Fs12Fw400White.p className={styles.gray}>Кальмары, мидии, креветки, сыр маасдам, красный лук, микс оливок, базилик, соус песто</Fs12Fw400White.p>
                    </div>
                    <div className={styles.count}>
                        <div className={styles.green}>-</div>
                        <Fs20Fw500White.span>1</Fs20Fw500White.span>
                        <div className={styles.green}>+</div>
                    </div>
                    <Fs20Fw500White.span>1640 ₽</Fs20Fw500White.span>
                    <div className={`${styles.green} ${styles.close}`}>+</div>
                </div>
            </div>
            <div className={styles.addToCart}>
                <Fs30BoldWhite.h4>ДОБАВИТЬ К ЗАКАЗУ</Fs30BoldWhite.h4>
                <div className={styles.blockCart}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.item}>
                            <img src={product.img} alt="" />
                            <Fs14Fw500White.span style={{ fontWeight: '700' }}>{product.name}</Fs14Fw500White.span>
                            <div className={styles.add}>
                                <Fs12Fw400White.span style={{ color: '#C6CED1' }}>Добавить</Fs12Fw400White.span>
                                <div className={styles.green}>+</div>
                            </div>
                            <Fs13Fw500White.span className={styles.priceCost}>{product.price}</Fs13Fw500White.span>
                        </div>
                    ))}
                </div>
                <hr className={styles.hr} />
                <div className={styles.totalPrice}>
                    <div className={styles.total}>
                        <div className={styles.fifty}>
                            <Fs18Fw400Gray.span>Итого:</Fs18Fw400Gray.span>
                            <Fs25BoldWhite.span>500 ₽</Fs25BoldWhite.span>
                        </div>
                        <Fs13Fw500White.span>
                            До бесплатной доставки не хватает:
                            <span style={{ color: '#72a479' }}>100 ₽</span>
                        </Fs13Fw500White.span>
                        <Fs12Fw400White.span>Минимальная сума заказа 1500 ₽</Fs12Fw400White.span>
                    </div>
                    <ButtonGreen className={styles.offer}><Fs16BoldWhite.span>Оформить заказ</Fs16BoldWhite.span></ButtonGreen>
                </div>
            </div>
        </Wrapper>
    )
}