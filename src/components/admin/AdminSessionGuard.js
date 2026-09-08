"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";


const SESSION_KEY = "admin_last_activity";
const TIMEOUT = 30 * 60 * 1000; // 30 menit

export default function AdminSessionGuard({ children}) {
    const pathname = usePathname();
    const router = useRouter();
    const [checking, setChecking] =useState(true);

    useEffect(() => {
        //Halaman login tidak perlu diperiksa
        if (pathname === "/admin/login") {
            setChecking(false);
            return;
        }

        const supabase = createClient();
        let isLoggingOut = false;

        async function logout() {
            if (isLoggingOut) {
                return;
            }

            isLoggingOut = true;

            localStorage.removeItem(SESSION_KEY);

            await supabase.auth.signOut({
                scope: "local",
            });

            router.replace("/admin/login");
            router.refresh();
        }

        function checkSession() {
            const lastActivity = Number(
                localStorage.getItem(SESSION_KEY)
            );

            const sessionExpired =
                !lastActivity ||
                Date.now() - lastActivity >= TIMEOUT;

            if (sessionExpired) {
                logout();
                return false;
            } 

            return true;
        }

        function updateActivity() {
            const lastActivity = Number(
                localStorage.getItem(SESSION_KEY)
            );

            // Jangan Memperbarui waktu jika sesi sudah kadaluwarsa
            if (
                !lastActivity ||
                Date.now() - lastActivity >= TIMEOUT
            ) {
                logout();
                return;
            }

            localStorage.setItem(
                SESSION_KEY,
                String(Date.now())
            );
        }

        const sessionIsValid =checkSession();

        if (!sessionIsValid) {
            return;
        }

        setChecking(false);

        const events = [
            "click",
            "keydown",
            "scroll",
            "touchstart",
        ];

        events.forEach((eventName) => {
            window.addEventListener(eventName, updateActivity);
        });

        //Periksa sesi setiap 1 menit 
        const interval = window.setInterval(
            checkSession,
            60 * 1000
        );

        return () => {
            events.forEach((eventName) => {
                window.removeEventListener(
                    eventName, updateActivity
                );
            });

            window.clearInterval(interval);
        };
    }, [pathname, router]);

    if (checking && pathname !== "/admin/login") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p className="font-bold text-[#38b98b]"> Memeriksa sesi admin...</p>
            </div>
        );
    }

    return children;
}