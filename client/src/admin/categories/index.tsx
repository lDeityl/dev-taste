import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createCategories, deleteCategories, getCategories } from '../../api';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICategory } from '../../interfaces';
import { ButtonGreen, ButtonGreenBorder } from '../../ui/buttons';
import { InputAdmin, InputEmail } from '../../ui/inputs/input';
import { SelectWithSearch } from '../../components/cleverSearch';
import { PurpleSwitch } from '../../ui/switch';
import { Fs13Fw300Black, Fs13Fw500White, Fs16BoldBlack, Fs16BoldWhite, Fs16Fw400Black, Fs16Fw400White, Fs32BoldBlack, Fs32BoldWhite } from '../../components/typography';
import { PopupComponent } from '../components/popup';
import { getNormalDate } from '../../utils/normalDate';

export const validationSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    isActive: z.boolean().default(true),
})

type validationSchema = z.infer<typeof validationSchema>;

export interface Option {
    label: string
    value: string
}

export interface PopUpVisibleCategories {
    visibility: boolean;
    data: ICategory | null;
}

export const Categories = () => {

    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryFn: getCategories,
        queryKey: ['admin-categories'],
        keepPreviousData: true,
    });

    const createCategories_ = useMutation({
        mutationFn: createCategories,
        onSuccess: (data) => {
            toast.success("Успешно");
            queryClient.invalidateQueries(['admin-categories']);
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

    const onSubmit = async (values: validationSchema) => {
        createCategories_.mutate(values);
    };

    const [isPopUpVisible, setIsPopUpVisible] = useState<PopUpVisibleCategories>({
        visibility: false,
        data: null,
    });

    useEffect(() => {
        if (isPopUpVisible.data) {
            setValue('id', isPopUpVisible.data.id);
            setValue('name', isPopUpVisible.data.name);
            setValue('isActive', isPopUpVisible.data.isActive);
        } else {
            reset();
        }
    }, [isPopUpVisible, setValue, reset]);

    const openEditCategoryPopup = (category: ICategory) => {
        setIsPopUpVisible({ visibility: true, data: category });
    };

    const deleteCategories_ = useMutation({
        mutationFn: deleteCategories,
        onSuccess: (data) => {
            toast.success("Категория удалена");
            queryClient.invalidateQueries(['admin-categories']);
        },
        onError: () => {
            toast.error("Ошибка");
        },
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleBlock}>
                <Fs32BoldBlack.span>Категории</Fs32BoldBlack.span>
                <ButtonGreenBorder onClick={() => setIsPopUpVisible({ visibility: true, data: null })}><Fs16Fw400Black.span>+ Добавить категорию</Fs16Fw400Black.span></ButtonGreenBorder>
            </div>
            <div className={styles.block}>
                {
                    data?.map((el, idx) => (
                        <div className={styles.item} key={idx}>
                            <div className={styles.bl}>
                                <Fs13Fw300Black.span>Номер</Fs13Fw300Black.span>
                                <Fs16Fw400Black.span>{el.id}</Fs16Fw400Black.span>
                            </div>
                            <div className={styles.bl}>
                                <Fs13Fw300Black.span>Дата создания</Fs13Fw300Black.span>
                                <Fs16Fw400Black.span>{getNormalDate(new Date(el.createdAt))}</Fs16Fw400Black.span>
                            </div>
                            <div className={styles.bl}>
                                <Fs13Fw300Black.span>Категория</Fs13Fw300Black.span>
                                <Fs16Fw400Black.span>{el.name}</Fs16Fw400Black.span>
                            </div>
                            <div className={styles.bl}>
                                <Fs13Fw300Black.span>Активно</Fs13Fw300Black.span>
                                <Fs16Fw400Black.span>{el.isActive === true ? 'Активно' : 'Не активно'}</Fs16Fw400Black.span>
                            </div>
                            <div className={styles.btns}>
                                <ButtonGreen isLoading={deleteCategories_.isLoading} onClick={() => deleteCategories_.mutate(el)}><Fs13Fw500White.span>Удалить</Fs13Fw500White.span></ButtonGreen>
                                <ButtonGreenBorder onClick={() => openEditCategoryPopup(el)}>
                                    <Fs13Fw300Black.span>Изменить</Fs13Fw300Black.span>
                                </ButtonGreenBorder>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                isPopUpVisible.visibility &&
                <PopupComponent headline={isPopUpVisible.data ? 'Изменить категорию' : 'Добавить категорию'} isVisible={isPopUpVisible.visibility} setIsVisible={(visible) => setIsPopUpVisible({ visibility: visible, data: isPopUpVisible.data })}>
                    <InputAdmin type="text" register={register} error={errors.name} name='name' placeholder="Название категории" />
                    <div className={styles.row}>
                        <Fs16Fw400Black.span>Сделать активной категорией?</Fs16Fw400Black.span>
                        <PurpleSwitch label='isActive' setFormValue={setValue} watch={watch} />
                    </div>
                    <ButtonGreen isLoading={createCategories_.isLoading} onClick={handleSubmit(onSubmit)}>{isPopUpVisible.data ? 'Изменить категорию' : 'Добавить категорию'}</ButtonGreen>
                </PopupComponent >
            }
        </div >
    )
}
