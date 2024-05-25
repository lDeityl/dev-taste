import React from 'react'
import styles from './index.module.scss'
import { InputEmail, InputPassword, InputPassword_1 } from '../../../ui/inputs/input'
import { Link, useNavigate } from 'react-router-dom'
import { Wrapper } from '../../../components/wrapper'
import { Fs18Fw400Gray, Fs18Fw500White, Fs22BoldWhite, Fs32BoldWhite } from '../../../components/typography'
import { ButtonWhite } from '../../../ui/buttons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { z } from 'zod'
import { password } from '../../../zodTypes'
import { useMutation } from 'react-query'
import { signIn } from '../../../api'
import { useJwtStore } from '../../../stores/jwt'

export const validationSchema = z.object({
    email: z.string().email('Введите email'),
    password: password,
});

type validationSchema = z.infer<typeof validationSchema>;

export const Login = () => {

    const setRole = useJwtStore((state) => state.setRole);
    const setJwt = useJwtStore((state) => state.setJwt);
    const setEmailActivated = useJwtStore((state) => state.setEmailActivated);
    const setTwoFactorAuthenticationEnabled = useJwtStore((state) => state.setTwoFactorAuthenticationEnabled);

    const navigate = useNavigate();

    const logUser = useMutation({
        mutationFn: signIn,
        onSuccess: async (data) => {
            setJwt(data.access_token)
            setRole(data.role)
            setEmailActivated(data.isEmailActivated)
            setTwoFactorAuthenticationEnabled(data.isTwoFactorAuthenticationEnabled)

            if (!data.isEmailActivated) {
                return navigate('/auth/email-confirm')
            }

            if (!data.isEmailActivated) {
                return navigate('/auth/confirm-email')
            }

            navigate("/profile/")
        },
        onError: (error: any) => {
            toast.error('Неправильные данные')
        }
    })

    const { isLoading } = logUser;

    const onSubmit = (values: validationSchema) => {
        logUser.mutate(values)
    };

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema),
    });

    return (
        <Wrapper className={styles.main}>
            <Fs32BoldWhite.span>Войти</Fs32BoldWhite.span>
            <InputEmail register={register} name={'email'} error={errors.email} type="email" label="Почта" placeholder="Введите Вашу почту" />
            <InputPassword_1 register={register} name={'password'} error={errors.password} type="password" placeholder="Введите пароль" label="Пароль" />
            <ButtonWhite className={styles.button_1} isLoading={isLoading} onClick={handleSubmit(onSubmit)}>
                <Fs22BoldWhite.span style={{ color: 'black' }}>Войти</Fs22BoldWhite.span>
            </ButtonWhite>
            <Link to={'/auth/register'} className={styles.text} >
                <Fs18Fw400Gray.span >Нет аккаунта?</Fs18Fw400Gray.span>
                <Fs22BoldWhite.span>Зарегистрироваться</Fs22BoldWhite.span>
            </Link>
        </Wrapper>
    )
}
