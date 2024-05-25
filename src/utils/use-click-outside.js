
import { useEffect, useRef } from 'react';

const useClickOutside = (handler) => {
    const ref = useRef();

    const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            handler();
        }
    };

    useEffect(() => {
        window.addEventListener('click', handleClick, true);

        return () => {
            window.removeEventListener('click', handleClick, true);
        };
    }, [handler]);

    return ref;
};

export default useClickOutside;