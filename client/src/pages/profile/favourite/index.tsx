import React from 'react'
import styles from './index.module.scss'
import { Fs22BoldWhite } from '../../../components/typography'
import { Card } from '../../../components/card'
import { allProducts } from '../../catalog/pages/all'

export const Favourite = () => {


    return (
        <div className={styles.favouritesBlock}>
            <Fs22BoldWhite.span>Ваши избранные товары:</Fs22BoldWhite.span>
            <div className={styles.blocks}>
                {allProducts.map(el => (
                    <Card
                        key={el.link}
                        title={el.title}
                        description={el.description}
                        weight={el.weight}
                        price={el.price}
                        link={el.link}
                        image={el.image}
                    />
                ))}
            </div>
        </div>
    )
}
