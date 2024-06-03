import React, { useEffect } from 'react'
import { InputEmail } from '../../../../../ui/inputs/input'
import { z } from 'zod';
import { Fs18Fw500White } from '../../../../../components/typography';
import { ButtonGreen } from '../../../../../ui/buttons';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { UpdateProfileReq, getUserById } from '../../../../../api';
import { IUsers } from '../../../../../interfaces';
import { InputFileLight } from '../../../../../ui/input-file';
import image from '../../../../../assets/images/hot-mini/meat-4.png'
import { withImageData } from '../../../../../utils/withImageData';

const validationSchema = z.object({
    name: z.string().min(1, 'Поле не должно быть пустым'),
    email: z.string().email('Введите корректный email').min(1, 'Поле не должно быть пустым'),
    phone: z.string().optional().nullable(),
    file: z.union([z.object({ 0: z.instanceof(File) }), z.any()]).optional(),
    imgURL: z.string().optional(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface Props {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const UpdateProfile = ({ setEdit }: Props) => {

    const useFetchProfile = () => useQuery(['profile-info'], getUserById);

    const { data, error } = useFetchProfile();

    const queryClient = useQueryClient();

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
                    imgURL: data.imgURL,
                });
            }

            setEdit(false);
        },
        onError: (error) => {
            toast.error(`Что-то пошло не так... `);
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
            imgURL: data?.imgURL,
        },
    });

    const previousImage = data?.imgURL;
    const image = watch('file')?.[0] ? URL.createObjectURL(watch('file')[0]) : undefined;

    const onSubmit = (values: ValidationSchema) => {
        if (!data?.id) {
            toast.error('User ID is missing');
            return;
        }
        const formattedData = withImageData({ ...values, id: data.id });
        upsertInfo_.mutate(formattedData);
    };

    useEffect(() => {
        if (data) {
            reset({
                name: data.name,
                email: data.email,
                phone: data.phone,
                imgURL: data.imgURL,
            });
        }
    }, [data, reset]);

    return (
        <>
            <InputFileLight image={image || previousImage} name='file' register={register} />
            <InputEmail type='text' placeholder='Имя:' name='name' register={register} error={errors.name} />
            <InputEmail type='email' placeholder='E-mail:' name='email' register={register} error={errors.email} />
            <InputEmail type='text' placeholder='Телефон:' name='phone' register={register} error={errors.phone} />
            <ButtonGreen isLoading={upsertInfo_.isLoading} onClick={handleSubmit(onSubmit)}>
                <Fs18Fw500White.span>Сохранить</Fs18Fw500White.span>
            </ButtonGreen>
        </>
    )
}
