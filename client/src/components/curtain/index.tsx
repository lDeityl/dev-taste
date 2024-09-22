import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';

export const Curtain: React.FC = () => {

    const [active, setActive] = useState(false);
    const [exit, setExit] = useState(false);

    const [animate, setAnimate] = useState(true);

    const handleAnimationComplete = () => {
        setAnimate(false);
    };

    useEffect(() => {
        setActive(true);

        const timeoutId = setTimeout(() => {
            setExit(true);
        }, 3500);

        const exitTimeoutId = setTimeout(() => {
            handleAnimationComplete();
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
            clearTimeout(exitTimeoutId);
        };
    }, []);

    const companyName = 'Dev-Taste';

    return (
        <div className={`${styles.curtain} ${active ? styles.active : ''} ${exit ? styles.exit : ''}`}>
            <div className={styles.text}>
                {companyName.split('').map((letter, index) => (
                    <span key={index} style={{ animationDelay: `${index * 0.3}s` }}>
                        {letter}
                    </span>
                ))}
            </div >
            <div className={styles.lines}>
                {[...Array(10)].map((_, i) => (
                    <div key={i} className={styles.line}></div>
                ))}
            </div>
        </div >
    );
};