import React from 'react'
import styles from './index.module.scss'
import { Fs32BoldWhite } from '../typography'

interface Props {
    title: string
}

export const HeadLine = ({ title }: Props) => {
    return (
        <Fs32BoldWhite.h2 className={styles.h2}>{title}</Fs32BoldWhite.h2>
    )
}
