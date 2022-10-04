import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

const stripDefaultLocale = (str: string): string => {
    const stripped = str.replace('/default', '')
    return stripped
}

export function middleware(request: NextRequest) {
    const shouldHandleLocale =
        !PUBLIC_FILE.test(request.nextUrl.pathname) &&
        !request.nextUrl.pathname.includes('/api/') &&
        !request.nextUrl.pathname.includes('/app/') &&
        request.nextUrl.locale === 'default'

    const url = request.nextUrl.clone()
    url.pathname = `/en${stripDefaultLocale(request.nextUrl.pathname)}${request.nextUrl.search}`

    return shouldHandleLocale ? NextResponse.redirect(url) : undefined
}
