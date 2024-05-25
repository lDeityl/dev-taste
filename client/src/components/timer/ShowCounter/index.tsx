import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'

interface Props {
    days: number
    hours: number
    minutes: number
    seconds: number
}

export const ShowCounter: React.FC<Props> = ({ days, hours, minutes, seconds }) => {
    return (
        <div className={styles.showCounter}>
            <div>{seconds}s</div>
        </div>
    );
};
