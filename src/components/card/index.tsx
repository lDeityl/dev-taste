import React from 'react'
import styles from './index.module.scss'
import { Fs12Fw400White, Fs13Fw400Gray, Fs14Fw500White, Fs20Fw500White, Fs22BoldWhite } from '../typography'
import { ButtonGreen } from '../../ui/buttons'
import { Link, useNavigate } from 'react-router-dom'
import but from '../../assets/icons/Buy.svg'

interface Props {
    title: string
    weight: number
    description: string
    price: number
    image: string
    link: string
}

export const Card = ({ title, weight, image, link, description, price }: Props) => {

    const navigate = useNavigate();

    return (
        <div className={styles.cardBox}>
            <img src={image} alt={title} className={styles.image} onClick={() => navigate(`/catalog/product/${link}`)} />
            <div className={styles.characteristic}>
                <div className={styles.up} onClick={() => navigate(`/catalog/product/${link}`)}>
                    <Fs22BoldWhite.h4>{title}</Fs22BoldWhite.h4>
                    <Fs12Fw400White.span>Вес: {weight} г</Fs12Fw400White.span>
                </div>
                <Fs13Fw400Gray.p onClick={() => navigate(`/catalog/product/${link}`)}>{description}</Fs13Fw400Gray.p>
                <div className={styles.price}>
                    <Fs20Fw500White.span>{price} ₽</Fs20Fw500White.span>
                    <ButtonGreen className={styles.button}>
                        <Fs14Fw500White.span>В корзину </Fs14Fw500White.span>
                        <img src={but} alt="" className={styles.but} />
                    </ButtonGreen>
                </div>
            </div>
        </div>
    )
}