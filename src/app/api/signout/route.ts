import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    return NextResponse.json(
        {},
        {
            headers: {
                "Set-Cookie":
                    serialize("Authorization", "", {
                        path: "/",
                        maxAge: -1,
                    }) +
                    "," +
                    serialize("AccountType", "", {
                        path: "/",
                        maxAge: -1,
                    }),
            },
        }
    );
}
