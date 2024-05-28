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
            {width >= 1024 ? <>{children}</> : <></>}
        </>
    )
}

export const VisibleHandheld1280 = ({ children }: Props) => {
    const { width } = useWindowDimensions();

    return (
        <>
            {width < 1280 ? <>{children}</> : <></>}
        </>
    )
}

export const VisibleDesktop1280 = ({ children }: Props) => {
    const { width } = useWindowDimensions();

    return (
        <>
            {width >= 1280 ? <>{children}</> : <></>}
        </>
    )
}

export const VisibleHandheld480 = ({ children }: Props) => {
    const { width } = useWindowDimensions();

    return (
        <>
            {width < 480 ? <>{children}</> : <></>}
        </>
    )
}

export const VisibleDesktop480 = ({ children }: Props) => {
    const { width } = useWindowDimensions();

    return (
        <>
            {width >= 480 ? <>{children}</> : <></>}
        </>
    )
}