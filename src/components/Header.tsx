import { Fade as Hamburger } from 'hamburger-react'
import { motion } from "framer-motion"
import {useState} from "react";
import { Link } from "react-router-dom";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
export const Header = () => {
    const navItems = [
        {
            name: '首页',
            url: '/'
        },
        {
            name: '关于我们',
            url: '/about'
        },
        {
            name: '联系我们',
            url: '/contact'
        }
    ]
    const [isOpen, setOpen] = useState(false)
    return (
        <header className="fixed top-0 z-40 w-full h-16 bg-white/80 backdrop-blur-xl dark:bg-black/80 md:px-8">
            <div className="w-full mx-auto max-w-7xl h-full hidden gap-5 md:grid md:grid-cols-[1fr_0.5fr_1fr] md:items-center">
                <nav className="w-full h-full flex items-center justify-start">
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            className="pr-12 py-3 text-black whitespace-nowrap cursor-pointer hover:text-black/60 hover:transition-all duration-100 dark:text-white dark:hover:text-white/60">
                            <div><Link to={item.url}>{item.name}</Link></div>
                        </button>
                    ))}
                </nav>
                <div className="w-full h-full flex items-center justify-center">
                    <img className="w-auto h-10 object-cover" src="/logo.png" alt="LOGO"/>
                </div>
                <div className="w-full h-full flex items-center justify-end">
                    <button
                        className="BTN-PRIMARY w-fit h-10 px-5 group text-sm whitespace-nowrap font-semibold text-white flex gap-2 items-center rounded-full bg-blue-500 hover:bg-blue-600 hover:transition-all hover:duration-300">
                        <span>联系我们</span>
                        <div className="group-hover:translate-x-1 transition-all duration-300">

                            <FontAwesomeIcon icon={faArrowRight}/>
                        </div>
                    </button>
                </div>
            </div>
            <div className="relative z-40 w-full h-full flex items-center md:hidden">
                <img className="w-auto h-10 px-6 object-cover" src="/logo.png" alt="LOGO"/>
                <div className="absolute right-6">
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                </div>
                <div className="absolute z-50 top-16 w-full flex flex-col gap-3 bg-white rounded-b-xl shadow-xl dark:bg-black">
                    {isOpen&&<motion.nav className="w-full py-3 flex flex-col" animate={{ opacity: [0, 1], y: [20, 0] }} transition={{ duration: 0.4 }}>
                    {navItems.map((item, index) => (
                        <button
                            key={index}
                            className="w-full px-6 py-3 text-black text-left whitespace-nowrap cursor-pointer hover:text-black/60 hover:transition-all duration-100 dark:text-white dark:hover:text-white/60">
                            <div className="relative"><a>{item.name}</a></div>
                        </button>
                    ))}
                    </motion.nav>}
                </div>
            </div>
        </header>
    )
}