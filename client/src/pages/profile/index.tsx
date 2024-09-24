import React from 'react'
import { useQuery } from 'react-query'
import { getUserById } from '../../api'
import { Wrapper } from '../../components/wrapper'
import styles from './index.module.scss'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { ProfileMain } from './main'
import { Address } from './favourite'
import { History } from './history'
import { HeadLine } from '../../components/headline'
import { Fs16Fw400White, Fs18Fw500White, Fs32BoldWhite } from '../../components/typography'
import { ButtonGreen } from '../../ui/buttons'
import { Requisites } from './requisites'
import { useJwtStore } from '../../stores/jwt'
import { Curtain } from '../../components/curtain'

export const Profile = () => {

    const { data } = useQuery({
        queryFn: getUserById,
        queryKey: ['profile-info'],
        keepPreviousData: true
    })

    const { clearAll } = useJwtStore()
    const loc = useLocation();

    if (!data) return <></>

    return (
        <Wrapper className={styles.wrapper}>
            <Curtain />
            <HeadLine title='Личный кабинет' />
            <div className={styles.upNavbar}>
                <div className={styles.helloExit}>
                    <Fs32BoldWhite.h2>Привет, {data?.name}</Fs32BoldWhite.h2>
                    <ButtonGreen onClick={clearAll}><Fs16Fw400White.span>Выйти</Fs16Fw400White.span></ButtonGreen>
                </div>
                <nav className={styles.navigation}>
                    <Link to='/profile' className={styles.link}><Fs18Fw500White.span>Главная</Fs18Fw500White.span></Link>
                    <Link to='/profile/address' className={styles.link}><Fs18Fw500White.span>Адреса</Fs18Fw500White.span></Link>
                    <Link to='/profile/requisites' className={styles.link}><Fs18Fw500White.span>Реквизиты</Fs18Fw500White.span></Link>
                    <Link to='/profile/history' className={styles.link}><Fs18Fw500White.span>История</Fs18Fw500White.span></Link>
                </nav>
            </div>
            <div className={styles.routes}>
                <Routes>
                    <Route path='/' element={<ProfileMain {...data} />}></Route>
                    <Route path='/address' element={<Address id={data.id} />}></Route>
                    <Route path='/history' element={<History />}></Route>
                    <Route path='/requisites' element={<Requisites />}></Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Wrapper>
    )
}
