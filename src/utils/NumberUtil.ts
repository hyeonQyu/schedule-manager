export namespace NumberUtil {
    /**
     * 백분위 값 반환
     * @param dividend
     * @param divisor
     */
    export function getPercentage(dividend: number, divisor: number) {
        return (dividend / divisor) * 100;
    }
}
