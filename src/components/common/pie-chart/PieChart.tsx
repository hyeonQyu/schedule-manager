import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './PieChart.scss';

const cx = classNames.bind(style);

export interface PieChartSector {
    color: string;
    percentage: number;
}

export interface PieChartProps {
    sectorList: PieChartSector[];
    size: string | number;
    isDonut?: boolean;
    donutSizePercentage?: number;
    children?: ReactNode;
}

const PieChart = observer((props: PieChartProps) => {
    const { sectorList, size, isDonut = false, donutSizePercentage = 70, children } = props;
    const ref = useRef<HTMLDivElement>();
    const [centerSize, setCenterSize] = useState(0);

    useEffect(() => {
        if (!ref.current) return;
        setCenterSize((ref.current.clientWidth / 100) * donutSizePercentage);
    }, [ref.current, donutSizePercentage]);

    const conicGradientParams = (() => {
        let acc = 0;
        return sectorList.map(({ color, percentage }) => {
            return `${color} ${acc}% ${(acc = acc + percentage)}%`;
        });
    })();

    const style = {
        width: size,
        height: size,
        background: `conic-gradient(${conicGradientParams.join()})`,
    };

    const centerStyle = {
        width: centerSize,
        height: centerSize,
    };

    return (
        <div className={cx('wrapper')} style={style} ref={ref}>
            {isDonut ? (
                <div className={cx('center')} style={centerStyle}>
                    {children}
                </div>
            ) : (
                children
            )}
        </div>
    );
});

export default PieChart;
