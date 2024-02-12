import { useEffect, useRef } from 'react';

export const useOutsideClick = <T extends HTMLElement>(callback: () => void): React.RefObject<T> => {
    const ref = useRef<T>(null);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [callback, ref]);

    return ref;
};