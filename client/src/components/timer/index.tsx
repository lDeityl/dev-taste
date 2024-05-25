import React from 'react';
import { ShowCounter } from './ShowCounter';
import styles from './index.module.scss'
import { useCountdown } from '../../utils/useCountdown';

interface Props {
    targetDate: number
    children: React.ReactNode
}

export const CountdownTimer: React.FC<Props> = ({ children, targetDate }) => {
    const [days, hours, minutes, seconds] = useCountdown(targetDate);

    if (days + hours + minutes + seconds <= 0) {
        return <p className={styles.wrapper2}>{children}</p>
    } else {
        return (<div className={styles.wrapper}>
            <p>Надіслати повторно</p>
            <ShowCounter
                days={days}
                hours={hours}
                minutes={minutes}
                seconds={seconds}
            />
        </div>
        );
    }
};
