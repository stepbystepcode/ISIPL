import {NavLink} from "react-router-dom";
import {ChevronDown} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export const MainHeader = ({logout, email}) => {
    const List = [
        {
            name: "首页",
            path: "/"
        },
        {
            name: "关于我们",
            path: "/about"
        },
        {
            name: "联系我们",
            path: "/contact"
        }
    ];
    return (
        <header className="h-16 flex fixed top-0 bg-white w-screen z-50">
            <div className="w-80 flex justify-center items-center"
            style={{backgroundImage:"linear-gradient(90deg,#f5f5fa 80%,#ebebf0)"}}
            >LOGO</div>
            <nav className="border-b-[#eeeef5] border-b flex-grow flex pl-8 items-center justify-between">
                <ul className="flex gap-6">
                    {List.map((item, index) => (
                        <li key={index} className="text-gray-600 cursor-pointer">
                            <NavLink to={item.path}
                                     className=
                                             "transition-colors hover:text-foreground/80"

                            >{item.name}</NavLink>
                        </li>
                    ))}
                </ul>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <div className="mr-4 flex gap-2">
                            <span className="text-gray-500">abc1870819884@gmail.com</span>
                            <ChevronDown/>
                        </div>
                        </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={()=>logout()}>退出登录</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

            </nav>
        </header>
    );
}