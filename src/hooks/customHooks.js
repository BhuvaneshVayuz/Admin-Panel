import { useEffect } from "react";

export function useOutsideAlerter(ref, func, param) {
    useEffect(() => {

        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                if (param.length > 0) {
                    func(...param)
                } else {
                    func()
                }
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}