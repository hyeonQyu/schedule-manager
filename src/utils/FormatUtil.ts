import { CalendarDate, Time } from '@defines/defines';
import { NumberFormatUtil } from '@utils/NumberFormatUtil';

export namespace FormatUtil {
    const { withDigitLength } = NumberFormatUtil;

    /**
     * CalendarDate 객체를 0000.00.00 포맷의 문자열로 변환
     * @param calendarDate
     */
    export function calendarDateToString(calendarDate: CalendarDate): string {
        const { year, month, date } = calendarDate;
        return `${year}.${withDigitLength(month, 2)}.${withDigitLength(date, 2)}`;
    }

    /**
     * 0000.00.00 포맷의 문자열을 CalendarDate 객체로 변환
     * @param strFormat
     */
    export function stringToCalendarDate(strFormat: string): CalendarDate {
        if (!strFormat) return null;
        try {
            const arr = strFormat.split('.').map((str) => Number(str));
            return {
                year: arr[0],
                month: arr[1],
                date: arr[2],
            };
        } catch (e) {
            console.error(`'${strFormat}'은 올바른 형식의 문자열이 아닙니다.`);
            return null;
        }
    }

    /**
     * Time 객체를 00:00 포맷의 문자열로 변환
     * @param time
     */
    export function timeToString(time: Time): string {
        const { hour, minute } = time;
        return `${withDigitLength(hour, 2)}:${withDigitLength(minute, 2)}`;
    }

    /**
     * 00:00 포맷의 문자열을 Time 객체로 변환
     * @param strFormat
     */
    export function stringToTime(strFormat: string): Time {
        if (!strFormat) return null;
        try {
            const arr = strFormat.split(':').map((str) => Number(str));
            return {
                hour: arr[0],
                minute: arr[1],
            };
        } catch (e) {
            console.error(`'${strFormat}'은 올바른 형식의 문자열이 아닙니다.`);
            return null;
        }
    }
}
