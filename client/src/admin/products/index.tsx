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
import { withImageData } from '../../utils/withImageData';
import { InputFileLight, InputFileLight3 } from '../../ui/input-file';

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
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0.1),
    squirrels: z.number().min(0.1),
    fats: z.number().min(0.1),
    carbohydrates: z.number().min(0.1),
    calories: z.number().min(0.1),
    weight: z.number().min(0.1),
    isActive: z.boolean().default(true),
    file: z.union([z.object({ 0: z.instanceof(File) }), z.any()]).optional(),
    imageUrl: z.string().optional(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const Products = () => {
    const queryClient = useQueryClient();

    const [isPopUpVisible, setIsPopUpVisible] = useState<PopUpVisibleCategories>({
        visibility: false,
        data: null,
    });

    const [option, setOption] = useState<Option | null>(null);

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

    const activeCategories = dataCategories?.filter(category => category.isActive);

    const categoriesOptions = activeCategories?.map(el => ({
        value: String(el.id),
        label: el.name
    }));

    useEffect(() => {
        if (isPopUpVisible.data && dataCategories) {
            const productCategory = dataCategories.find(category => category.id === isPopUpVisible.data?.categoryId);
            if (productCategory) {
                setOption({ value: String(productCategory.id), label: productCategory.name });
            }
        }
    }, [isPopUpVisible, dataCategories]);

    let categoryId = Number(option?.value);

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

    const previousImage = isPopUpVisible.data?.imageUrl;
    const imageUrl = watch('file')?.[0] ? URL.createObjectURL(watch('file')?.[0]) : undefined

    const openEditCategoryPopup = (category: IProduct) => {
        setIsPopUpVisible({ visibility: true, data: category });
    };

    const onSubmit = async (values: ValidationSchema) => {
        const formattedData = withImageData({ ...values, id: isPopUpVisible.data?.id, categoryId });
        addNewProducts_.mutate(formattedData);
        setIsPopUpVisible({ data: null, visibility: false });
    };

    useEffect(() => {
        if (isPopUpVisible.data) {

            reset({
                id: isPopUpVisible.data.id,
                name: isPopUpVisible.data.name,
                description: isPopUpVisible.data.description,
                price: isPopUpVisible.data.price,
                squirrels: isPopUpVisible.data.squirrels,
                fats: isPopUpVisible.data.fats,
                carbohydrates: isPopUpVisible.data.carbohydrates,
                calories: isPopUpVisible.data.calories,
                weight: isPopUpVisible.data.weight,
                isActive: isPopUpVisible.data.isActive,
                imageUrl: isPopUpVisible.data.imageUrl,
            })
        }
    }, [isPopUpVisible.data])

    // useEffect(() => {
    //     if (isPopUpVisible.data) {
    //         setValue('id', isPopUpVisible.data.id);
    //         setValue('name', isPopUpVisible.data.name);
    //         setValue('description', isPopUpVisible.data.description);
    //         setValue('price', isPopUpVisible.data.price);
    //         setValue('squirrels', isPopUpVisible.data.squirrels);
    //         setValue('fats', isPopUpVisible.data.fats);
    //         setValue('carbohydrates', isPopUpVisible.data.carbohydrates);
    //         setValue('calories', isPopUpVisible.data.calories);
    //         setValue('weight', isPopUpVisible.data.weight);
    //         setValue('isActive', isPopUpVisible.data.isActive);
    //         setValue('imageUrl', isPopUpVisible.data.imageUrl);
    //     } else {
    //         reset();
    //     }
    // }, [isPopUpVisible, setValue, reset]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.titleBlock}>
                <Fs32BoldBlack.span>Продукты</Fs32BoldBlack.span>
                <ButtonGreenBorder onClick={() => {
                    setIsPopUpVisible({ visibility: true, data: null });
                }}>
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
                    setIsVisible={(visible) => setIsPopUpVisible({ ...isPopUpVisible, visibility: visible })}
                >
                    <InputFileLight3 image={imageUrl || previousImage} name='file' register={register} />
                    <InputAdmin type="text" register={register} error={errors.name} name='name' placeholder="Название продукта" label='Название продукта' />
                    <InputAdmin type="text" register={register} error={errors.description} name='description' placeholder="Описание продукта" label='Описание продукта' />
                    <InputAdmin type="number" register={register} error={errors.price} name='price' placeholder="Цена продукта" label='Цена продукта' />
                    <InputAdmin type="number" register={register} error={errors.squirrels} name='squirrels' placeholder="Белки продукта" label='Белки продукта' />
                    <InputAdmin type="number" register={register} error={errors.fats} name='fats' placeholder="Жиры продукта" label='Жиры продукта' />
                    <InputAdmin type="number" register={register} error={errors.carbohydrates} name='carbohydrates' placeholder="Углеводы продукта" label='Углеводы' />
                    <InputAdmin type="number" register={register} error={errors.calories} name='calories' placeholder="Каллории продукта" label='Каллории' />
                    <InputAdmin type="number" register={register} error={errors.weight} name='weight' placeholder="Вес продукта" label='Вес продукта' />
                    <div className={styles.row}>
                        <Fs16Fw400Black.span>Сделать активным продуктом?</Fs16Fw400Black.span>
                        <PurpleSwitch label='isActive' setFormValue={setValue} watch={watch} />
                    </div>
                    <div className={styles.bl}>
                        <Fs13Fw300Black.span>Категория</Fs13Fw300Black.span>
                        {categoriesOptions && (
                            <SelectWithSearch setOption={setOption} option={option} options={categoriesOptions} />
                        )}
                    </div>
                    <ButtonGreen
                        isLoading={addNewProducts_.isLoading}
                        disabled={addNewProducts_.isLoading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {isPopUpVisible.data ? 'Изменить продукт' : 'Добавить продукт'}
                    </ButtonGreen>
                </PopupComponent>
            )}
        </div>
    );
};