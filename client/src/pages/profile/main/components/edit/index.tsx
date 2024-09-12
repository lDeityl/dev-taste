import React, { useEffect } from 'react'
import { InputEmail } from '../../../../../ui/inputs/input'
import { z } from 'zod';
import { Fs18Fw500White } from '../../../../../components/typography';
import { ButtonGreen } from '../../../../../ui/buttons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { UpdateProfileReq, UpdateProfileReqImage, getUserById } from '../../../../../api';
import { IUsers } from '../../../../../interfaces';
import { InputFileLight } from '../../../../../ui/input-file';
import image from '../../../../../assets/images/hot-mini/meat-4.png'
import { withImageData } from '../../../../../utils/withImageData';
import { UpdateImage } from './updateImage';
import styles from '../../index.module.scss'

const validationSchema = z.object({
    name: z.string().min(1, 'Поле не должно быть пустым'),
    email: z.string().email('Введите корректный email').min(1, 'Поле не должно быть пустым'),
    phone: z.string().optional().nullable(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface Props {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const UpdateProfile = ({ setEdit }: Props) => {

    const queryClient = useQueryClient();

    const useFetchProfile = () => useQuery(['profile-info'], getUserById);
    const { data, error } = useFetchProfile();

    const upsertInfo_ = useMutation(UpdateProfileReq, {
        onSuccess: (data) => {
            toast.success('Личный кабинет обновлён');

            const previousData = queryClient.getQueryData<IUsers>(['profile-info']);

            if (previousData) {
                queryClient.setQueryData<IUsers>(['profile-info'], {
                    ...previousData,
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                });
            }

            setEdit(false);
        },
        onError: (error: any) => {
            toast.error(`Ошибка: ${error.response?.data?.message || 'Что-то пошло не так...'}`);
        },
    });


    const {
        setValue,
        register,
        reset,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            name: data?.name,
            email: data?.email,
            phone: data?.phone,
        },
    });

    const onSubmit = (values: ValidationSchema) => {
        if (!data?.id) {
            toast.error('User ID is missing');
            return;
        }
        upsertInfo_.mutate({ ...values });
    };

    useEffect(() => {
        if (data) {
            reset({
                name: data.name,
                email: data.email,
                phone: data.phone,
            });
        }
    }, [data, reset]);

    return (
        <div className={styles.rowEdit}>
            <div className={styles.updateImage}><UpdateImage setEdit={setEdit} /></div>
            <div className={styles.rightSideEdit}>
                <InputEmail type='text' placeholder='Имя:' name='name' register={register} error={errors.name} />
                <InputEmail type='email' placeholder='E-mail:' name='email' register={register} error={errors.email} />
                <InputEmail type='text' placeholder='Телефон:' name='phone' register={register} error={errors.phone} />
                <ButtonGreen isLoading={upsertInfo_.isLoading} onClick={handleSubmit(onSubmit)}>
                    <Fs18Fw500White.span>Сохранить</Fs18Fw500White.span>
                </ButtonGreen>
            </div>
        </div>
    )
}
