import React from 'react'
import styles from './index.module.scss'
import { ButtonGreen } from '../../ui/buttons'
import { Fs30BoldWhite, Fs13Fw400Gray, Fs16BoldWhite, Fs13Fw500White, Fs32BoldWhite } from '../typography'
import here from '../../assets/images/here.png'
import map from '../../assets/images/map.png'
import message from '../../assets/icons/Message.png'
import loc from '../../assets/icons/Location.png'

export const Contacts = () => {
    return (
        <section className={styles.contacts}>
            <div className={styles.section}>
                <Fs30BoldWhite.span className={styles.spanContacts}>КОНТАКТЫ</Fs30BoldWhite.span>
                <div className={styles.hrCustom} />
                <div className={styles.data}>
                    <div className={styles.address}>
                        <img src={loc} alt="" />
                        <div className={styles.right}>
                            <Fs13Fw400Gray.span>Наш адрес:</Fs13Fw400Gray.span>
                            <Fs16BoldWhite.span>МО, городской округ Красногорск, село Ильинкое, Экспериментальная улица, 10</Fs16BoldWhite.span>
                        </div>
                    </div>
                    <div className={styles.address}>
                        <img src={message} alt="" />
                        <div className={styles.right}>
                            <Fs13Fw400Gray.span>Наша почта:</Fs13Fw400Gray.span>
                            <Fs16BoldWhite.span>auto.wash@gmail.com</Fs16BoldWhite.span>
                        </div>
                    </div>
                </div>
                <div className={styles.hrCustom} />
                <div className={styles.bron}>
                    <ButtonGreen className={styles.greenBron}>
                        <Fs13Fw500White.span>ЗАБРОНИРОВАТЬ СТОЛ</Fs13Fw500White.span>
                    </ButtonGreen>
                    <div className={styles.phone}>
                        <Fs32BoldWhite.span>+7 (917) 510-57-59</Fs32BoldWhite.span>
                        <Fs13Fw400Gray.span>Звоните или оставляйте заявку</Fs13Fw400Gray.span>
                    </div>
                </div>
            </div>
            <img src={map} alt="map" className={styles.map} />
            <img src={here} className={styles.here} alt="dot" />
        </section>
    )
}
