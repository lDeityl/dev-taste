import { HtmlHTMLAttributes } from 'react';
import styles from './index.module.scss';

interface Props extends HtmlHTMLAttributes<HTMLDivElement> {
}

export const Loader: React.FC<Props> = ({ ...rest }) => {
    return (
        <div className={`${styles.loading}`} {...rest}></div>
    )
}