"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const LenisProvider = ({ children }) => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
        });

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return children;
};

export default LenisProvider;