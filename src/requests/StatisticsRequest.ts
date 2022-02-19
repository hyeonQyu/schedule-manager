import { CalendarDate, WeeklyStatisticsInfo } from '@defines/defines';

export namespace StatisticsRequest {
    /**
     * 주간 통계 정보 조회
     * @param calendarDate
     */
    export async function getWeeklyStatisticsInfo(calendarDate: CalendarDate): Promise<WeeklyStatisticsInfo> {
        return null;
    }
}
