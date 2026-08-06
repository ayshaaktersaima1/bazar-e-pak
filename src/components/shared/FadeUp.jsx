"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FadeUp = ({ children }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const animation = gsap.fromTo(
            sectionRef.current,
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 90%",
                    once: true,
                },
            }
        );

        ScrollTrigger.refresh();

        return () => {
            animation?.scrollTrigger?.kill();
            animation?.kill();
        };
    }, []);

    return (
        <div ref={sectionRef}>
            {children}
        </div>
    );
};

export default FadeUp;