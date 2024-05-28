import React, { useState } from 'react'
import styles from './index.module.scss'
import { Fs12Fw400White, Fs13Fw400Gray, Fs14Fw500White, Fs20Fw500White, Fs22BoldWhite } from '../typography'
import { ButtonGreen } from '../../ui/buttons'
import { Link, useNavigate } from 'react-router-dom'
import but from '../../assets/icons/Buy.svg'
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { useCartStore } from '../../stores'
import { IProduct } from '../../interfaces'
import { toast } from 'react-toastify'

interface Props {
    item: IProduct
}

export const Card = ({ item }: Props) => {

    const navigate = useNavigate();
    const [isHeart, setHeart] = useState<boolean>(false);

    const { addToCart } = useCartStore()

    const handleAddToCartProduct = () => {
        if (!item) return;
        addToCart(item, 1)
        toast.success(`${String(item.name)} добавлен в корзину`, {
            position: "top-left"
        })
    }

    return (
        <div className={styles.cardBox}>
            <img src={item.imageUrl} alt={item.name} className={styles.image} onClick={() => navigate(`/catalog/${item.id}`)} />
            <div className={styles.characteristic}>
                <div className={styles.up} onClick={() => navigate(`/catalog/${item.id}`)}>
                    <Fs22BoldWhite.h4>{item.name}</Fs22BoldWhite.h4>
                    <Fs12Fw400White.span>Вес: {item.weight} г</Fs12Fw400White.span>
                </div>
                <Fs13Fw400Gray.p onClick={() => navigate(`/catalog/${item.id}`)}>{item.description}</Fs13Fw400Gray.p>
                <div className={styles.price}>
                    <Fs20Fw500White.span>{item.price} ₽</Fs20Fw500White.span>
                    <ButtonGreen onClick={handleAddToCartProduct} className={styles.button}>
                        <Fs14Fw500White.span>В корзину </Fs14Fw500White.span>
                        <img src={but} alt="" className={styles.but} />
                    </ButtonGreen>
                </div>
            </div>
            {isHeart ?
                <IoIosHeart onClick={() => setHeart(el => !el)} className={`${isHeart ? styles.activeHeart : null} ${styles.heart}`} />
                :
                <IoIosHeartEmpty onClick={() => setHeart(el => !el)} className={`${styles.heart}`} />
            }
        </div>
    )
}