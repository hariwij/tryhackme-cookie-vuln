import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Tryhackme - Cookie Vulnerabilities",
    description: "Tryhackme - Cookie Vulnerabilities",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
