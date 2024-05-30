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

const validationSchema = z.object({
    name: z.string().min(1, 'Поле не должно быть пустым'),
    email: z.string().email().min(1, 'Поле не должно быть пустым'),
    phone: z.string().optional().nullable(),
    file: z.union([z.object({ 0: z.instanceof(File) }), z.any()]).optional(),
    imgURL: z.string().optional(),
})

type validationSchema = z.infer<typeof validationSchema>;

interface Props {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const UpdateProfile = ({ setEdit }: Props) => {

    const useFetchProfile = () => useQuery({
        queryKey: ['profile-info'],
        queryFn: getUserById
    })

    const { data } = useFetchProfile();

    const queryClient = useQueryClient()

    const upsertInfo_ = useMutation({
        mutationFn: UpdateProfileReq,
        onSuccess: (data) => {
            toast.success("Личный кабинет обновлён")

            const previousData = queryClient.getQueryData<IUsers>(['profile-info']);

            if (!previousData) return

            previousData.name = data.name
            previousData.email = data.email
            previousData.phone = data.phone
            // previousData.imgURL = data.imgURL

            queryClient.setQueryData<IUsers>(['profile-info'], previousData);

            setEdit(false);
        },
        onError: (error: any) => {
            toast.error("Что-то пошло не так...")
        }
    })

    const {
        setValue,
        register,
        reset,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm<validationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const onSubmit = (values: validationSchema) => {
        upsertInfo_.mutate(values)
    }

    // const previousImage = data?.imgURL;
    // const image = watch('file')?.[0] ? URL.createObjectURL(watch('file')?.[0]) : undefined

    useEffect(() => {
        if (data) {

            reset({
                name: data.name,
                email: data.email,
                phone: data.phone,
                // imgURL: data.imgURL
            })
        }
    }, [data])


    return (
        <>
            <InputFileLight image={image} />
            <InputEmail type='text' placeholder='Имя:' name='name' register={register} error={errors.name} />
            <InputEmail type='email' placeholder='E-mail:' name='email' register={register} error={errors.email} />
            <InputEmail type='text' placeholder='Телефон:' name='phone' register={register} error={errors.phone} />
            <ButtonGreen isLoading={upsertInfo_.isLoading} onClick={handleSubmit(onSubmit)}><Fs18Fw500White.span>Сохранить</Fs18Fw500White.span></ButtonGreen>
        </>
    )
}
