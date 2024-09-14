import React, { useEffect, useState } from 'react';
import styles from '../index.module.scss';
import { PopUpVisibleCategories } from '..';
import { PopupComponent } from '../../components/popup';
import { InputAdmin } from '../../../ui/inputs/input';
import { InputFileLight3 } from '../../../ui/input-file';
import { Fs13Fw300Black, Fs16Fw400Black } from '../../../components/typography';
import { PurpleSwitch } from '../../../ui/switch';
import { SelectWithSearch } from '../../../components/cleverSearch';
import { ButtonGreen } from '../../../ui/buttons';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { withImageData } from '../../../utils/withImageData';
import { createProducts, getCategories, getCategoriesMenu } from '../../../api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

interface Props {
    isPopUpVisible: PopUpVisibleCategories
    setIsPopUpVisible: React.Dispatch<React.SetStateAction<PopUpVisibleCategories>>
}

interface Option {
    label: string;
    value: string;
}

const validationSchema = z.object({
    name: z.string().min(1, "Название продукта не может быть пустым"),
    description: z.string().min(1, "Описание продукта не может быть пустым"),
    price: z.number().min(0, "Цена должна быть положительным числом"),
    squirrels: z.number().min(0, "Количество белков должно быть положительным числом"),
    fats: z.number().min(0, "Количество жиров должно быть положительным числом"),
    carbohydrates: z.number().min(0, "Количество углеводов должно быть положительным числом"),
    calories: z.number().min(0, "Количество калорий должно быть положительным числом"),
    weight: z.number().min(0, "Вес должен быть положительным числом"),
    isActive: z.boolean().default(true),
    file: z.union([z.object({ 0: z.instanceof(File) }), z.any()]).optional(),
    imageUrl: z.string().optional(),
    categoryId: z.number().int("ID категории должно быть целым числом"),
    productTypeId: z.number().int("ID типа продукта должно быть целым числом"),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const PopUpProducts = ({ isPopUpVisible, setIsPopUpVisible }: Props) => {

    const addNewProducts_ = useMutation({
        mutationFn: createProducts,
        onSuccess: () => {
            toast.success("Продукт добавлен");
            queryClient.invalidateQueries(['admin-products']);
            setIsPopUpVisible({ visibility: false, data: null })
        },
        onError: (error: any) => {
            toast.error(error.message || "Ошибка при добавлении продукта");
        },
    });

    const queryClient = useQueryClient();

    const [option, setOption] = useState<Option | null>(null);
    const [optionProduct, setOptionProduct] = useState<Option | null>(null);

    const { setValue, register, reset, handleSubmit, watch, formState: { errors }, } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
    });

    const { data: dataCategories } = useQuery({
        queryFn: getCategories,
        queryKey: ['admin-categories'],
        keepPreviousData: true,
    });

    const { data: dataProductType } = useQuery({
        queryFn: getCategoriesMenu,
        queryKey: ['admin-categories-menu'],
        keepPreviousData: true,
    });

    const previousImage = isPopUpVisible.data?.imageUrl;
    const imageUrl = watch('file')?.[0] && URL.createObjectURL(watch('file')?.[0]);

    const onSubmit = async (values: ValidationSchema) => {
        const formattedData = withImageData({ ...values, id: isPopUpVisible.data?.id, categoryId: Number(option?.value), productTypeId: Number(optionProduct?.value) })
        addNewProducts_.mutate(formattedData);
    };

    useEffect(() => {
        if (isPopUpVisible.data) {
            reset({
                imageUrl: isPopUpVisible.data.imageUrl,
                name: isPopUpVisible.data.name,
                description: isPopUpVisible.data.description,
                price: isPopUpVisible.data.price,
                squirrels: isPopUpVisible.data.squirrels,
                fats: isPopUpVisible.data.fats,
                carbohydrates: isPopUpVisible.data.carbohydrates,
                calories: isPopUpVisible.data.calories,
                weight: isPopUpVisible.data.weight,
                categoryId: isPopUpVisible.data.categoryId,
                productTypeId: isPopUpVisible.data.productTypeId,
                isActive: isPopUpVisible.data.isActive,
            });
            setValue('isActive', isPopUpVisible.data.isActive)
        }
    }, [isPopUpVisible.data])

    const activeCategories = dataCategories?.filter(category => category.isActive);

    const categoriesOptions = activeCategories?.map(el => ({
        value: String(el.id),
        label: el.name,
    }));

    const productTypeOptions = dataProductType?.map(el => ({
        value: String(el.id),
        label: el.name,
    }));

    useEffect(() => {
        if (isPopUpVisible.data && dataCategories) {
            const productCategory = dataCategories.find(category => category.id === isPopUpVisible.data?.categoryId);
            if (productCategory) {
                setOption({ value: String(productCategory.id), label: productCategory.name });
            }

            const productType = dataProductType?.find(productType => productType.id === isPopUpVisible.data?.productTypeId);
            if (productType) {
                setOptionProduct({ value: String(productType.id), label: productType.name });
            }
        }
    }, [isPopUpVisible, dataCategories, dataProductType]);

    const handleCategoryChange = (option: Option) => {
        setOption(option);
        setValue('categoryId', Number(option.value));
    };

    const handleProductTypeChange = (option: Option) => {
        setOptionProduct(option);
        setValue('productTypeId', Number(option.value));
    };

    return (
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
            <InputAdmin type="number" register={register} error={errors.carbohydrates} name='carbohydrates' placeholder="Углеводы продукта" label='Углеводы продукта' />
            <InputAdmin type="number" register={register} error={errors.calories} name='calories' placeholder="Каллории продукта" label='Каллории продукта' />
            <InputAdmin type="number" register={register} error={errors.weight} name='weight' placeholder="Вес продукта" label='Вес продукта' />
            <div className={styles.row}>
                <Fs16Fw400Black.span>Сделать активным продуктом?</Fs16Fw400Black.span>
                <PurpleSwitch label='isActive' setFormValue={setValue} watch={watch} />
            </div>
            <div className={styles.bl}>
                <Fs13Fw300Black.span>Тип продукта</Fs13Fw300Black.span>
                {productTypeOptions && (
                    <SelectWithSearch setOption={handleProductTypeChange} option={optionProduct} options={productTypeOptions} />
                )}
            </div>
            <div className={styles.bl}>
                <Fs13Fw300Black.span>Категория</Fs13Fw300Black.span>
                {categoriesOptions && (
                    <SelectWithSearch setOption={handleCategoryChange} option={option} options={categoriesOptions} />
                )}
            </div>
            <ButtonGreen
                isLoading={addNewProducts_.isLoading}
                onClick={handleSubmit(onSubmit)}
            >
                {isPopUpVisible.data ? 'Изменить продукт' : 'Добавить продукт'}
            </ButtonGreen>
        </PopupComponent>
    );
};
