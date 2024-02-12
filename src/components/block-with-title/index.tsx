import React from 'react'
import styles from './index.module.scss'
import { Fs18Fw400Gray } from '../typography'

interface Props {
    title: string
    image?: string
    icon?: React.ReactNode
}

export const BlockWithTitle = ({ title, image, icon }: Props) => {
    return (
        <div className={styles.block}>
            {icon ?
                <>{icon}</>
                :
                <img src={image} alt={title} />
            }
            <Fs18Fw400Gray.span>{title}</Fs18Fw400Gray.span>
        </div>
    )
}
