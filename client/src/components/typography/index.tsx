import React, { HTMLAttributes } from 'react';
import styles from './index.module.scss'

const tags = ['div', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;

type Tag = typeof tags[number];

interface Props extends HTMLAttributes<HTMLElement> { }

const createComponentCache = (styleName: string) => {
    const componentCache = new Map<Tag, React.FC<Props>>();

    const createProxyComponent = new Proxy({} as { [K in Tag]: React.FC<Props> }, {
        get: (_target, key: Tag) => {
            if (!componentCache.has(key)) {
                const TagComponent: React.FC<Props> = ({ children, className, ...rest }) => {
                    return React.createElement(key, {
                        ...rest,
                        className: `${styles.base} ${styles[styleName]} ${className}`
                    }, children);
                };
                componentCache.set(key, TagComponent);
            }
            return componentCache.get(key);
        },
    });

    return createProxyComponent;
};

const Typography = (styleName: string) => createComponentCache(styleName);

export const Fs32BoldWhite = Typography('Fs32BoldWhite');
export const Fs30BoldWhite = Typography('Fs30BoldWhite');
export const Fs25BoldWhite = Typography('Fs25BoldWhite');
export const Fs22BoldWhite = Typography('Fs22BoldWhite');
export const Fs20Fw500White = Typography('Fs20Fw500White');
export const Fs20Fw400White = Typography('Fs20Fw400White');
export const Fs20Fw400Gray = Typography('Fs20Fw400Gray');
export const Fs18Fw500White = Typography('Fs18Fw500White');
export const Fs18Fw400Gray = Typography('Fs18Fw400Gray');
export const Fs18Fw400Green = Typography('Fs18Fw400Green');
export const Fs16Fw400White = Typography('Fs16Fw400White');
export const Fs16BoldWhite = Typography('Fs16BoldWhite');
export const Fs14Fw500White = Typography('Fs14Fw500White');
export const Fs13Fw500White = Typography('Fs13Fw500White');
export const Fs13Fw400Gray = Typography('Fs13Fw400Gray');
export const Fs12Fw500Black = Typography('Fs12Fw500Black');
export const Fs12Fw400White = Typography('Fs12Fw400White');
export const Fs12Fw300White = Typography('Fs12Fw300White');