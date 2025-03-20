// app/layout.tsx
import React from 'react';
import Navbar from '../components/Navbar';
import './globals.css'; // Make sure this is imported

export const metadata = {
    title: 'Exam Portal',
    description: 'Mock exam page layout with Tailwind',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-gray-100 min-h-screen m-0 p-0">
                <Navbar />
                {children}
            </body>
        </html>
    );
}
