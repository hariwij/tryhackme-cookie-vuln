import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    let cookie = request.headers.get("cookie");
    let auth = cookie
        ?.split(";")
        .find((c) => c.trim().startsWith("Authorization="))
        ?.split("=")[1];
    auth = decodeURIComponent(auth || "");
    
    if (!validateToken(auth || "")) {
        if (request.nextUrl.pathname.startsWith("/api/")) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        else return NextResponse.redirect(new URL("/", request.url));
    } else return NextResponse.next();
}

export const config = {
    matcher: ["/api/paid", "/api/paid/:path*", "/paid"],
};

const validateToken = (token: string) => {
    // TODO: Validate token
    return token.length > 10;
};
