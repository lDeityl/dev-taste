import React from 'react'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { Wrapper } from '../wrapper';
import { Fs12Fw500Black, Fs16Fw400White } from '../typography';
import discord from "../../assets/icons/discord.png"
import vk from "../../assets/icons/vk.png"
import youtube from "../../assets/icons/youtube.png"
import telegram from "../../assets/icons/telegram.png"
import logo from '../../assets/icons/logo.svg'

interface ItemWithoutImage {
    link: string;
    title: string;
}

interface ItemWithImage extends ItemWithoutImage {
    image: string;
}

type MenuItem = ItemWithoutImage | ItemWithImage;

interface FooterItem {
    name: string;
    first: MenuItem[];
}

const items: FooterItem[] = [
    {
        name: 'DEV - TASTE',
        first: [
            {
                link: '',
                title: 'Пользовательское соглашение',
            },
            {
                link: '',
                title: 'Карта сайта',
            },
            {
                link: '',
                title: 'Политика конфиденциальности',
            },
        ]
    },
    {
        name: 'О нас',
        first: [
            {
                link: '',
                title: 'О ресторане',
            },
            {
                link: '',
                title: 'Условия доставки',
            },
            {
                link: '',
                title: 'Возврат товара',
            },
            {
                link: '',
                title: 'Акции',
            },
        ]
    },
    {
        name: 'Как нас найти?',
        first: [
            {
                link: '',
                image: youtube,
                title: 'YouTube',
            },
            {
                link: '',
                image: telegram,
                title: 'Telegram',
            },
            {
                link: '',
                image: vk,
                title: 'Вконтакте',
            },
            {
                link: '',
                image: discord,
                title: 'Discord',
            },
        ]
    }
]

export const Footer = () => {
    return (
        <footer className={styles.main_1}>
            <Wrapper className={styles.main}>
                <div className={styles.blocks_1}>
                    {items.map((el, idx) => (
                        <div className={styles.blocks} key={idx}>
                            <span className={styles.span}>{el.name} {el.name === 'DEV - TASTE' && <img src={logo} alt="" />}</span>
                            <div className={styles.column}>
                                {el.first.map((item, index) => (
                                    <Link to={item.link} key={index} className={styles.link}>
                                        {('image' in item) && <img src={item.image} alt={item.title} className={styles.image} />}
                                        <Fs16Fw400White.span>{item.title}</Fs16Fw400White.span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Wrapper>
            <Fs12Fw500Black.span className={styles.rules}>© ООО СК «АПШЕРОН» Все права защищены. 2010-2024</Fs12Fw500Black.span>
        </footer>
    )
}
