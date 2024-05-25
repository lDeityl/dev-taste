import React, { useEffect, useState } from 'react'
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
import { code, password } from '../../../zodTypes'
import { useMutation } from 'react-query'
import { confirmEmail, sendEmail, signIn } from '../../../api'
import { useJwtStore } from '../../../stores/jwt'
import { CountdownTimer } from '../../../components/timer'

const validationSchema = z.object({
    code,
});

type validationSchema = z.infer<typeof validationSchema>;

export const ConfirmEmail = () => {

    const setRole = useJwtStore((state) => state.setRole);
    const setJwt = useJwtStore((state) => state.setJwt);
    const [dateTime, setDateTime] = useState<number>(0);
    const setEmailActivated = useJwtStore((state) => state.setEmailActivated);
    const navigate = useNavigate();

    const confirmEmail_ = useMutation({
        mutationFn: confirmEmail,
        onSuccess: (data) => {
            setJwt(data.access_token)
            setRole(data.role)
            setEmailActivated(data.isEmailActivated)
            navigate("/profile/")
        },
        onError: (error: any) => {
            console.log(error)
            toast.error("Неправильний код")
        }
    })

    const { isLoading } = confirmEmail_;

    useEffect(() => {
        sendEmail()
    }, [])

    const onSubmit = (values: validationSchema) => {
        confirmEmail_.mutate(values)
    };

    const {
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const resendCode = () => {
        const SIXTY_SECONDS_IN_MS = 60 * 1000;
        const NOW_IN_MS = new Date().getTime();

        const dateTimeAfterSixtySeconds = NOW_IN_MS + SIXTY_SECONDS_IN_MS;

        setDateTime(dateTimeAfterSixtySeconds)

        sendEmail()
    }

    return (
        <Wrapper className={styles.main}>
            <Fs32BoldWhite.span>Подтвердить email</Fs32BoldWhite.span>
            <InputEmail register={register} name={'code'} error={errors.code} type="text" label="Код" placeholder="Введите код" />
            <CountdownTimer targetDate={dateTime} >
                <p onClick={resendCode} >Отправить повторно</p>
            </CountdownTimer>
            <ButtonWhite className={styles.button_1} isLoading={isLoading} onClick={handleSubmit(onSubmit)}>
                <Fs22BoldWhite.span style={{ color: 'black' }}>Подтвердить</Fs22BoldWhite.span>
            </ButtonWhite>
        </Wrapper>
    )
}
