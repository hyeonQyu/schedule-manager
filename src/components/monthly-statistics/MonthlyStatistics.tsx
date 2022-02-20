import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './MonthlyStatistics.scss';
import PieChart from '@components/common/pie-chart/PieChart';
import StatisticsStore from '@stores/StatisticsStore';
import Ball from '@utils/Ball';

const cx = classNames.bind(style);

const store = StatisticsStore.instance;

const MonthlyStatistics = observer(() => {
    const { calendarDateWithDateList, getPercentageOfDate } = store;
    const [canvasSize, setCanvasSize] = useState(0);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const percentage = getPercentageOfDate();

    const canvasStyle = {
        width: canvasSize,
        height: canvasSize,
    };

    // 캔버스에 데이트 한 날 목록을 그림
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const balls = calendarDateWithDateList.map(({ date }) => new Ball(canvas, date.toString()));
        const animate = () => {
            const context = canvas.getContext('2d');
            context.fillStyle = 'rgba(255,255,255,0.5)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            balls.forEach((ball) => ball.update());
            requestAnimationFrame(animate);
        };
        animate();
    }, [canvasRef]);

    return (
        <div className={cx('wrapper')}>
            <PieChart
                sectorList={[
                    { color: '#6e19d0', percentage },
                    { color: '#e7e1e7', percentage: 100 - percentage },
                ]}
                size={'90vw'}
                isDonut
                donutSizePercentage={90}
                gradientValue={3}
                onChangeDonutSize={(size) => {
                    setCanvasSize(Math.sqrt((size * size) / 2));
                }}
            >
                <canvas ref={canvasRef} style={canvasStyle} />
            </PieChart>
        </div>
    );
});

export default MonthlyStatistics;
