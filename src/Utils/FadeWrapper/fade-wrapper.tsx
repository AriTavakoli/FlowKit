import styles from './fade-wrapper.module.scss';
import React, { useEffect, useState, } from "react";



export interface FadeWrapperProps {
    show: boolean;
    children: React.ReactNode;
}

export const FadeWrapper = ({ show, children }: FadeWrapperProps) => {

    const [shouldRender, setRender] = useState(show);


    useEffect(() => {
        if (show) setRender(true);
    }, [show]);


    const onAnimationEnd = () => {
        if (!show) setRender(false);
    };

    return shouldRender ? (
        <div
          style={{ animation: `${show ? "fadeIn" : "fadeOut"} .3s` }}
          onAnimationEnd={onAnimationEnd}
        >
          {children}
        </div>
      ) : null;
};