export namespace DateUtil {
    /**
     * 해당 월의 첫번째 요일
     * @param year
     * @param month
     * @private
     */
    export function getFirstDay(year: number, month: number) {
        return new Date(year, month - 1, 1).getDay();
    }

    /**
     * 해당 월의 마지막 날
     * @param year
     * @param month
     * @private
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
}
