import {Header} from "@/components/Header.tsx";
import {Footer} from "@/components/Footer.tsx";
import {useNavigate} from "react-router-dom";

export const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="flex flex-col h-[100vh]">
        <Header />
        <div className="flex-1 bg-[#f2f2f2] flex flex-col gap-4 items-center justify-center">
            <img src="/404.png" alt="404" className="w-48"/>
            <h2 className="text-2xl font-bold text-gray-700">页面未找到</h2>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={()=>navigate('/')}>返回首页</button>
        </div>
        <Footer/>
    </div>
    )
}