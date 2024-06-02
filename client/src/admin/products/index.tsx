import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { toast } from 'react-toastify';
import { createProducts, deleteProducts, getCategories, getProduct } from '../../api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { IProduct } from '../../interfaces';
import { InputAdmin } from '../../ui/inputs/input';
import { Fs13Fw300Black, Fs13Fw500White, Fs16Fw400Black, Fs32BoldBlack } from '../../components/typography';
import { ButtonGreen, ButtonGreenBorder } from '../../ui/buttons';
import { getNormalDate } from '../../utils/normalDate';
import { PopupComponent } from '../components/popup';
import { PurpleSwitch } from '../../ui/switch';
import { SelectWithSearch } from '../../components/cleverSearch';

export interface PopUpVisibleCategories {
    visibility: boolean;
    data: IProduct | null;
}

export interface Option {
    label: string;
    value: string;
}

export const validationSchema = z.object({
    id: z.number().optional(),
    imageUrl: z.union([z.object({ 0: z.instanceof(File) }), z.any()]).optional(),
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0.1),
    squirrels: z.number().min(0.1),
    fats: z.number().min(0.1),
    carbohydrates: z.number().min(0.1),
    calories: z.number().min(0.1),
    weight: z.number().min(0.1),
    categoryId: z.number(),
    isActive: z.boolean().default(true),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const Products = () => {

    const queryClient = useQueryClient();

    const { data } = useQuery<IProduct[]>({
        queryFn: getProduct,
        queryKey: ['admin-products'],
        keepPreviousData: true,
    });

    const { data: dataCategories } = useQuery({
        queryFn: getCategories,
        queryKey: ['admin-categories'],
        keepPreviousData: true,
    });

    const addNewProducts_ = useMutation({
        mutationFn: createProducts,
        onSuccess: () => {
            toast.success("Продукт добавлен");
            queryClient.invalidateQueries(['admin-products']);
        },
        onError: (error: any) => {
            toast.error(error.message || "Ошибка при добавлении продукта");
        }
    });

    const {
        setValue,
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const [isPopUpVisible, setIsPopUpVisible] = useState<PopUpVisibleCategories>({
        visibility: false,
        data: null,
    });

    useEffect(() => {
        if (isPopUpVisible.data) {
            setValue('id', isPopUpVisible.data.id);
            setValue('name', isPopUpVisible.data.name);
            setValue('description', isPopUpVisible.data.description);
            setValue('price', isPopUpVisible.data.price);
            setValue('squirrels', isPopUpVisible.data.squirrels);
            setValue('fats', isPopUpVisible.data.fats);
            setValue('carbohydrates', isPopUpVisible.data.carbohydrates);
            setValue('calories', isPopUpVisible.data.calories);
            setValue('weight', isPopUpVisible.data.weight);
            setValue('categoryId', isPopUpVisible.data.categoryId);
            setValue('isActive', isPopUpVisible.data.isActive);
        } else {
            reset();
        }
    }, [isPopUpVisible, setValue, reset]);

    const openEditCategoryPopup = (category: IProduct) => {
        setIsPopUpVisible({ visibility: true, data: category });
    };

    const deleteProduct_ = useMutation({
        mutationFn: deleteProducts,
        onSuccess: () => {
            toast.success("Продукт удален");
            queryClient.invalidateQueries(['admin-products']);
        },
        onError: (error: any) => {
            toast.error(error.message || "Ошибка при удалении продукта");
        },
    });

    const categories = dataCategories?.map(el => ({
        value: String(el.id),
        label: el.name
    }));

    const [option, setOption] = useState<Option | null>(categories && categories.length > 0 ? categories[0] : null);

    const onSubmit = async (values: ValidationSchema) => {
        if (!option) {
            toast.error("Выберите категорию");
            return;
        }
        addNewProducts_.mutate({ ...values, categoryId: Number(option.value) });
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleBlock}>
                <Fs32BoldBlack.span>Продукты</Fs32BoldBlack.span>
                <ButtonGreenBorder onClick={() => setIsPopUpVisible({ visibility: true, data: null })}>
                    <Fs16Fw400Black.span>+ Добавить продукт</Fs16Fw400Black.span>
                </ButtonGreenBorder>
            </div>
            <div className={styles.block}>
                {data?.map((el, idx) => (
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
                            <Fs13Fw300Black.span>Имя продукта</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.name}</Fs16Fw400Black.span>
                        </div>
                        <div className={styles.bl}>
                            <Fs13Fw300Black.span>Описание продукта</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.description}</Fs16Fw400Black.span>
                        </div>
                        <div className={styles.bl}>
                            <Fs13Fw300Black.span>Цена продукта</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.price} ₽</Fs16Fw400Black.span>
                        </div>
                        <div className={styles.bl}>
                            <Fs13Fw300Black.span>Активно</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.isActive ? 'Активно' : 'Не активно'}</Fs16Fw400Black.span>
                        </div>
                        <div className={styles.btns}>
                            <ButtonGreen isLoading={deleteProduct_.isLoading} onClick={() => deleteProduct_.mutate(el)}>
                                <Fs13Fw500White.span>Удалить</Fs13Fw500White.span>
                            </ButtonGreen>
                            <ButtonGreenBorder onClick={() => openEditCategoryPopup(el)}>
                                <Fs13Fw300Black.span>Изменить</Fs13Fw300Black.span>
                            </ButtonGreenBorder>
                        </div>
                    </div>
                ))}
            </div>
            {isPopUpVisible.visibility && (
                <PopupComponent
                    headline={isPopUpVisible.data ? 'Изменить продукт' : 'Добавить продукт'}
                    isVisible={isPopUpVisible.visibility}
                    setIsVisible={(visible) => setIsPopUpVisible({ visibility: visible, data: isPopUpVisible.data })}
                >
                    <InputAdmin type="text" register={register} error={errors.name} name='name' placeholder="Название продукта" label='Название продукта' />
                    <InputAdmin type="text" register={register} error={errors.description} name='description' placeholder="Описание продукта" label='Описание продукта' />
                    <InputAdmin type="number" register={register} error={errors.price} name='price' placeholder="Цена продукта" label='Цена продукта' />
                    <InputAdmin type="number" register={register} error={errors.squirrels} name='squirrels' placeholder="Белки продукта" label='Белки продукта' />
                    <InputAdmin type="number" register={register} error={errors.fats} name='fats' placeholder="Жиры продукта" label='Жиры продукта' />
                    <InputAdmin type="number" register={register} error={errors.carbohydrates} name='carbohydrates' placeholder="Углеводы продукта" label='Углеводы' />
                    <InputAdmin type="number" register={register} error={errors.weight} name='weight' placeholder="Вес продукта" label='Вес продукта' />
                    <div className={styles.row}>
                        <Fs16Fw400Black.span>Сделать активным продуктом?</Fs16Fw400Black.span>
                        <PurpleSwitch label='isActive' setFormValue={setValue} watch={watch} />
                    </div>
                    <div className={styles.bl}>
                        <Fs13Fw300Black.span>Категория</Fs13Fw300Black.span>
                        {categories && <SelectWithSearch setOption={setOption} option={option} options={categories} />}
                    </div>
                    <ButtonGreen onClick={handleSubmit(onSubmit)} isLoading={addNewProducts_.isLoading}>
                        {isPopUpVisible.data ? 'Изменить продукт' : 'Добавить продукт'}
                    </ButtonGreen>
                </PopupComponent>
            )}
        </div>
    );
};
