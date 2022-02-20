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
    const { ourDateList, getPercentageOfDate, toNextMonth, toPrevMonth, selectedMonthDate, isThisMonth } = store;

    const [canvasSize, setCanvasSize] = useState(0);
    const [requestedAnim, setRequestedAnim] = useState(-1);

    const canvasRef = useRef<HTMLCanvasElement>(null);

    const percentage = getPercentageOfDate();

    const canvasStyle = {
        width: canvasSize,
        height: canvasSize,
    };

    const animate = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, balls: Ball[]) => {
        context.fillStyle = 'rgba(255,255,255)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        balls.forEach((ball) => ball.update());
        setRequestedAnim(requestAnimationFrame(() => animate(canvas, context, balls)));
    };

    // 캔버스에 데이트 한 날 목록을 그림
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        cancelAnimationFrame(requestedAnim);

        const context = canvas.getContext('2d');
        const balls = ourDateList.map(({ date }) => new Ball(canvas, date.toString()));
        animate(canvas, context, balls);
    }, [ourDateList]);

    useEffect(() => {
        return () => {
            setCanvasSize(0);
            setRequestedAnim(-1);
        };
    }, []);

    const { year, month } = selectedMonthDate;

    return (
        <div className={cx('wrapper')}>
            <PeriodSelector toPrev={toPrevMonth} toNext={toNextMonth} isNextDisabled={isThisMonth}>
                {isThisMonth ? '이번 달' : `${year}년 ${month}월`}
            </PeriodSelector>
            <div className={cx('date-count')}>
                {month}월에는 우리가 <span>{ourDateList.length}</span>번 만났어요
            </div>
            <div className={cx('chart')}>
                <PieChart
                    sectorList={[
                        { color: '#6e19d0', percentage },
                        { color: '#e7e1e7', percentage: 100 - percentage },
                    ]}
                    size={'70vw'}
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
        </div>
    );
});

export default MonthlyStatistics;
