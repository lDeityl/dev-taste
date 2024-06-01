import React, { useState } from 'react'
import styles from './index.module.scss'
import { toast } from 'react-toastify'
import { createProducts } from '../../api'
import { useMutation } from 'react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { IProduct } from '../../interfaces'
import { InputEmail } from '../../ui/inputs/input'

export const validationSchema = z.object({
    imageUrl: z.union([z.object({ 0: z.instanceof(File) }), z.any()]).optional(),
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0.1),
    squirrels: z.number().min(0.1),
    fats: z.number().min(0.1),
    carbohydrates: z.number().min(0.1),
    calories: z.number().min(0.1),
    weight: z.number().min(0.1),
    isActive: z.boolean().default(true),
})

type validationSchema = z.infer<typeof validationSchema>;

export const Products = () => {

    const addNewProducts_ = useMutation({
        mutationFn: createProducts,
        onSuccess: () => {
            toast.success("Продукт добавлен");
        },
        onError: () => {
            toast.error("Ошибка");
        }
    });

    return (
        <>Products</>
    )
}
