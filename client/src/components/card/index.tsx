import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import { Fs12Fw400White, Fs13Fw400Gray, Fs14Fw500White, Fs20Fw500White, Fs22BoldWhite } from '../typography'
import { ButtonGreen } from '../../ui/buttons'
import { Link, useNavigate } from 'react-router-dom'
import but from '../../assets/icons/Buy.svg'
import { IoIosHeartEmpty, IoIosHeart, IoIosStats } from "react-icons/io";
import { useCartStore } from '../../stores'
import { IProduct } from '../../interfaces'
import { toast } from 'react-toastify'
import image from '../../assets/images/cold/meat-5.png'

interface Props {
    item: IProduct
}

export const Card = ({ item }: Props) => {

    const { addToCart } = useCartStore();
    const navigate = useNavigate();

    const [isInComparison, setIsInComparison] = useState(false);

    useEffect(() => {
        const comparisonItems = JSON.parse(localStorage.getItem('comparisonItems') || '[]');
        const itemExists = comparisonItems.find((i: IProduct) => i.id === item.id);
        setIsInComparison(!!itemExists); // если товар есть, устанавливаем true
    }, [item.id]);

    const handleAddToCartProduct = () => {
        if (!item) return;

        addToCart(item, 1);
        toast.success(`${String(item.name)} добавлен в корзину`, {
            position: "top-left"
        });
    };

    const handleToggleComparison = () => {
        const comparisonItems = JSON.parse(localStorage.getItem('comparisonItems') || '[]');
        const itemExists = comparisonItems.find((i: IProduct) => i.id === item.id);

        if (itemExists) {
            // Удаляем товар из сравнения
            const updatedItems = comparisonItems.filter((i: IProduct) => i.id !== item.id);
            localStorage.setItem('comparisonItems', JSON.stringify(updatedItems));
            setIsInComparison(false);
            toast.info(`${String(item.name)} удален из сравнения`, { position: "top-left" });
        } else {
            // Добавляем товар в сравнение
            comparisonItems.push(item);
            localStorage.setItem('comparisonItems', JSON.stringify(comparisonItems));
            setIsInComparison(true);
            toast.success(`${String(item.name)} добавлен в сравнение`, { position: "top-left" });
        }
    };

    return (
        <div className={styles.cardBox}>
            <img
                src={item.imageUrl}
                alt={item.name}
                className={styles.image}
                onClick={() => navigate(`/catalog/${item.id}`)}
            />
            <div className={styles.characteristic}>
                <div className={styles.up} onClick={() => navigate(`/catalog/${item.id}`)}>
                    <Fs22BoldWhite.h4 className={styles.h4}>{item.name}</Fs22BoldWhite.h4>
                </div>
                <Fs13Fw400Gray.p onClick={() => navigate(`/catalog/${item.id}`)} className={styles.paragraphBtw}>{item.description}</Fs13Fw400Gray.p>
                <div className={styles.price}>
                    <Fs20Fw500White.span>{item.price} ₽</Fs20Fw500White.span>
                    <Fs12Fw400White.span>Вес: {item.weight} г</Fs12Fw400White.span>
                    <ButtonGreen onClick={handleAddToCartProduct} className={styles.button}>
                        <Fs14Fw500White.span>В корзину</Fs14Fw500White.span>
                        <img src={but} alt="" className={styles.but} />
                    </ButtonGreen>
                </div>
            </div>
            <IoIosStats onClick={handleToggleComparison} className={`${styles.simile} ${isInComparison ? styles.active : undefined}`} />
        </div>
    )
}