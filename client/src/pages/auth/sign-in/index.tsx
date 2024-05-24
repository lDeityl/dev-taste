import React from 'react'
import styles from './index.module.scss'
import { InputEmail, InputPassword, InputPassword_1 } from '../../../ui/inputs/input'
import { Link } from 'react-router-dom'
import { Wrapper } from '../../../components/wrapper'
import { Fs18Fw400Gray, Fs18Fw500White, Fs22BoldWhite, Fs32BoldWhite } from '../../../components/typography'
import { ButtonWhite } from '../../../ui/buttons'
import { useForm } from 'react-hook-form'

export const Login = () => {

    return (
        <Wrapper className={styles.main}>
            <Fs32BoldWhite.span>Войти</Fs32BoldWhite.span>
            <InputEmail type="email" label="Почта" placeholder="Введите Вашу почту" />
            <InputPassword_1 type="password" placeholder="Введите пароль" label="Пароль" />
            <ButtonWhite className={styles.button_1}>
                <Fs22BoldWhite.span style={{ color: 'black' }}>Войти</Fs22BoldWhite.span>
            </ButtonWhite>
            <Link to={'/auth/register'} className={styles.text} >
                <Fs18Fw400Gray.span >Нет аккаунта?</Fs18Fw400Gray.span>
                <Fs22BoldWhite.span>Зарегистрироваться</Fs22BoldWhite.span>
            </Link>
        </Wrapper>
    )
}
