import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import { toast } from 'react-toastify';
import { createProducts, deleteProducts, getCategories, getProduct } from '../../api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { IProduct } from '../../interfaces';
import { Fs13Fw300Black, Fs13Fw500White, Fs16Fw400Black, Fs32BoldBlack } from '../../components/typography';
import { ButtonGreen, ButtonGreenBorder } from '../../ui/buttons';
import { getNormalDate } from '../../utils/normalDate';
import { PopUpProducts } from './popUp';

export interface PopUpVisibleCategories {
    visibility: boolean;
    data: IProduct | null;
}

export interface Option {
    label: string;
    value: string;
}

export const Products = () => {
    const queryClient = useQueryClient();

    const [isPopUpVisible, setIsPopUpVisible] = useState<PopUpVisibleCategories>({
        visibility: false,
        data: null,
    });

    const { data } = useQuery<IProduct[]>({
        queryFn: getProduct,
        queryKey: ['admin-products'],
        keepPreviousData: true,
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

    const openEditCategoryPopup = (category: IProduct) => {
        setIsPopUpVisible({ visibility: true, data: category });
    };
    console.log(data, 'asdsadsa');

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
                            <Fs13Fw300Black.span>Фото</Fs13Fw300Black.span>
                            <img className={styles.image} src={el.imageUrl} alt={el.name} />
                        </div>
                        <div className={styles.bl}>
                            <Fs13Fw300Black.span>Компания</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.Category?.name}</Fs16Fw400Black.span>
                        </div>
                        <div className={styles.bl}>
                            <Fs13Fw300Black.span>Тип продукта</Fs13Fw300Black.span>
                            <Fs16Fw400Black.span>{el.ProductType.name}</Fs16Fw400Black.span>
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
            <PopUpProducts isPopUpVisible={isPopUpVisible} setIsPopUpVisible={setIsPopUpVisible} />
        </div>
    );
};