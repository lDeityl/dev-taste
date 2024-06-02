import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import close from '../../../assets/icons/close-outline.svg'
import { Fs15Fw400Black, Fs22BoldBlack, Fs32BoldBlack } from '../../../components/typography';
import { ButtonGreen } from '../../../ui/buttons';

interface PopupComponentProps {
    setIsVisible: (a: boolean) => void;
    isVisible: boolean;
}

const withPopup = <P extends PopupComponentProps>(WrappedComponent: React.ComponentType<any>) => {
    const WithPopup = (props: P) => {
        const { isVisible, setIsVisible } = props;

        useEffect(() => {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.keyCode === 27) {
                    setIsVisible(false);
                }
            };

            if (isVisible) {
                window.addEventListener('keydown', handleKeyDown);
            }

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };

        }, [isVisible, setIsVisible]);

        return isVisible ? <WrappedComponent {...props} /> : null;
    };

    return WithPopup;
};


interface Props {
    setIsVisible: (a: boolean) => void
    isVisible: boolean
    children: React.ReactNode
    headline?: string
    description?: string
    search?: React.ReactNode
    button?: React.ReactNode
    image?: string
    logo?: string
    mb1320?: boolean
}

const PopupComponent_: React.FC<Props> = React.forwardRef(({ mb1320, isVisible, setIsVisible, children, headline, description, search, button }, ref) => {

    return (
        <div className={styles.outlet}>
            <div className={styles.closeMark} onClick={() => setIsVisible(false)}></div>
            <div className={`${styles.popup} ${mb1320 && styles.mb1320}`}>
                {headline && <div className={styles.popupHeader}>
                    <div className={styles.popUpId}>
                        <div className={styles.flexTitle}>
                            {headline && <Fs32BoldBlack.h2>{headline}</Fs32BoldBlack.h2>}
                            {button}
                        </div>
                        {description && <Fs15Fw400Black.span>{description}</Fs15Fw400Black.span>}
                        {search}
                    </div>

                </div>}
                <div className={styles.popupIcons}>
                    <img className={styles.popupClose} src={close} alt='close' onClick={() => setIsVisible(!isVisible)} />
                </div>
                {children}
            </div>
        </div>
    )
})

const PopupComponent2_: React.FC<Props> = React.forwardRef(({ isVisible, setIsVisible, children, headline, description, search }, ref) => {
    return (
        <div className={styles.outlet}>
            <div ref={ref as any} className={styles.popup2}>
                <div className={styles.popupHeader}>
                    <div className={styles.popUpId}>
                        <Fs32BoldBlack.h2>{headline}</Fs32BoldBlack.h2>
                        {description && <Fs15Fw400Black.span>{description}</Fs15Fw400Black.span>}
                        {search}
                    </div>
                    <div className={styles.popupIcons}>
                        <img className={styles.popupClose} src={close} alt='close' onClick={() => setIsVisible(!isVisible)} />
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
})

const PopupComponentDelete_: React.FC<Props> = ({ isVisible, setIsVisible, children, headline, description, search }) => {
    return (
        isVisible ? (
            <div className={styles.outlet}>
                <div className={styles.popup2}>
                    <div className={styles.popupHeader}>
                        <div className={styles.popUpId}>
                            <Fs32BoldBlack.h2>{headline}</Fs32BoldBlack.h2>
                            {description && <Fs15Fw400Black.span>{description}</Fs15Fw400Black.span>}
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        ) : <></>
    )
}

export const PopupComponent = withPopup<Props>(PopupComponent_);
export const PopupComponent2 = withPopup<Props>(PopupComponent2_);
export const PopupComponentDelete = withPopup<Props>(PopupComponentDelete_);