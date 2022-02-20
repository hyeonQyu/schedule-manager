import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './MonthlyStatistics.scss';
import PieChart from '@components/common/pie-chart/PieChart';
import StatisticsStore from '@stores/StatisticsStore';
import Ball from '@utils/Ball';
import PeriodSelector from '@components/common/period-selector/PeriodSelector';

const cx = classNames.bind(style);

const store = StatisticsStore.instance;

const MonthlyStatistics = observer(() => {
    const { calendarDateWithDateList, getPercentageOfDate, toNextMonth, toPrevMonth, selectedMonthDate, isThisMonth } = store;

    const [canvasSize, setCanvasSize] = useState(0);
    const [requestedAnim, setRequestedAnim] = useState(-1);

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

        const context = canvas.getContext('2d');
        cancelAnimationFrame(requestedAnim);
        context.clearRect(0, 0, canvas.width, canvas.height);

        const balls = calendarDateWithDateList.map(({ date }) => new Ball(canvas, date.toString()));
        const animate = () => {
            context.fillStyle = 'rgba(255,255,255,0.5)';
            context.fillRect(0, 0, canvas.width, canvas.height);
            balls.forEach((ball) => ball.update());
            setRequestedAnim(requestAnimationFrame(animate));
        };
        animate();
    }, [canvasRef, calendarDateWithDateList]);

    const { year, month } = selectedMonthDate;

    return (
        <div className={cx('wrapper')}>
            <PeriodSelector toPrev={toPrevMonth} toNext={toNextMonth} isNextDisabled={isThisMonth}>
                {isThisMonth ? '이번 달' : `${year}년 ${month}월`}
            </PeriodSelector>
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
