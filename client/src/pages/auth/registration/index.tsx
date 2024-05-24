import React from 'react'
import styles from './index.module.scss'
import { InputEmail, InputPassword, InputPassword_1 } from '../../../ui/inputs/input'
import { Link } from 'react-router-dom'
import { Wrapper } from '../../../components/wrapper'
import { Fs18Fw400Gray, Fs18Fw500White, Fs22BoldWhite, Fs32BoldWhite } from '../../../components/typography'
import { ButtonWhite } from '../../../ui/buttons'
import { useForm } from 'react-hook-form'

export const Registration = () => {

    return (
        <Wrapper className={styles.main}>
            <Fs32BoldWhite.span>Регистрация</Fs32BoldWhite.span>
            <InputEmail type="email" label="Почта" placeholder="Введите Вашу почту" />
            <InputEmail type="text" label="Имя пользователя" placeholder="Введите имя пользователя" />
            <InputPassword_1 type="password" placeholder="Введите пароль" label="Пароль" />
            <InputPassword_1 type="password" placeholder="Введите пароль" label="Повторите пароль" />
            <ButtonWhite className={styles.button_1}>
                <Fs22BoldWhite.span style={{ color: 'black' }}>Зарегистрироваться</Fs22BoldWhite.span>
            </ButtonWhite>
            <Link to={'/auth/sign-in'} className={styles.text} >
                <Fs18Fw400Gray.span >Уже существует аккаунт?</Fs18Fw400Gray.span>
                <Fs22BoldWhite.span>Войти в аккаунт</Fs22BoldWhite.span>
            </Link>
        </Wrapper>
    )
}
