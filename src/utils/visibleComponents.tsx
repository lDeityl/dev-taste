import React, { ReactNode } from 'react';
import useWindowDimensions from './useWindowDimensions';

interface Props {
    children: ReactNode;
}

export const VisibleHandheld = ({ children }: Props) => {
    const { width } = useWindowDimensions();

    return (
        <>
            {width < 1024 ? <>{children}</> : <></>}
        </>
    )
}

export const VisibleDesktop = ({ children }: Props) => {
    const { width } = useWindowDimensions();

    return (
        <>
            {width > 1024 ? <>{children}</> : <></>}
        </>
    )
}
