import React, { useState } from 'react'
import styles from './index.module.scss'
import { z } from 'zod';
import { useMutation, useQuery } from 'react-query';
import { createCategories, getCategories } from '../../api';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICategory } from '../../interfaces';
import { ButtonGreen } from '../../ui/buttons';
import { InputEmail } from '../../ui/inputs/input';
import { SelectWithSearch } from '../../components/cleverSearch';
import { PurpleSwitch } from '../../ui/switch';

export const validationSchema = z.object({
    name: z.string().min(1),
    categoryType: z.enum(['COLD_APPETIZERS', 'HOT_APPETIZERS', 'MEAT_DISHES']),
    isActive: z.boolean().default(true),
})

type validationSchema = z.infer<typeof validationSchema>;

const options = [
    {
        value: 'COLD_APPETIZERS',
        label: 'COLD APPETIZERS'
    },
    {
        value: 'HOT_APPETIZERS',
        label: 'HOT APPETIZERS'
    },
    {
        value: 'MEAT_DISHES',
        label: 'MEAT DISHES'
    }
]

export interface Option {
    label: string
    value: string
}

export const Categories = () => {

    const { data, isLoading } = useQuery({
        queryFn: getCategories,
        queryKey: ['admin-categories'],
        keepPreviousData: true
    })

    const createCategories_ = useMutation({
        mutationFn: createCategories,
        onSuccess: (data) => {
            toast.success("Категория создана")
        },
        onError: (error: any) => {
            toast.error("Ошибка")
        }
    })

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

    const onSubmit = async (values: validationSchema) => {
        console.log("Submitting form with values:", values);
        createCategories_.mutate(values);
    }

    const [option, setOption] = useState<Option>(options[0])


    return (
        <div className={styles.asd}>
            {data?.map(el => (
                <>
                    {el.name}
                </>
            ))}
            <InputEmail type="text" register={register} error={errors.name} name='name' placeholder="Name" />

            <SelectWithSearch options={options} setOption={setOption} option={option} />
            <PurpleSwitch label='isActive' setFormValue={setValue} watch={watch} />
            <ButtonGreen isLoading={createCategories_.isLoading} onClick={handleSubmit(onSubmit)}>Create Category</ButtonGreen>
        </div>
    )
}
