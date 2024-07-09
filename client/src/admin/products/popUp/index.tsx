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
import { createProducts, getCategories } from '../../../api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

interface Props {
    isPopUpVisible: PopUpVisibleCategories;
    setIsPopUpVisible: React.Dispatch<React.SetStateAction<PopUpVisibleCategories>>;
}

interface Option {
    label: string;
    value: string;
}

export const validationSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    description: z.string(),
    price: z.number(),
    squirrels: z.number(),
    fats: z.number(),
    carbohydrates: z.number(),
    calories: z.number(),
    weight: z.number(),
    isActive: z.boolean().default(true),
    file: z.union([z.object({ 0: z.instanceof(File) }), z.any()]).optional(),
    imageUrl: z.string().optional(),
    categoryId: z.number().int(),
});

type ValidationSchema = z.infer<typeof validationSchema>;

export const PopUpProducts = ({ isPopUpVisible, setIsPopUpVisible }: Props) => {
    const queryClient = useQueryClient();
    const [option, setOption] = useState<Option | null>(null);

    const {
        setValue,
        register,
        reset,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ValidationSchema>({
        resolver: zodResolver(validationSchema),
        defaultValues: {
            imageUrl: isPopUpVisible?.data?.imageUrl || '',
        },
    });

    const { data: dataCategories } = useQuery({
        queryFn: getCategories,
        queryKey: ['admin-categories'],
        keepPreviousData: true,
    });

    const activeCategories = dataCategories?.filter(category => category.isActive);

    const categoriesOptions = activeCategories?.map(el => ({
        value: String(el.id),
        label: el.name,
    }));

    useEffect(() => {
        if (isPopUpVisible.data && dataCategories) {
            const productCategory = dataCategories.find(category => category.id === isPopUpVisible.data?.categoryId);
            if (productCategory) {
                setOption({ value: String(productCategory.id), label: productCategory.name });
            }
        }
    }, [isPopUpVisible, dataCategories]);

    const previousImage = isPopUpVisible.data?.imageUrl;
    const imageUrl = watch('file')?.[0] ? URL.createObjectURL(watch('file')?.[0]) : undefined;

    const addNewProducts_ = useMutation({
        mutationFn: createProducts,
        onSuccess: () => {
            toast.success("Продукт добавлен");
            queryClient.invalidateQueries(['admin-products']);
        },
        onError: (error: any) => {
            toast.error(error.message || "Ошибка при добавлении продукта");
        },
    });

    const handleCategoryChange = (option: Option) => {
        setOption(option);
        setValue('categoryId', Number(option.value));
    };

    const onSubmit = async (values: ValidationSchema) => {
        const formattedData = withImageData({ ...values, id: isPopUpVisible.data?.id, categoryId: Number(option?.value) });
        addNewProducts_.mutate(formattedData);
        setIsPopUpVisible({ data: null, visibility: false });
    };

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
            setValue('isActive', isPopUpVisible.data.isActive);
            setValue('imageUrl', isPopUpVisible.data.imageUrl);
            setValue('categoryId', isPopUpVisible.data.categoryId);
        } else {
            reset();
        }
    }, [isPopUpVisible, reset, setValue]);

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
                <Fs13Fw300Black.span>Категория</Fs13Fw300Black.span>
                {categoriesOptions && (
                    <SelectWithSearch setOption={handleCategoryChange} option={option} options={categoriesOptions} />
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
    );
};
