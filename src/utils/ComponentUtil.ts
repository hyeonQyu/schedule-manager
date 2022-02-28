export namespace ComponentUtil {
    /**
     * 컴포넌트가 애니메이션이 실행된 이후 사라지는 경우 애니메이션 종료 후에 완전히 unmount 되는 조건을 판단하여 unmount 시킴
     * @param element umount 시킬 element
     * @param unmountConditionCallback 컴포넌트가 unmount 되는 조건을 반환하는 콜백 함수
     * @param setUnmountCallback 컴포넌트를 unmount 시키는 콜백 함수
     * @param pollingInterval unmount 조건 충족을 polling 하며 확인할 때의 interval
     */
    export function unmountComponent<T extends HTMLElement>(
        element: T,
        unmountConditionCallback: () => boolean,
        setUnmountCallback: () => void,
        pollingInterval: number = 100,
    ) {
        const interval = setInterval(() => {
            if (!element) {
                clearInterval(interval);
                return;
            }
            if (unmountConditionCallback()) {
                clearInterval(interval);
                setUnmountCallback();
            }
        }, pollingInterval);
    }
}
