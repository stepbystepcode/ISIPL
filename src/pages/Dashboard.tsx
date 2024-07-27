import {supabase} from "@/lib/supabaseClient.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Session} from "@supabase/supabase-js";

export const Dashboard = () => {
    const navigate = useNavigate()
    const [session, setSession] = useState<Session | null>(null)
    console.log(session)
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
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
        <>
        <div>Dashboard</div>
        <div>{session?.user?.email}</div>

        <button onClick={()=>logout()}>Logout</button>
        </>
    )
}