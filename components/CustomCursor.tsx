import React, { useEffect, useRef } from 'react';

// Inform TypeScript that GSAP is available globally
declare var gsap: any;

const CustomCursor: React.FC = () => {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        if (!cursor || !follower) return;

        gsap.set(cursor, { xPercent: -50, yPercent: -50 });
        gsap.set(follower, { xPercent: -50, yPercent: -50 });

        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, { duration: 0.2, x: e.clientX, y: e.clientY });
            gsap.to(follower, { duration: 0.9, x: e.clientX, y: e.clientY, ease: "expo.out" });
        };

        const onMouseEnterLink = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches('a, button')) {
                gsap.to(cursor, { duration: 0.3, scale: 1.5 });
                gsap.to(follower, { duration: 0.3, scale: 1.5, opacity: 0.5 });
            }
        };

        const onMouseLeaveLink = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
             if (target.matches('a, button')) {
                gsap.to(cursor, { duration: 0.3, scale: 1 });
                gsap.to(follower, { duration: 0.3, scale: 1, opacity: 1 });
            }
        };
        
        window.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseover", onMouseEnterLink);
        document.addEventListener("mouseout", onMouseLeaveLink);

        return () => {
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseEnterLink);
            document.removeEventListener("mouseout", onMouseLeaveLink);
        };
    }, []);

    return (
        <>
            <div ref={cursorRef} className="cursor"></div>
            <div ref={followerRef} className="cursor-follower"></div>
        </>
    );
};

export default CustomCursor;
