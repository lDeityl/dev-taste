import React from 'react'
import styles from './index.module.scss'
import { Wrapper } from '../../components/wrapper'
import { HeadLine } from '../../components/headline'
import { AccordionDevTaste } from './components/accordion'
import minimap from '../../assets/images/minimap.png'
import { Fs22BoldWhite } from '../../components/typography'

export const Delivery = () => {

    return (
        <Wrapper>
            <HeadLine title='Условия доставки' />
            <div className={styles.block}>
                <div className={styles.upWithAccordion}>
                    <AccordionDevTaste />
                    <img src={minimap} className={styles.imageAcc} alt="imageMap" />
                </div>
                <div className={styles.graph}>
                    <div className={styles.upDel}>
                        <div className={styles.tel}>
                            <Fs22BoldWhite.span>График работы доставки:</Fs22BoldWhite.span>
                            <Fs22BoldWhite.span className={styles.fontwe}>с 10:00-21:00</Fs22BoldWhite.span>
                        </div>
                        <div className={styles.tel}>
                            <Fs22BoldWhite.span>График работы кафе:</Fs22BoldWhite.span>
                            <Fs22BoldWhite.span className={styles.fontwe}>с 08:00-21:00</Fs22BoldWhite.span>
                        </div>
                    </div>
                    <div className={styles.texts}>
                        <Fs22BoldWhite.span>Минимальный заказ:</Fs22BoldWhite.span>
                        <Fs22BoldWhite.p className={styles.fontwe}>Бесплатная доставка пешим курьером при сумме заказа от 400 ₽ Доставка оператором такси от любой суммы заказа - по тарифам перевозчика.</Fs22BoldWhite.p>
                    </div>
                </div>
            </div>
        </Wrapper>
    )

}