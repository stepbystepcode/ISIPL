import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"
import {UserAuthForm} from "@/components/user-auth-form"
import {Link, useNavigate} from "react-router-dom";
import {supabase} from "@/lib/supabaseClient.ts";
import {useEffect, useState} from "react";
import {Session} from "@supabase/supabase-js";

export default function AuthenticationPage() {
    const navigate = useNavigate()
    const [session, setSession] = useState<Session | null>(null)
    const isLogin = window.location.pathname === '/login'
    useEffect(() => {
        console.log(session);
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
            if (session) navigate("/dashboard")
        })

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
            if (session) navigate("/dashboard")
        })
    }, [navigate, session])
    return (
        <>
            <div
                className="container grid h-[100vh] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link to='/'
                      className={cn(
                          buttonVariants({variant: "ghost"}),
                          "absolute right-20 top-4 md:right-24 md:top-8"
                      )}
                >首页</Link>
                <Link
                    to={isLogin ? '/register' : '/login'}
                    className={cn(
                        buttonVariants({variant: "ghost"}),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    {isLogin ? '注册' : '登录'}
                </Link>
                <div
                    className="relative hidden h-full flex-col bg-[#5423e7] p-10 dark:border-r lg:flex overflow-hidden">
                    <svg className="absolute top-0 left-0" width="720" height="787" viewBox="0 0 720 787" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M-392.905 -502.476L-391.004 -501.739C-391.004 -501.739 326.491 -197.031 501.442 -56.8491C676.392 83.3324 662.208 352.981 508.59 506.599C354.972 660.217 85.3233 674.401 -54.8582 499.451C-195.04 324.5 -499.748 -392.994 -499.748 -392.994L-500.485 -394.895C-516.584 -436.403 -527.156 -463.658 -494.411 -496.402C-461.667 -529.146 -434.412 -518.575 -392.905 -502.476Z"
                            fill="#7047EB"></path>
                    </svg>
                    <svg className="absolute top-0 left-0" width="392" height="487" viewBox="0 0 392 487" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M-336.818 -308.216L-335.645 -307.762C-335.645 -307.762 106.836 -120.048 214.706 -33.6373C322.576 52.7737 313.735 219.111 218.923 313.922C124.112 408.734 -42.2253 417.575 -128.636 309.705C-215.047 201.835 -402.761 -240.646 -402.761 -240.646L-403.215 -241.819C-413.132 -267.417 -419.644 -284.226 -399.434 -304.435C-379.225 -324.644 -362.416 -318.133 -336.818 -308.216Z"
                            fill="#FCC5F3"></path>
                    </svg>
                    <svg className="absolute bottom-0 left-0" width="632" height="316" viewBox="0 0 632 316" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M-351.418 900.397L-350.856 898.948C-350.856 898.948 -118.665 351.944 -11.8154 218.578C95.0341 85.2126 300.633 96.0786 417.79 213.235C534.947 330.392 545.813 535.991 412.447 642.841C279.081 749.69 -267.923 981.882 -267.923 981.882L-269.372 982.444C-301.016 994.711 -321.795 1002.77 -346.768 977.793C-371.74 952.821 -363.685 932.042 -351.418 900.397Z"
                            fill="#2DCA72"></path>
                    </svg>
                    <svg className="absolute bottom-0 right-0" width="477" height="768" viewBox="0 0 477 768"
                         fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M334.917 239.653L336.582 240.299C336.582 240.299 965.06 507.074 1118.29 629.839C1271.52 752.603 1259.04 988.825 1124.43 1123.43C989.823 1258.04 753.6 1270.52 630.836 1117.29C508.071 964.063 241.296 335.585 241.296 335.585L240.65 333.92C226.556 297.562 217.301 273.688 245.993 244.996C274.685 216.304 298.559 225.559 334.917 239.653Z"
                            fill="#00ACFF"></path>
                    </svg>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-80 px-10 py-8 bg-white shadow-lg border-b-4 border-b-[#f75fde]">
                            <p className="text-16 min-h-32">
                                &ldquo;个性化学习评价与反馈系统（PLAFS）：让学习更懂你，量身定制的学习评价，实时精准的反馈支持，助你突破学习天花板，成就更优秀的自己。&rdquo;
                            </p>

                            <div className="relative flex items-center mt-3">
                                <img className="block w-12 h-12 rounded-full"
                                     src="https://d16sqexnkq44wp.cloudfront.net/img/testimonials/avatar-eren.jpg"
                                     alt=""/>
                                <div className="ml-4">
                                    <h4 className="text-16 font-medium">陈老师</h4>
                                    <span className="text-wedges-gray-500">@ertuken</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                {!isLogin ? '创建您的账户' : '登录到您的账户'}
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                请输入您的电子邮件地址和密码以继续
                            </p>
                        </div>
                        <UserAuthForm/>
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            点击继续，即表示您同意我们的{" "}
                            <HoverCard>
                                <HoverCardTrigger><span
                                    className="underline underline-offset-4 hover:text-primary cursor-pointer"
                                >
                                服务条款
                            </span></HoverCardTrigger>
                                <HoverCardContent>
                                    服务条款bla bla bla...
                                </HoverCardContent>
                            </HoverCard>

                            {" "}
                            和{" "}
                            <HoverCard>
                                <HoverCardTrigger>
                                    <span
                                        className="underline underline-offset-4 hover:text-primary cursor-pointer"
                                    >
                                隐私政策
                            </span>
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    隐私政策bla bla bla...
                                </HoverCardContent>
                            </HoverCard>
                            。
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}