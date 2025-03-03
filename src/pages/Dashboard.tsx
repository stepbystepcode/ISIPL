import {supabase} from "@/lib/supabaseClient.ts";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Session} from "@supabase/supabase-js";
import {MainSidebar} from "@/components/MainSidebar.tsx";
import {MainHeader} from "@/components/MainHeader.tsx";
import { Toaster } from "@/components/ui/sonner"
export const Dashboard = () => {
    const navigate = useNavigate()
    const [session, setSession] = useState<Session | null>(null)
    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [navigate])
    const logout = async () => {
        await supabase.auth.signOut();
        navigate("/login")
    }
    return (
        <div className=" min-h-screen">
            <MainHeader logout={logout} email={session?.user?.email}/>
            <div className="flex-1 mx-auto w-full max-w-1440 bg-white pt-16">
                <div className="flex h-full">
                    <MainSidebar/>
                    <div className="ml-80 w-screen"><Outlet/><Toaster /></div>
                </div>
            </div>
        </div>
    )
}