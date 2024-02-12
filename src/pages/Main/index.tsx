import React from 'react'
import styles from './index.module.scss'
import { Wrapper } from '../../components/wrapper'
import { HeadLine } from '../../components/headline'
import { FirstSwiper } from './first-swiper'
import { ThirdSwiper } from './third-swiper'
import { Fs16BoldWhite, Fs20Fw400Gray, Fs32BoldWhite } from '../../components/typography'
import { ButtonGray, ButtonGreen } from '../../ui/buttons'
import chicken from '../../assets/images/chickenCafe.png'
import chef from '../../assets/icons/chef.svg'
import onion from '../../assets/icons/onion.svg'
import schick from '../../assets/images/shadowForChicken.png'
import { BlockWithTitle } from '../../components/block-with-title'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { BsLightning } from "react-icons/bs";
import { SecondSwiper } from './second-swiper'
import { Contacts } from '../../components/contacts'
import { useNavigate } from 'react-router-dom'

export const Main = () => {

    const nav = useNavigate();

    return (
        <Wrapper className={styles.main}>
            <section>
                <HeadLine title='Холодные закуски' />
                <FirstSwiper />
            </section>
            <section>
                <HeadLine title='ГОРЯЧИЕ ЗАКУСКИ' />
                <ThirdSwiper />
            </section>
            <section>
                <HeadLine title='Мясные блюда' />
                <SecondSwiper />
            </section>
            <section className={styles.ourCoffe}>
                <div className={styles.leftSide}>
                    <Fs32BoldWhite.h4>НАШЕ КАФЕ</Fs32BoldWhite.h4>
                    <Fs20Fw400Gray.p>Мы расположены в одном из самых живописных мест города — на берегу реки, это ваш оазис в черте города, куда можно сбежать от шумного и пыльного мегаполиса. Мы, действительно уникальные, ведь все продумано до мелочей: проект построен из дикого закарпатского сруба, камин в основном зале ресторана и панорамные окна с видом на реку, уютные беседки на берегу реки и лучшая видовая террасса, шатер с посадкой на 200 человек, сказочный детский домик и бассейн.</Fs20Fw400Gray.p>
                    <ButtonGray className={styles.btnGray} onClick={() => nav('/catalog')}>
                        <Fs16BoldWhite.span>ПОСМОТРЕТЬ МЕНЮ</Fs16BoldWhite.span>
                    </ButtonGray>
                </div>
                <div className={styles.rightSide}>
                    <BlockWithTitle title={'Свежайшие продукты'} image={onion} />
                    <BlockWithTitle title={'Быстрая доставка'} icon={<BsLightning />} />
                    <BlockWithTitle title={'Лучшие повора'} image={chef} />
                    <BlockWithTitle title={'Заказ в 1 клик'} icon={<MdOutlineFavoriteBorder />} />
                </div>
                <img src={chicken} className={styles.chicken} alt="img" />
                <img src={schick} className={styles.chicken2} alt="img" />
            </section>
            <Contacts />
        </Wrapper>
    )
}