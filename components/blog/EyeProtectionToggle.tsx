"use client";

import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import styles from "./EyeProtectionToggle.module.css";

export const EyeProtectionToggle = () => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (isActive) {
            document.body.classList.add("sepia-mode");
        } else {
            document.body.classList.remove("sepia-mode");
        }
    }, [isActive]);

    return (
        <div className={styles.buttonWrap}>
            <button
                onClick={() => setIsActive(!isActive)}
                className={styles.glassButton}
                data-active={isActive}
                title={isActive ? "Desativar modo leitura" : "Ativar modo leitura (conforto visual)"}
                aria-label="Alternar modo de leitura"
            >
                <FaEye className={styles.icon} />
                <div className={styles.buttonShine}></div>
            </button>
        </div>
    );
};
