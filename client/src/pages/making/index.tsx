import React from 'react'
import { Wrapper } from '../../components/wrapper'
import { HeadLine } from '../../components/headline'
import styles from './index.module.scss'
import { VisibleDesktop900 } from '../../utils/visibleComponents'
import { Fs18Fw500White } from '../../components/typography'
import { Input } from '../../ui/inputs/input'

export const Making = () => {
    return (
        <Wrapper className={styles.wrap}>
            <HeadLine title='ОФОРМЛЕНИЕ ЗАКАЗА' />
            <div className={styles.blocks}>
                <div className={styles.first}>
                    <Fs18Fw500White.span>1. Контактная информация</Fs18Fw500White.span>
                    <div className={styles.inputs}>
                        <Input className={styles.firstinp} name={'name'} type="text" placeholder="Имя*" />
                        <Input className={styles.firstinp} name={'name'} type="text" placeholder="Телефон*" />
                    </div>
                </div>
                <div className={styles.second}>
                    <Fs18Fw500White.span>2. Доставка</Fs18Fw500White.span>
                    <div className={styles.dostavka}>
                        <div className={styles.but}>
                            <button className={styles.but1}>Доставка</button>
                            <button className={styles.but2}>Самовывоз</button>
                        </div>
                        <Fs18Fw500White.span>Доставим через  1 час 30 минут</Fs18Fw500White.span>
                    </div>
                    <Fs18Fw500White.span>Адрес доставки</Fs18Fw500White.span>
                    <div className={styles.inputssecond}>
                        <Input className={styles.secondinp} name={'name'} type="text" placeholder="Укажите улицу*" />
                        <Input className={styles.threeinp} name={'name'} type="text" placeholder="Номер дома*" />
                    </div>
                    <div className={styles.inputsthree}>
                        <Input className={styles.forinp} name={'name'} type="text" placeholder="№ квартиры/офиса" />
                        <Input className={styles.threeinp} name={'name'} type="text" placeholder="Подъезд" />
                        <Input className={styles.threeinp} name={'name'} type="text" placeholder="Этаж" />
                    </div>
                    <div className={styles.inputsfor}>
                        <Input className={styles.fiveinp} name={'name'} type="text" placeholder="Коментарий" />
                    </div>
                </div>
                <div className={styles.three}>
                    <Fs18Fw500White.span>3. Оплатить</Fs18Fw500White.span>
                    <div className={styles.buton}>
                        <button className={styles.but3}>Оплата онлайн</button>
                        <button className={styles.but3}>Курьеру картой</button>
                        <button className={styles.but4}>Наличными</button>
                    </div>
                    <Input className={styles.sdacha} name={'name'} type="text" placeholder="Сдача с" />
                </div>
                <div className={styles.four}>
                    <Fs18Fw500White.span>4. Когда доставить</Fs18Fw500White.span>
                    <div className={styles.dostav}>
                        <div className={styles.buton}>
                            <button className={styles.but3}>В ближайшее время</button>
                            <button className={styles.but4}>Ко времени</button>
                        </div>
                        <Input className={styles.time} name={'name'} type="text" placeholder="Укажите время" />
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}