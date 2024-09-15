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
import { InputFileLight3 } from '../../ui/input-file';
import { withImageData } from '../../utils/withImageData';

export interface Option {
    label: string
    value: string
}

export interface PopUpVisibleCategories {
    visibility: boolean;
    data: ICategory | null;
}

export const validationSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    isActive: z.boolean().default(true),
    file: z.union([z.object({ 0: z.instanceof(File) }), z.any()]).optional(),
    imageUrl: z.string().optional()
})

type validationSchema = z.infer<typeof validationSchema>;

export const Categories = () => {

    const createCategories_ = useMutation({
        mutationFn: createCategories,
        onSuccess: (data) => {
            toast.success("Успешно");
            queryClient.invalidateQueries(['admin-categories']);
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
        queryFn: getCategories,
        queryKey: ['admin-categories'],
        keepPreviousData: true,
    });

    const [isPopUpVisible, setIsPopUpVisible] = useState<PopUpVisibleCategories>({
        visibility: false,
        data: null,
    });

    const previousImage = isPopUpVisible.data?.imageUrl;
    const imageUrl = watch('file')?.[0] && URL.createObjectURL(watch('file')?.[0]);

    const onSubmit = async (values: validationSchema) => {
        const formattedData = withImageData({ ...values, id: isPopUpVisible.data?.id })
        createCategories_.mutate(formattedData);
    };

    useEffect(() => {
        if (isPopUpVisible.data) {
            setValue('id', isPopUpVisible.data.id);
            setValue('name', isPopUpVisible.data.name);
            setValue('isActive', isPopUpVisible.data.isActive);
            setValue('imageUrl', isPopUpVisible.data.imageUrl);
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
            toast.success("Компания удалена");
            queryClient.invalidateQueries(['admin-categories']);
        },
        onError: () => {
            toast.error("Ошибка");
        },
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleBlock}>
                <Fs32BoldBlack.span>Компании</Fs32BoldBlack.span>
                <ButtonGreenBorder onClick={() => setIsPopUpVisible({ visibility: true, data: null })}><Fs16Fw400Black.span>+ Добавить компанию</Fs16Fw400Black.span></ButtonGreenBorder>
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
                                <Fs13Fw300Black.span>Компания</Fs13Fw300Black.span>
                                <Fs16Fw400Black.span>{el.name}</Fs16Fw400Black.span>
                            </div>
                            <div className={styles.bl}>
                                <Fs13Fw300Black.span>Лого компании</Fs13Fw300Black.span>
                                <img src={el.imageUrl} alt={el.name} className={styles.logoCompany} />
                            </div>
                            <div className={styles.bl}>
                                <Fs13Fw300Black.span>Активная компания ?</Fs13Fw300Black.span>
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
                <PopupComponent key={isPopUpVisible.data ? isPopUpVisible.data.id : 'new'} headline={isPopUpVisible.data ? 'Изменить категорию' : 'Добавить категорию'} isVisible={isPopUpVisible.visibility} setIsVisible={(visible) => setIsPopUpVisible({ visibility: visible, data: isPopUpVisible.data })}>
                    <InputAdmin type="text" register={register} error={errors.name} name='name' placeholder="Название компании" />
                    <InputFileLight3 image={imageUrl || previousImage} name='file' register={register} />
                    <div className={styles.row}>
                        <Fs16Fw400Black.span>Сделать активной компанией?</Fs16Fw400Black.span>
                        <PurpleSwitch label='isActive' setFormValue={setValue} watch={watch} />
                    </div>
                    <ButtonGreen isLoading={createCategories_.isLoading} onClick={handleSubmit(onSubmit)}>{isPopUpVisible.data ? 'Изменить компанию' : 'Добавить компанию'}</ButtonGreen>
                </PopupComponent >
            }
        </div>
    )
}
