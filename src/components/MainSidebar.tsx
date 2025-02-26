import {House, Bot, ChartPie, Brain, Settings, FileBadge, GraduationCap, Codepen} from "lucide-react";
import {cn} from "@/lib/utils.ts";
import {NavLink} from "react-router-dom";

export const MainSidebar = () => {
    const navItems = [
        {name: "个人中心", icon: House, path: "profile"},
        {name: "学习助手", icon: Bot, path: "assistant"},
        {name: "学情评价", icon: ChartPie, path: "evaluation"},
        {name: "知识掌握", icon: GraduationCap, path: "knowledge"},
            {name: "知识理解", path: "comprehension"},
            {name: "知识迁移", path: "transmission"},
            {name: "知识应用", path: "application"},
        {name: "综合能力", icon: Codepen, path: "skills"},
            {name: "团队协作", path: "collaboration"},
            {name: "沟通能力", path: "communication"},
            {name: "问题解决", path: "solution"},
        {name: "高阶思维", icon: Brain, path: "thinking"},
            {name: "抽象思维", path: "abstraction"},
            {name: "元认知思维", path: "understanding"},
            {name: "批判思维", path: "criticism"},
            {name: "反事实-假设思维", path: "hypothesis"},
        {name: "评价反馈", icon: FileBadge, path: "feedback"},
            {name: "人机交互", path: "interaction"},
            {name: "人机互动", path: "dialogue"},
        {name: "系统设置", icon: Settings, path: "settings"}
    ];
    return (
        <aside
            className="w-80 fixed top-0 h-screen flex flex-col"
            style={{backgroundImage: "linear-gradient(90deg,#f5f5fa 80%,#ebebf0)"}}
        >
            <ul className="p-10 h-full pt-16">
                {navItems.map((item, index) => (
                    <li key={index} className={`${item.icon?'mt-4':'mt-2'} cursor-pointer text-gray-500`}>
                        <NavLink to={item.path} className={({ isActive, isPending, isTransitioning }) =>
                            cn(
                                "transition-colors flex items-center gap-4 ",
                                {
                                    "text-[#7047eb] font-bold": isActive,
                                    "text-foreground/60 hover:text-foreground/80": !isActive,
                                    "pending": isPending,
                                    "transitioning": isTransitioning
                                }
                            )
                        }>
                            {item.icon?<item.icon size={24}/>:<div className="pl-9"></div>}
                        <span>{item.name}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
            <div className="flex justify-between text-gray-400 text-sm py-4 border-t mx-4 px-4">
                <span>PLAFS</span><span>山西大学</span></div>
        </aside>
    );
}