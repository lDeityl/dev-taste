import React from 'react'
import styles from './index.module.scss'
import { Fs16BoldWhite, Fs16Fw400White, Fs18Fw500White } from '../../../components/typography'

export const History = () => {
    return (
        <table className={styles.table}>
            <tr className={styles.tr}>
                <th className={styles.number}><Fs18Fw500White.span>Номер заказа</Fs18Fw500White.span></th>
                <th className={styles.date}><Fs18Fw500White.span>Дата заказа</Fs18Fw500White.span></th>
                <th className={styles.count}><Fs18Fw500White.span>Кол-во</Fs18Fw500White.span></th>
                <th className={styles.cost}><Fs18Fw500White.span>Стоимость</Fs18Fw500White.span></th>
                <th className={styles.status}><Fs18Fw500White.span>Статус операции</Fs18Fw500White.span></th>
            </tr>
            <tr>
                <td className={styles.number}><Fs16Fw400White.span>123</Fs16Fw400White.span></td>
                <td className={styles.date}><Fs16Fw400White.span>22.05.23, 16:17:04</Fs16Fw400White.span></td>
                <td className={styles.count}><Fs16Fw400White.span>3 шт.</Fs16Fw400White.span></td>
                <td className={styles.cost}><Fs16Fw400White.span>1500 р.</Fs16Fw400White.span></td>
                <td className={styles.status}><Fs16Fw400White.span>Успешно</Fs16Fw400White.span></td>
            </tr>
            <tr>
                <td className={styles.number}><Fs16Fw400White.span>123</Fs16Fw400White.span></td>
                <td className={styles.date}><Fs16Fw400White.span>22.05.23, 16:17:04</Fs16Fw400White.span></td>
                <td className={styles.count}><Fs16Fw400White.span>3 шт.</Fs16Fw400White.span></td>
                <td className={styles.cost}><Fs16Fw400White.span>1500 р.</Fs16Fw400White.span></td>
                <td className={styles.status}><Fs16Fw400White.span>Успешно</Fs16Fw400White.span></td>
            </tr>
        </table>
    )
}
