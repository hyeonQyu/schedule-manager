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
        return this.dateToCalendarDate(tmpDate);
    }

    /**
     * Date 객체를 CalendarDate 로 변환
     * @param dateObj
     */
    export function dateToCalendarDate(dateObj: Date): CalendarDate {
        return { year: dateObj.getFullYear(), month: dateObj.getMonth() + 1, date: dateObj.getDate() };
    }

    /**
     * 특정 날짜를 포함한 한 주를 (일 ~ 토) 배열로 반환
     * @param calendarDate
     */
    export function getThisWeek(calendarDate: CalendarDate): CalendarDate[] {
        const { year, month, date } = calendarDate;

        const day = new Date(year, month - 1, date).getDay();
        const firstDate = new Date(year, month - 1, date - day);

        return Array.from(
            Array(7).map((_, i) => {
                const year = firstDate.getFullYear();
                const month = firstDate.getMonth() + 1;
                const date = firstDate.getDate();
                return this.dateToCalendarDate(new Date(year, month, date + i));
            }),
        );
    }

    /**
     * 해당 날짜로부터 1주일 전의 날짜
     * @param calendarDate
     */
    export function getLastWeekDate(calendarDate: CalendarDate): CalendarDate {
        const { year, month, date } = calendarDate;
        return dateToCalendarDate(new Date(year, month - 1, date - 7));
    }

    /**
     * 해당 날짜로부터 1주일 후의 날짜
     * @param calendarDate
     */
    export function getNextWeekDate(calendarDate: CalendarDate): CalendarDate {
        const { year, month, date } = calendarDate;
        return dateToCalendarDate(new Date(year, month - 1, date + 7));
    }
}
