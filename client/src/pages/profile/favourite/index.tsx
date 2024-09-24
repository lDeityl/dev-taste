import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { Fs16Fw400Black, Fs16Fw400White, Fs18Fw400Black, Fs18Fw500White, Fs22BoldWhite } from '../../../components/typography';
import { ButtonGreen } from '../../../ui/buttons';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getProfileAddress, UpdateProfileAddress } from '../../../api';
import { toast } from 'react-toastify';
import { IAddress } from '../../../interfaces';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputAdmin } from '../../../ui/inputs/input';

const validationSchema = z.object({
    city: z.string().min(1, 'Поле не должно быть пустым'),
    street: z.string().min(1, 'Поле не должно быть пустым'),
    house: z.string().min(1, 'Поле не должно быть пустым'),
    apartment: z.string().min(1, 'Поле не должно быть пустым'),
    floor: z.string().min(1, 'Поле не должно быть пустым'),
    entrance: z.string().min(1, 'Поле не должно быть пустым'),
    usersId: z.number().int("ID  должно быть целым числом"),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface Props {
    id: number;
}

export const Address = ({ id }: Props) => {

    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryFn: () => getProfileAddress(id),
        queryKey: ['profile-address', id],
        keepPreviousData: true,
    });

    const upsertInfo_ = useMutation(UpdateProfileAddress, {
        onSuccess: (data) => {
            toast.success('Личный кабинет обновлён');
            const previousData = queryClient.getQueryData<IAddress>(['profile-address']);
            if (previousData) {
                queryClient.setQueryData<IAddress>(['profile-address'], {
                    ...previousData,
                    city: data.city,
                    street: data.street,
                    house: data.house,
                    apartment: data.apartment,
                    floor: data.floor,
                    entrance: data.entrance,
                });
            }
            setEdit(false)
        },
        onError: (error: any) => {
            toast.error(`Ошибка: ${error.response?.data?.message || 'Что-то пошло не так...'}`);
        },
    });

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            usersId: id
        }
    });

    const onSubmit = (values: ValidationSchema) => {
        if (!id) {
            toast.error('User ID is missing');
            return;
        }
        upsertInfo_.mutate({ ...values, id });
    };

    useEffect(() => {
        if (data) {
            reset({
                city: data.city,
                street: data.street,
                house: data.house,
                apartment: data.apartment,
                floor: data.floor,
                entrance: data.entrance,
                usersId: id
            });
        }
    }, [data, reset]);

    const [edit, setEdit] = useState<boolean>(false);

    return (
        <div className={styles.favouritesBlock}>
            <div className={styles.row}>
                <Fs22BoldWhite.span>Ваш адрес:</Fs22BoldWhite.span>
                <ButtonGreen onClick={() => setEdit((prev) => !prev)}>
                    {edit ? 'Закрыть' : data ? 'Редактировать' : 'Добавить'}
                </ButtonGreen>
            </div>
            {edit ? (
                <div className={styles.blocks}>
                    <InputAdmin type='text' register={register} name='city' error={errors.city} label='Введите город' placeholder='Введите город' />
                    <InputAdmin type='text' register={register} name='street' error={errors.street} label='Введите улицу' placeholder='Введите улицу' />
                    <InputAdmin type='text' register={register} name='house' error={errors.house} label='Введите дом' placeholder='Введите дом' />
                    <InputAdmin type='text' register={register} name='apartment' error={errors.apartment} label='Введите квартиру' placeholder='Введите квартиру' />
                    <InputAdmin type='text' register={register} name='floor' error={errors.floor} label='Введите этаж' placeholder='Введите этаж' />
                    <InputAdmin type='text' register={register} name='entrance' error={errors.entrance} label='Введите подъезд' placeholder='Введите подъезд' />
                    <ButtonGreen isLoading={upsertInfo_.isLoading} onClick={handleSubmit(onSubmit)}>
                        Сохранить
                    </ButtonGreen>
                </div>
            ) : (
                <div className={styles.blocks}>
                    {data ? (
                        <>
                            <div className={styles.item}>
                                <Fs18Fw500White.span>Город</Fs18Fw500White.span>
                                <Fs16Fw400White.span>{data.city}</Fs16Fw400White.span>
                            </div>
                            <div className={styles.item}>
                                <Fs18Fw500White.span>Улица</Fs18Fw500White.span>
                                <Fs16Fw400White.span>{data.street}</Fs16Fw400White.span>
                            </div>
                            <div className={styles.item}>
                                <Fs18Fw500White.span>Дом</Fs18Fw500White.span>
                                <Fs16Fw400White.span>{data.house}</Fs16Fw400White.span>
                            </div>
                            <div className={styles.item}>
                                <Fs18Fw500White.span>Квартира</Fs18Fw500White.span>
                                <Fs16Fw400White.span>{data.apartment}</Fs16Fw400White.span>
                            </div>
                            <div className={styles.item}>
                                <Fs18Fw500White.span>Этаж</Fs18Fw500White.span>
                                <Fs16Fw400White.span>{data.floor}</Fs16Fw400White.span>
                            </div>
                            <div className={styles.item}>
                                <Fs18Fw500White.span>Подъезд</Fs18Fw500White.span>
                                <Fs16Fw400White.span>{data.entrance}</Fs16Fw400White.span>
                            </div>
                        </>
                    ) : (
                        <Fs22BoldWhite.span>Вы еще не добавили адрес 😕</Fs22BoldWhite.span>
                    )}
                </div>
            )}
        </div>
    );
};
