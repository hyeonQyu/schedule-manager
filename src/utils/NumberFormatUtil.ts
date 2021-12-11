export namespace NumberFormatUtil {
    /**
     * 천단위 , 포맷
     * @param num
     */
    export function withComma(num: number): string {
        return num.toString().replace(/(\d)(?=(\d\d\d)+$)/g, '$1,');
    }

    /**
     * 숫자 자릿수가 length 길이가 되도록 num 앞에 0 추가
     * @param num
     * @param length
     */
    export function withDigitLength(num: number, length: number): string {
        const tmp = num.toString();
        if (tmp.length >= length) return tmp;
        const zeroLength = length - tmp.length;
        let zeros = '0';
        for (let i = 1; i < zeroLength; i++) {
            zeros = `${zeros}0`;
        }
        return `${zeros}${tmp}`;
    }
}
