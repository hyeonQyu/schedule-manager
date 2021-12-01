import { CalendarDate } from '@defines/defines';

export namespace DateUtil {
    /**
     * 해당 월의 첫번째 요일
     * @param year
     * @param month
     */
    export function getFirstDay(year: number, month: number) {
        return new Date(year, month - 1, 1).getDay();
    }

    /**
     * 해당 월의 마지막 일
     * @param year
     * @param month
     */
    export function getLastDate(year: number, month: number) {
        return new Date(year, month, 0).getDate();
    }

    /**
     * 해당 월의 마지막 요일
     * @param year
     * @param month
     */
    export function getLastDay(year: number, month: number) {
        return new Date(year, month, 0).getDay();
    }

    /**
     * 년, 월, 일을 입력하여 년, 월, 일을 얻어냄 (다음달, 이전달을 통해 조회 시 사용)
     * @param year
     * @param month
     * @param date
     */
    export function getCalendarDate(year, month, date): CalendarDate {
        const tmpDate = new Date(year, month - 1, date);
        return { year: tmpDate.getFullYear(), month: tmpDate.getMonth() + 1, date: tmpDate.getDate() };
    }
}
