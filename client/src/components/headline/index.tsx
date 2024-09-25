import React from 'react'
import styles from './index.module.scss'
import { Fs32BoldWhite } from '../typography'

interface Props {
    title: string
    color?: string
}

export const HeadLine = ({ title, color }: Props) => {
    return (
        <Fs32BoldWhite.h2 className={`${styles.h2} ${color ? styles.colorPadding : undefined}`} style={{ borderLeftColor: color }}>{title}</Fs32BoldWhite.h2>
    )
}
