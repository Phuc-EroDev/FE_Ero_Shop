import { useState, useEffect } from 'react';

export const useResponsive = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isSmallMobile, setIsSmallMobile] = useState(window.innerWidth <= 576);
    const [isTablet, setIsTablet] = useState(window.innerWidth <= 992 && window.innerWidth > 768);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth > 992);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });

            setIsMobile(window.innerWidth <= 768);
            setIsSmallMobile(window.innerWidth <= 576);
            setIsTablet(window.innerWidth <= 992 && window.innerWidth > 768);
            setIsDesktop(window.innerWidth > 992);
        };

        window.addEventListener('resize', handleResize);

        // Clean up
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return {
        windowSize,
        isMobile,
        isSmallMobile,
        isTablet,
        isDesktop,
    };
};
