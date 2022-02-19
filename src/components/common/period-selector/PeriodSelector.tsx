import React, { ReactNode } from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames/bind';
import style from './PeriodSelector.scss';
import ArrowIcon from '@icons/arrow/ArrowIcon';
import { EArrowDirection } from '@defines/defines';

const cx = classNames.bind(style);

export interface PeriodSelectorProps {
    toPrev: () => void;
    toNext: () => void;
    isPrevDisabled?: boolean;
    isNextDisabled?: boolean;
    children?: ReactNode;
}

const PeriodSelector = observer((props: PeriodSelectorProps) => {
    const { toPrev, toNext, isPrevDisabled = false, isNextDisabled = false, children } = props;

    return (
        <div className={cx('wrapper')}>
            <button onClick={toPrev} disabled={isPrevDisabled}>
                <ArrowIcon direction={EArrowDirection.LEFT} />
            </button>
            {children && <span>{children}</span>}
            <button onClick={toNext} disabled={isNextDisabled}>
                <ArrowIcon direction={EArrowDirection.RIGHT} />
            </button>
        </div>
    );
});

export default PeriodSelector;
