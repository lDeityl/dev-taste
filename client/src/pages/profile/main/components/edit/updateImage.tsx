import React, { useEffect } from 'react'
import { ButtonGreen } from '../../../../../ui/buttons'
import { InputFileLight } from '../../../../../ui/input-file'
import { Fs18Fw500White } from '../../../../../components/typography'
import { withImageData } from '../../../../../utils/withImageData'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { getUserById, UpdateProfileReqImage } from '../../../../../api'
import { IUsers } from '../../../../../interfaces'
import { z } from 'zod'

const validationSchema = z.object({
    file: z.union([z.object({ 0: z.instanceof(File) }), z.any()]).optional(),
    imgURL: z.string().optional(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

interface Props {
    setEdit: React.Dispatch<React.SetStateAction<boolean>>
}

export const UpdateImage = ({ setEdit }: Props) => {

    const queryClient = useQueryClient();

    const useFetchProfile = () => useQuery(['profile-info'], getUserById);

    const { data, error } = useFetchProfile();

    const upsertInfoImage_ = useMutation(UpdateProfileReqImage, {
        onSuccess: (data) => {
            toast.success('Фото обновлено');

            const previousData = queryClient.getQueryData<IUsers>(['profile-info']);

            if (previousData) {
                queryClient.setQueryData<IUsers>(['profile-info'], {
                    ...previousData,
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
            imgURL: data?.imgURL
        },
    });

    const previousImage = data?.imgURL;
    const image = watch('file')?.[0] ? URL.createObjectURL(watch('file')?.[0]) : undefined

    const onSubmitImage = (values: ValidationSchema) => {
        if (!data?.id) {
            toast.error('User ID is missing');
            return;
        }
        const formattedData = withImageData({ ...values, id: data.id });
        upsertInfoImage_.mutate(formattedData);
    };

    useEffect(() => {
        if (data) {
            reset({
                imgURL: data.imgURL,
            });
        }
    }, [data, reset]);

    return (
        <>
            <InputFileLight image={image || previousImage} name='file' register={register} />
            <ButtonGreen isLoading={upsertInfoImage_.isLoading} onClick={handleSubmit(onSubmitImage)}>
                <Fs18Fw500White.span>Сохранить</Fs18Fw500White.span>
            </ButtonGreen>
        </>
    )
}
