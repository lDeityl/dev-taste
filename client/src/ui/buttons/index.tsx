import { HTMLAttributes, MouseEventHandler, ReactNode } from 'react';
import styles from './index.module.scss'
import { Loader } from '../loader';

interface Props extends HTMLAttributes<HTMLDivElement> {
    isLoading?: boolean
    active?: boolean
    disabled?: boolean
}

const withStyle = (styleName: string) => {
    return ({ children, onClick, className, disabled, isLoading, active, ...rest }: Props) => {
        return (
            <div className={`${styles.base} ${styles[styleName]} ${disabled ? styles.disabled : null} ${isLoading ? styles.loading : null} ${className}`} onClick={(isLoading || disabled) ? () => { } : onClick}  {...rest} >
                {isLoading ? <Loader /> : children}
            </div >
        );
    };
};

export const Button = withStyle("buttonStandart");
export const ButtonGreen = withStyle("ButtonGreen");
export const ButtonWhite = withStyle("ButtonWhite");
export const ButtonGray = withStyle("ButtonGray");