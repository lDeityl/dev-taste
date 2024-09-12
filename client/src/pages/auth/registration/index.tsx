import React from 'react'
import styles from './index.module.scss'
import { InputEmail, InputPassword, InputPassword_1 } from '../../../ui/inputs/input'
import { Link, useNavigate } from 'react-router-dom'
import { Wrapper } from '../../../components/wrapper'
import { Fs18Fw400Gray, Fs18Fw500White, Fs22BoldWhite, Fs32BoldWhite } from '../../../components/typography'
import { ButtonWhite } from '../../../ui/buttons'
import { useForm } from 'react-hook-form'
import { useJwtStore } from '../../../stores/jwt'
import { z } from 'zod'
import { password } from '../../../zodTypes'
import { useMutation } from 'react-query'
import { signUp } from '../../../api'
import { toast } from 'react-toastify'
import { zodResolver } from "@hookform/resolvers/zod";


export const validationSchema = z.object({
    name: z.string().min(1, "Ведите имя"),
    email: z.string().email('Введите почту'),
    password: password,
    confirmPassword: z.string().min(8, 'Неправильный пароль'),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: 'Пароли не совпадают',
            path: ["confirmPassword"]
        });
    }
});

type validationSchema = z.infer<typeof validationSchema>;

export const Registration = () => {

    const navigate = useNavigate();
    const setRole = useJwtStore((state) => state.setRole);
    const setJwt = useJwtStore((state) => state.setJwt);

    const createUser = useMutation({
        mutationFn: signUp,
        onSuccess: (data) => {
            setJwt(data.access_token)
            setRole(data.role)
            navigate(`/profile`)
        },
        onError: (error: any) => {
            toast.error('error');
        }
    })

    const { isLoading } = createUser;

    const onSubmit = (values: validationSchema) => {
        createUser.mutate(values)
    };

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        watch
    } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema),
    });

    return (
        <Wrapper className={styles.main}>
            <Fs32BoldWhite.span>Регистрация</Fs32BoldWhite.span>
            <InputEmail register={register} name={'email'} error={errors.email} type="email" label="Почта" placeholder="Введите Вашу почту" />
            <InputEmail register={register} name={'name'} error={errors.name} type="text" label="Имя пользователя" placeholder="Введите имя пользователя" />
            <InputPassword_1 register={register} name={'password'} error={errors.password} type="password" placeholder="Введите пароль" label="Пароль" />
            <InputPassword_1 register={register} name={'confirmPassword'} error={errors.confirmPassword} type="password" placeholder="Введите пароль" label="Повторите пароль" />
            <ButtonWhite className={styles.button_1} isLoading={isLoading} onClick={handleSubmit(onSubmit)}>
                <Fs22BoldWhite.span style={{ color: 'black' }}>Зарегистрироваться</Fs22BoldWhite.span>
            </ButtonWhite>
            <Link to={'/auth/sign-in'} className={styles.text} >
                <Fs18Fw400Gray.span >Уже существует аккаунт?</Fs18Fw400Gray.span>
                <Fs22BoldWhite.span>Войти в аккаунт</Fs22BoldWhite.span>
            </Link>
        </Wrapper>
    )
}
