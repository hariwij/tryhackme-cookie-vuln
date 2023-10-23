"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState({});

    const [sigedUser, setSigedUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch("/api/signin", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            console.log("data", data);
            setSigedUser(data);
        };
        fetchUser();
    }, []);

    const onSubmit = async (e: any) => {
        e.preventDefault();
        const res = await fetch("/api/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await res.json();
        console.log(data);
        window.location.reload();
    };

    const loadContent = async () => {
        const res = await fetch("/api/paid", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        alert(data.message);
        console.log(data);
    };
    return (
        <main className="flex min-h-screen p-24">
            {sigedUser != null && sigedUser.email ? (
                <div>
                    <h1>Hi {sigedUser?.name}</h1>
                    <h1>Your email is : {sigedUser?.email}</h1>
                    <h1>Your type is : {sigedUser?.type}</h1>

                    {sigedUser?.type === "free" && (
                        <>
                            <h3>Please puchase paid version to access the content.</h3>
                            <button onClick={loadContent} className="w-96 h-12 p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-white">
                                Load Content
                            </button>
                        </>
                    )}

                    <button
                        onClick={async () => {
                            const res = await fetch("/api/signout", {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                            });
                            const data = await res.json();
                            console.log(data);
                            window.location.reload();
                        }}
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <form className="flex flex-col items-center justify-center" onSubmit={onSubmit}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-96 h-12 p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-96 h-12 p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                    />
                    <button type="submit" className="w-96 h-12 p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-white">
                        Sign In
                    </button>
                </form>
            )}
        </main>
    );
}
