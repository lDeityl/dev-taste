import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { z } from 'zod';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createCategories, createCategoriesMenu, deleteCategories, deleteCategoriesMenu, getCategories, getCategoriesMenu } from '../../api';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ICategory, IProductType } from '../../interfaces';
import { ButtonGreen, ButtonGreenBorder } from '../../ui/buttons';
import { InputAdmin, InputEmail } from '../../ui/inputs/input';
import { SelectWithSearch } from '../../components/cleverSearch';
import { PurpleSwitch } from '../../ui/switch';
import { Fs13Fw300Black, Fs13Fw500White, Fs16BoldBlack, Fs16BoldWhite, Fs16Fw400Black, Fs16Fw400White, Fs32BoldBlack, Fs32BoldWhite } from '../../components/typography';
import { PopupComponent } from '../components/popup';
import { getNormalDate } from '../../utils/normalDate';
import { InputFileLight3 } from '../../ui/input-file';
import { withImageData } from '../../utils/withImageData';

export interface Option {
    label: string
    value: string
}

export interface PopUpVisibleCategories {
    visibility: boolean;
    data: IProductType | null;
}

export const validationSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
})

type validationSchema = z.infer<typeof validationSchema>;

export const CategoriesMenu = () => {

    const createCategories_ = useMutation({
        mutationFn: createCategoriesMenu,
        onSuccess: (data) => {
            toast.success("Успешно");
            queryClient.invalidateQueries(['admin-categories-menu']);
            setIsPopUpVisible({ visibility: false, data: null })
        },
        onError: () => {
            toast.error("Ошибка");
        },
    });

    const queryClient = useQueryClient();

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

    const { data } = useQuery({
        queryFn: getCategoriesMenu,
        queryKey: ['admin-categories-menu'],
        keepPreviousData: true,
    });

    const [isPopUpVisible, setIsPopUpVisible] = useState<PopUpVisibleCategories>({
        visibility: false,
        data: null,
    });

    const onSubmit = async (values: validationSchema) => {
        createCategories_.mutate({ ...values, id: isPopUpVisible.data?.id });
    };

    useEffect(() => {
        if (isPopUpVisible.data) {
            setValue('id', isPopUpVisible.data.id);
            setValue('name', isPopUpVisible.data.name);
        } else {
            reset();
        }
    }, [isPopUpVisible, setValue, reset]);

    const openEditCategoryPopup = (category: IProductType) => {
        setIsPopUpVisible({ visibility: true, data: category });
    };

    const deleteCategories_ = useMutation({
        mutationFn: deleteCategoriesMenu,
        onSuccess: (data) => {
            toast.success("Категория удалена");
            queryClient.invalidateQueries(['admin-categories-menu']);
        },
        onError: () => {
            toast.error("Ошибка");
        },
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleBlock}>
                <Fs32BoldBlack.span>Категория</Fs32BoldBlack.span>
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
                                <Fs13Fw300Black.span>Тип еды</Fs13Fw300Black.span>
                                <Fs16Fw400Black.span>{el.name}</Fs16Fw400Black.span>
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
                <PopupComponent key={isPopUpVisible.data ? isPopUpVisible.data.id : 'new'} headline={isPopUpVisible.data ? 'Изменить категорию' : 'Добавить категорию'} isVisible={isPopUpVisible.visibility} setIsVisible={(visible) => setIsPopUpVisible({ visibility: visible, data: isPopUpVisible.data })}>
                    <InputAdmin type="text" register={register} error={errors.name} name='name' placeholder="Категория еды" />
                    <ButtonGreen isLoading={createCategories_.isLoading} onClick={handleSubmit(onSubmit)}>{isPopUpVisible.data ? 'Изменить категорию' : 'Добавить категорию'}</ButtonGreen>
                </PopupComponent >
            }
        </div>
    )
}
