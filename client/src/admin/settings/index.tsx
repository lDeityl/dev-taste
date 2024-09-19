import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { PopupComponent } from '../components/popup'
import { Fs13Fw300Black, Fs16Fw400Black, Fs32BoldBlack } from '../../components/typography'
import { ButtonGreen, ButtonGreenBorder } from '../../ui/buttons'
import { z } from 'zod'
import { ISettings } from '../../interfaces'
import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getSettingsAdmin, updateSettingsAdmin } from '../../api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { getNormalDate } from '../../utils/normalDate'
import { InputAdmin } from '../../ui/inputs/input'

export interface PopUpVisibleSettings {
    visibility: boolean;
    data: ISettings | null;
}

export const validationSchema = z.object({
    id: z.number().optional(),
    contactsPhone: z.string().min(1, 'Введите хотя бы 1 символ'),
    delivery_schedule: z.string().min(1, 'Введите хотя бы 1 символ'),
    cafe_opening_hours: z.string().min(1, 'Введите хотя бы 1 символ'),
    address: z.string().min(1, 'Введите хотя бы 1 символ'),
    email: z.string().min(1, 'Введите хотя бы 1 символ'),
    about_title: z.string().min(1, 'Введите хотя бы 1 символ'),
    about_description: z.string().min(1, 'Введите хотя бы 1 символ'),
})

type validationSchema = z.infer<typeof validationSchema>;

export const Settings = () => {

    const queryClient = useQueryClient();

    const createSettings_ = useMutation({
        mutationFn: updateSettingsAdmin,
        onSuccess: (data) => {
            toast.success("Успешно");
            queryClient.invalidateQueries(['admin-settings']);
            setIsPopUpVisible({ visibility: false, data: null })
        },
        onError: () => {
            toast.error("Ошибка");
        },
    });

    const {
        setValue,
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const { data: el } = useQuery({
        queryFn: getSettingsAdmin,
        queryKey: ['admin-settings'],
        keepPreviousData: true,
    });

    const [isPopUpVisible, setIsPopUpVisible] = useState<PopUpVisibleSettings>({
        visibility: false,
        data: null,
    });

    const onSubmit = async (values: validationSchema) => {
        createSettings_.mutate({ ...values, id: isPopUpVisible.data?.id });
    };

    useEffect(() => {
        if (isPopUpVisible.data) {
            setValue('id', isPopUpVisible.data.id);
            setValue('contactsPhone', isPopUpVisible.data.contactsPhone);
            setValue('delivery_schedule', isPopUpVisible.data.delivery_schedule);
            setValue('cafe_opening_hours', isPopUpVisible.data.cafe_opening_hours);
            setValue('address', isPopUpVisible.data.address);
            setValue('email', isPopUpVisible.data.email);
            setValue('about_title', isPopUpVisible.data.about_title);
            setValue('about_description', isPopUpVisible.data.about_description);
        } else {
            reset();
        }
    }, [isPopUpVisible, setValue, reset]);

    const openEditSettingsPopup = (category: ISettings) => {
        setIsPopUpVisible({ visibility: true, data: category });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleBlock}>
                <Fs32BoldBlack.span>Настройки</Fs32BoldBlack.span>
                <ButtonGreenBorder onClick={() => setIsPopUpVisible({ visibility: true, data: null })}><Fs16Fw400Black.span>+ Добавить настройки</Fs16Fw400Black.span></ButtonGreenBorder>
            </div>
            <div className={styles.block}>
                {el &&
                    <div className={styles.item} key={el.id}>
                        <div className={styles.bl}>
                            <Fs13Fw300Black.span>Телефон</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.contactsPhone}</Fs16Fw400Black.span>
                        </div>
                        <div className={styles.bl}>
                            <Fs13Fw300Black.span>Почта</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.email}</Fs16Fw400Black.span>
                        </div>
                        <div className={styles.bl}>
                            <Fs13Fw300Black.span>График доставки</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.delivery_schedule}</Fs16Fw400Black.span>
                        </div>
                        <div className={styles.bl}>
                            <Fs13Fw300Black.span>График кафе</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.cafe_opening_hours}</Fs16Fw400Black.span>
                        </div>
                        <div className={styles.bl}>
                            <Fs13Fw300Black.span>Адрес</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.address}</Fs16Fw400Black.span>
                        </div>
                        <div className={styles.bl}>
                            <Fs13Fw300Black.span>Название блока</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.about_title}</Fs16Fw400Black.span>
                        </div>
                        <div className={styles.bl}>
                            <Fs13Fw300Black.span>Описание блока</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.about_description}</Fs16Fw400Black.span>
                        </div>
                        <div className={styles.btns}>
                            <ButtonGreenBorder onClick={() => openEditSettingsPopup(el)}>
                                <Fs13Fw300Black.span>Изменить</Fs13Fw300Black.span>
                            </ButtonGreenBorder>
                        </div>
                    </div>
                }
            </div>
            {
                isPopUpVisible.visibility &&
                <PopupComponent key={isPopUpVisible.data ? isPopUpVisible.data.id : 'new'} headline={isPopUpVisible.data ? 'Изменить настройки' : 'Добавить настройки'} isVisible={isPopUpVisible.visibility} setIsVisible={(visible) => setIsPopUpVisible({ visibility: visible, data: isPopUpVisible.data })}>
                    <InputAdmin type="text" register={register} error={errors.contactsPhone} name='contactsPhone' placeholder="Телефон" label='Телефон' />
                    <InputAdmin type="text" register={register} error={errors.delivery_schedule} name='delivery_schedule' placeholder="График доставки" label='График доставки' />
                    <InputAdmin type="text" register={register} error={errors.cafe_opening_hours} name='cafe_opening_hours' placeholder="Часы работы" label='Часы работы' />
                    <InputAdmin type="text" register={register} error={errors.address} name='address' placeholder="Адрес" label='Адрес' />
                    <InputAdmin type="text" register={register} error={errors.email} name='email' placeholder="email" label='Почта' />
                    <InputAdmin type="text" register={register} error={errors.about_title} name='about_title' placeholder="Название блока" label='Название блока' />
                    <InputAdmin type="text" register={register} error={errors.about_description} name='about_description' placeholder="Описание блока" label='Описание блока' />
                    <ButtonGreen isLoading={createSettings_.isLoading} onClick={handleSubmit(onSubmit)}>{isPopUpVisible.data ? 'Изменить настройки' : 'Добавить настройки'}</ButtonGreen>
                </PopupComponent >
            }
        </div>
    )
}
