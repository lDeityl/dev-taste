import React, { useState } from 'react'
import styles from './index.module.scss'
import { Wrapper } from '../wrapper'
import { Fs12Fw300White, Fs12Fw500Black, Fs13Fw400Gray, Fs14Fw500White, Fs16BoldWhite, Fs16Fw400White, Fs18Fw400Gray, Fs25BoldWhite } from '../typography'
import { InputSearch } from '../../ui/inputs/input'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiPhoneCall } from "react-icons/fi";
import { useIsAuthenticated } from '../../utils/requireAuth'
import { VisibleDesktop1280, VisibleHandheld1280 } from '../../utils/visibleComponents'
import buy from '../../assets/images/Buy.png'
import { RxCross2 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";

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
    const nav = useNavigate();

    const checkIsActive = (path: string) => location.pathname === path;

    const isAuthed = useIsAuthenticated();

    const [isBurger, setBurger] = useState<boolean>(false);

    return (
        <>
            <VisibleDesktop1280>
                <header className={styles.header}>
                    <div className={styles.up}>
                        <Wrapper className={styles.rowOne}>
                            <Link to={'/'} className={styles.sadasds} >
                                <Fs25BoldWhite.h1>DEV - TASTE</Fs25BoldWhite.h1>
                            </Link>
                            <InputSearch className={styles.input} type='text' placeholder='Введите название блюда' search />
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
                                    <Fs18Fw400Gray.span style={{ color: !checkIsActive(el.link) ? '#cfcfcf' : '' }} className={checkIsActive(el.link) ? styles.activeSpan : ''}>{el.title}</Fs18Fw400Gray.span>
                                </Link>
                            ))}
                            {isAuthed ?
                                <Link to="/profile">
                                    <Fs18Fw400Gray.span style={{ color: !checkIsActive('/profile') ? '#cfcfcf' : '' }} className={checkIsActive('/profile') ? styles.activeSpan : ''}>Профиль</Fs18Fw400Gray.span>
                                </Link>
                                :
                                <Link to="/auth/register">
                                    <Fs18Fw400Gray.span style={{ color: !checkIsActive('/auth/register') ? '#cfcfcf' : '' }} className={checkIsActive('/auth/register') || checkIsActive('/auth/sign-in') ? styles.activeSpan : ''}>Вход / Регистрация</Fs18Fw400Gray.span>
                                </Link>
                            }
                        </Wrapper>
                    </div>
                </header>
            </VisibleDesktop1280>
            <VisibleHandheld1280>
                <header className={styles.header}>
                    <Wrapper className={`${styles.up} ${styles.mobileFull}`}>
                        <div className={styles.mobileUp}>
                            {isBurger ?
                                <RxCross2 onClick={() => setBurger(el => !el)} className={styles.iconBurger} />
                                :
                                <RxHamburgerMenu onClick={() => setBurger(el => !el)} className={styles.iconBurger} />
                            }
                            <Link to={'/'} className={styles.sadasds} >
                                <Fs25BoldWhite.h1>DEV - TASTE</Fs25BoldWhite.h1>
                            </Link>
                            <div className={styles.cart} onClick={() => nav('/cart')}>
                                <img src={buy} alt="icon-buy" />
                                <Fs12Fw300White.span>корзина</Fs12Fw300White.span>
                            </div>
                        </div>
                    </Wrapper>
                    {isBurger &&
                        <div className={styles.hrTOp}>
                            <Wrapper className={styles.linksMobile}>
                                {links.map((el, idx) => (
                                    <Link to={el.link} key={idx} onClick={() => setBurger(false)} style={{ cursor: 'pointer' }}>
                                        <Fs14Fw500White.span className={checkIsActive(el.link) ? styles.activeSpan : ''}>{el.title}</Fs14Fw500White.span>
                                    </Link>
                                ))}
                            </Wrapper>
                        </div>
                    }
                </header>
            </VisibleHandheld1280>
        </>
    )
}
