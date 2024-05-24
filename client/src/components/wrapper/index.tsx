import React from 'react'
import styles from './index.module.scss'

interface Props {
    className?: React.ReactNode
    children: React.ReactNode
}

export const Wrapper = ({ className, children }: Props) => {
    return (
        <div className={`${styles.wrapper} ${className}`}>
            {children}
        </div>
    )
}
