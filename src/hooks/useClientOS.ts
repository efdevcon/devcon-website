import { useEffect, useState } from "react"

export const useClientOS = () => {
    const [state, setState] = useState({})

    useEffect(() => {
        const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent
        const isAndroid = Boolean(userAgent.match(/Android/i))
        const isIos = Boolean(userAgent.match(/iPhone|iPad|iPod/i))
        const isOpera = Boolean(userAgent.match(/Opera Mini/i))
        const isWindows = Boolean(userAgent.match(/IEMobile/i))
        const isSSR = Boolean(userAgent.match(/SSR/i))
        const isMobile = Boolean(isAndroid || isIos || isOpera || isWindows)
        const isDesktop = Boolean(!isMobile && !isSSR)

        setState({
            userAgent,
            isAndroid,
            isIos,
            isOpera,
            isWindows,
            isSSR,
            isMobile,
            isDesktop
        })
    }, [])

    return state
}