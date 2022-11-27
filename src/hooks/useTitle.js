import { useEffect } from "react"

const useTitle = title => {
    useEffect(() => {
        document.title = `${title} - Phone Kinun`;
    }, [title]);
}
export default useTitle;