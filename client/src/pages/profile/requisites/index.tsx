import React from 'react'
import styles from './index.module.scss'
import { InputEmail } from '../../../ui/inputs/input'
import { ButtonGreen, ButtonGreenBorder } from '../../../ui/buttons'
import { Fs18Fw500White, Fs22BoldWhite, Fs25BoldWhite } from '../../../components/typography'
import cart from '../../../assets/images/cold/meat-2.png';

export const Requisites = () => {
    return (
        <div className={styles.reqBlock}>
            <div className={styles.left}>
                <Fs22BoldWhite.span>Ваши реквизиты</Fs22BoldWhite.span>
                <div className={styles.blocks}>
                    <div className={styles.item}>
                        <img src={cart} alt="cart" />
                        <div className={styles.rightSideCart}>
                            <Fs18Fw500White.span>1234123412341234</Fs18Fw500White.span>
                            <ButtonGreenBorder>Удалить</ButtonGreenBorder>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img src={cart} alt="cart" />
                        <div className={styles.rightSideCart}>
                            <Fs18Fw500White.span>1234123412341234</Fs18Fw500White.span>
                            <ButtonGreenBorder>Удалить</ButtonGreenBorder>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <img src={cart} alt="cart" />
                        <div className={styles.rightSideCart}>
                            <Fs18Fw500White.span>1234123412341234</Fs18Fw500White.span>
                            <ButtonGreenBorder>Удалить</ButtonGreenBorder>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.right}>
                <Fs25BoldWhite.span>Данные карты</Fs25BoldWhite.span>
                <InputEmail type='text' placeholder='ФИО' label='ФИО' />
                <InputEmail type='text' placeholder='1234123412341234' label='Номер счета' />
                <InputEmail type='text' placeholder='1232' label='MM/YY' />
                <InputEmail type='password' placeholder='****' label='PIN-код' />
                <ButtonGreen><Fs18Fw500White.span>Сохранить</Fs18Fw500White.span></ButtonGreen>
            </div>
        </div>
    )
}
