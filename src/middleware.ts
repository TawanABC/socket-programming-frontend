import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {

    const token = request.cookies.get('token')?.value;
    console.log("middleware hello", token);
    console.log(request.cookies);
    if (!token) {
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();

}

export const config = {
    // matcher: [],
    matcher: ['/home/:path*'],
};