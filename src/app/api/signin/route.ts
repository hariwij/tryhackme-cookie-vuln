import { NextRequest, NextResponse } from "next/server";
import { serialize } from "cookie";
import base64 from "base-64";

const users = [
    {
        id: 1,
        name: "John Doe",
        email: "jhon@gmail.com",
        password: "123456",
        type: "free",
    },
    {
        id: 2,
        name: "Jane Doe",
        email: "jane@gmail.com",
        password: "123456",
        type: "paid",
    },
];

export async function GET(request: NextRequest) {
    let cookie = request.headers.get("cookie");
    let auth = cookie?.split(";").find((c) => c.trim().startsWith("Authorization="))?.split("=")[1];
    auth = decodeURIComponent(auth || "");

    if (auth) {
        let usr = users.find((u) => base64.decode(auth || "") == JSON.stringify(u));
        if (usr) {
            return NextResponse.json(usr);
        } else {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
    } else {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
}

export async function POST(request: NextRequest) {
    let body = (await request.json()) as { email: string; password: string };
    if (!body.email || !body.password) {
        return NextResponse.json({ message: "Invalid rerquest" }, { status: 400 });
    }
    let usr = users.find((u) => u.email == body.email && u.password == body.password);
    if (usr) {
        return NextResponse.json(usr, {
            headers: {
                "Set-Cookie":
                    serialize("Authorization", base64.encode(JSON.stringify(usr)), {
                        path: "/",
                        httpOnly: true,
                        sameSite: true,
                        secure: false,
                        maxAge: 3600,
                    }) +
                    "," +
                    serialize("AccountType", usr.type, {
                        path: "/",
                        httpOnly: true,
                        sameSite: true,
                        secure: false,
                        maxAge: 3600,
                    }),
            },
        });
    } else {
        return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }
}
