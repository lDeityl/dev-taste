import React, { useState } from 'react'
import styles from './index.module.scss'
import { Wrapper } from '../wrapper'
import { Fs12Fw300White, Fs12Fw500Black, Fs13Fw400Gray, Fs14Fw500White, Fs16BoldWhite, Fs16Fw400White, Fs18Fw400Gray, Fs25BoldWhite } from '../typography'
import { InputSearch } from '../../ui/inputs/input'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiPhoneCall } from "react-icons/fi";
import logo from '../../assets/icons/logo.svg'

const links = [
    {
        link: '/',
        title: 'Главная'
    },
    {
        link: '/catalog',
        title: 'Меню'
    },
    {
        link: '/action',
        title: 'Акции'
    },
    {
        link: '/delivery',
        title: 'Доставка'
    },
    {
        link: '/cart',
        title: 'Корзина'
    },
];

export const Header = () => {

    const location = useLocation();

    const checkIsActive = (path: string) => location.pathname === path;
    const nav = useNavigate();

    return (
        <header className={styles.header}>
            <div className={styles.up}>
                <Wrapper className={styles.rowOne}>
                    <Link to={'/'} className={styles.sadasds} >
                        <Fs25BoldWhite.h1>DEV - TASTE</Fs25BoldWhite.h1>
                        <img src={logo} alt="" />
                    </Link>
                    <InputSearch className={styles.input} type='text' placeholder='Введите адрес доставки' search />
                    <div className={styles.phone}>
                        <a href='tel:' className={styles.iconPhone}>
                            <FiPhoneCall />
                        </a>
                        <div className={styles.contacts}>
                            <Fs13Fw400Gray.span>Контакты:</Fs13Fw400Gray.span>
                            <Fs16BoldWhite.span>+7 (917) 510-57-59</Fs16BoldWhite.span>
                        </div>
                    </div>
                    <div className={styles.cart} onClick={() => nav('/cart')}>
                        <Fs14Fw500White.span>Корзина</Fs14Fw500White.span>
                        <div className={styles.unvisibleSqr}>
                            <div className={styles.circle}>
                                <Fs12Fw500Black.span>0</Fs12Fw500Black.span>
                            </div>
                        </div>
                    </div>
                </Wrapper>
            </div>
            <div className={styles.bot}>
                <Wrapper className={styles.navBottom}>
                    {links.map((el, idx) => (
                        <Link to={el.link} key={idx}>
                            <Fs18Fw400Gray.span className={checkIsActive(el.link) ? styles.activeSpan : ''}>{el.title}</Fs18Fw400Gray.span>
                        </Link>
                    ))}
                    <Link to="/auth/register">
                        <Fs18Fw400Gray.span className={checkIsActive('/auth/register') ? styles.activeSpan : ''}>Вход / Регистрация</Fs18Fw400Gray.span>
                    </Link>
                </Wrapper>
            </div>
        </header>
    )
}
