import React from 'react'
import styles from './index.module.scss'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PanelMain } from './panel';
import { Fs14Fw400Black, Fs14Fw400Gray, Fs18Fw400Black, Fs18Fw400Gray } from '../components/typography';
import img from '../assets/images/action/action2.png'
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

interface Navigation {
    title: string;
    link: string;
    icon: React.ElementType;
}

interface NavMain {
    title: string;
    icon: React.ElementType;
    navigation: Navigation[];
}

const linksNav: NavMain[] = [
    {
        title: 'Главная панель',
        icon: HiOutlineSquares2X2,
        navigation: [
            { title: 'Панель управления', link: '/admin-panel/', icon: HiOutlineSquares2X2 },
            { title: 'Пользователи', link: '/admin-panel/users', icon: HiOutlineSquares2X2 },
            { title: 'Админы', link: '/admin-panel/admins', icon: HiOutlineSquares2X2 },
            { title: 'Партнеры', link: '/admin-panel/partners', icon: HiOutlineSquares2X2 },
            { title: 'Заявки', link: '/admin-panel/applications', icon: HiOutlineSquares2X2 },
            { title: 'Заявки на вывод', link: '/admin-panel/withdrawal-applications', icon: HiOutlineSquares2X2 },
            { title: 'Письма', link: '/admin-panel/emails', icon: HiOutlineSquares2X2 },
            { title: 'Отзывы', link: '/admin-panel/reviews', icon: HiOutlineSquares2X2 },
            { title: 'Акция', link: '/admin-panel/promotions', icon: HiOutlineSquares2X2 },
        ]
    },
    {
        title: 'Обменник',
        icon: TbTruckDelivery,
        navigation: [
            { title: 'Акция', link: '/admin-panel/promotions', icon: TbTruckDelivery },
            { title: 'Пользователи', link: '/admin-panel/users', icon: TbTruckDelivery },
        ]
    },
    {
        title: 'Настройки',
        icon: MdOutlineAdminPanelSettings,
        navigation: [
            { title: 'Заявки', link: '/admin-panel/applications', icon: MdOutlineAdminPanelSettings },
            { title: 'Пользователи', link: '/admin-panel/users', icon: MdOutlineAdminPanelSettings },
            { title: 'Админы', link: '/admin-panel/admins', icon: MdOutlineAdminPanelSettings },
            { title: 'Заявки', link: '/admin-panel/applications', icon: MdOutlineAdminPanelSettings },
        ]
    }
]

function AdminPanelRoutes() {

    const loc = useLocation();

    return (
        <div className={styles.wrapper}>
            <aside>
                <div className={styles.logo}>
                    <Fs18Fw400Black.span>DEV - TASTE </Fs18Fw400Black.span>
                    <Fs18Fw400Gray.span>| Admin panel</Fs18Fw400Gray.span>
                </div>
                <div className={styles.profile}>
                    <img src={img} alt="avatar" className={styles.avatar} />
                    <div className={styles.col}>
                        <Fs14Fw400Black.span>Admin Dev</Fs14Fw400Black.span>
                        <Fs14Fw400Gray.span>liveof@admin.ex</Fs14Fw400Gray.span>
                    </div>
                </div>
                <nav>
                    {linksNav.map((mainNav, idx) => (
                        <div className={styles.navigate} key={idx}>
                            <div className={styles.mainCategory}>
                                <span className={styles.iconMain}>{React.createElement(mainNav.icon)}</span>
                                <Fs18Fw400Black.span>{mainNav.title}</Fs18Fw400Black.span>
                            </div>
                            <div className={styles.subNavigation}>
                                {mainNav.navigation.map((subNav, subIdx) => (
                                    <Link to={subNav.link} key={subIdx} className={`${styles.subCategory} ${loc.pathname.startsWith(subNav.link) ? styles.active : ''}`}>
                                        <span className={styles.iconMain2}>{React.createElement(subNav.icon)}</span>
                                        <Fs14Fw400Black.span>{subNav.title}</Fs14Fw400Black.span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
            </aside>
            <div className={styles.routes}>
                <Routes>
                    <Route path='/' element={<PanelMain />}></Route>
                    <Route path="*" element={<Navigate to="/admin-panel/" replace />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminPanelRoutes;
