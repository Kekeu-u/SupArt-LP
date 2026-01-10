"use client";

import React from "react";

export function SplineBackground() {
    return (
        <div className="spline-container fixed top-0 left-0 w-full h-full -z-10 pointer-events-none opacity-50 will-change-transform">
            <iframe
                src="https://my.spline.design/flowingribbon-TlkEaNrvCCNZuJBNJN3LXpRF"
                frameBorder="0"
                width="100%"
                height="100%"
                id="aura-spline"
                title="Spline 3D Background"
                loading="lazy"
                allow="autoplay; fullscreen"
            />
        </div>
    );
}
