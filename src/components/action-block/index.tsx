import React from 'react'
import styles from './index.module.scss'
import { Fs13Fw400Gray, Fs18Fw400Green, Fs18Fw500White } from '../typography'

interface Props {
    image: string
    title: string
    description: string
    date: string
}

export const ActionBlock = ({ image, title, description, date }: Props) => {
    return (
        <div className={styles.block}>
            <img src={image} alt={title} />
            <div className={styles.text}>
                <div className={styles.up}>
                    <Fs18Fw500White.span>{title}</Fs18Fw500White.span>
                    <Fs13Fw400Gray.span>{description}</Fs13Fw400Gray.span>
                </div>
                <Fs18Fw400Green.span>{date}</Fs18Fw400Green.span>
            </div>
        </div>
    )
}
