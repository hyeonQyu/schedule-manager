import React from 'react';
import { EArrowDirection } from '@defines/defines';

export interface ArrowProps {
    direction: EArrowDirection;
}

const ArrowIcon = (props: ArrowProps) => {
    const { direction } = props;

    const style = {
        width: 'fit-content',
        transform: `rotate(${direction === EArrowDirection.LEFT ? 180 : 0}deg)`,
    };

    return (
        <div style={style}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" width={'7vw'}>
                <defs>
                    <clipPath>
                        <path fill="#00f" fill-opacity=".514" d="m-7 1024.36h34v34h-34z" />
                    </clipPath>
                    <clipPath>
                        <path fill="#aade87" fill-opacity=".472" d="m-6 1028.36h32v32h-32z" />
                    </clipPath>
                </defs>
                <path
                    d="m345.44 248.29l-194.29 194.28c-12.359 12.365-32.397 12.365-44.75 0-12.354-12.354-12.354-32.391 0-44.744l171.91-171.91-171.91-171.9c-12.354-12.359-12.354-32.394 0-44.748 12.354-12.359 32.391-12.359 44.75 0l194.29 194.28c6.177 6.18 9.262 14.271 9.262 22.366 0 8.099-3.091 16.196-9.267 22.373"
                    transform="matrix(.03541-.00013.00013.03541 2.98 3.02)"
                    fill="#7d7d7d"
                />
            </svg>
        </div>
    );
};

export default ArrowIcon;
