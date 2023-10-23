import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import base64 from "base-64";

export async function GET(request: NextRequest) {
    let cookie = request.headers.get("cookie");
    let type = cookie
        ?.split(";")
        .find((c) => c.trim().startsWith("AccountType="))
        ?.split("=")[1];
    type = decodeURIComponent(type || "");

    if (type == "paid") {
        return NextResponse.json({ message: "You are a paid user. You have access to premium content." });
    } else return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}
