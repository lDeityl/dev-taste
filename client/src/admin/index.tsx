import React from 'react'
import styles from './index.module.scss'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { PanelMain } from './panel';
import { Fs14Fw400Black, Fs14Fw400Gray, Fs18Fw400Black, Fs18Fw400Gray } from '../components/typography';
import img from '../assets/images/action/action2.png'
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { Users } from './users';
import { Admins } from './admins';
import { Categories } from './categories';
import { Products } from './products';
import { Stock } from './stock';
import { FAQ } from './faq';
import { Settings } from './settings';
import { useQuery } from 'react-query';
import { getAdminById } from '../api';
import { CategoriesMenu } from './categories-menu';

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
            { title: 'Панель управления', link: '/admin-panel/panel', icon: HiOutlineSquares2X2 },
            { title: 'Пользователи', link: '/admin-panel/users', icon: HiOutlineSquares2X2 },
            { title: 'Админы', link: '/admin-panel/admins', icon: HiOutlineSquares2X2 },
            { title: 'Компании', link: '/admin-panel/companies', icon: HiOutlineSquares2X2 },
            { title: 'Категории меню', link: '/admin-panel/categories', icon: HiOutlineSquares2X2 },
            { title: 'Продукты', link: '/admin-panel/products', icon: HiOutlineSquares2X2 },
            { title: 'Акции', link: '/admin-panel/stock', icon: HiOutlineSquares2X2 },
            { title: 'FAQ', link: '/admin-panel/faq', icon: HiOutlineSquares2X2 },
        ]
    },
    // {
    //     title: 'Обменник',
    //     icon: TbTruckDelivery,
    //     navigation: [
    //         { title: 'Акция', link: '/admin-panel/promotions', icon: TbTruckDelivery },
    //         { title: 'Пользователи', link: '/admin-panel/users', icon: TbTruckDelivery },
    //     ]
    // },
    {
        title: 'Настройки',
        icon: MdOutlineAdminPanelSettings,
        navigation: [
            { title: 'Настройки', link: '/admin-panel/settings', icon: MdOutlineAdminPanelSettings },
        ]
    }
]

function AdminPanelRoutes() {

    const loc = useLocation();

    const { data } = useQuery({
        queryFn: getAdminById,
        queryKey: ['admin-by-id'],
        keepPreviousData: true
    })

    return (
        <div className={styles.wrapper}>
            <aside>
                <div className={styles.logo}>
                    <Fs18Fw400Black.span>DEV - TASTE </Fs18Fw400Black.span>
                    <Fs18Fw400Gray.span>| Admin panel</Fs18Fw400Gray.span>
                </div>
                <div className={styles.profile}>
                    <img src={data?.imgURL} alt="avatar" className={styles.avatar} />
                    <div className={styles.col}>
                        <Fs14Fw400Black.span>{data?.name}</Fs14Fw400Black.span>
                        <Fs14Fw400Gray.span>{data?.email}</Fs14Fw400Gray.span>
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
                    <Route path='/panel' element={<PanelMain />}></Route>
                    <Route path='/users' element={<Users />}></Route>
                    <Route path='/admins' element={<Admins />}></Route>
                    <Route path='/companies' element={<Categories />}></Route>
                    <Route path='/categories' element={<CategoriesMenu />}></Route>
                    <Route path='/products' element={<Products />}></Route>
                    <Route path='/stock' element={<Stock />}></Route>
                    <Route path='/faq' element={<FAQ />}></Route>
                    <Route path='/settings' element={<Settings />}></Route>
                    <Route path="*" element={<Navigate to="/admin-panel/panel" replace />} />
                </Routes>
            </div>
        </div>
    )
}

export default AdminPanelRoutes;
