import { motion } from "framer-motion"
import {faFacebook, faInstagram, faTwitter} from "@fortawesome/free-brands-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Footer = () => {
    const navItems = [
        {name: '首页', href: '/'},
        {name: '关于我们', href: '/about'},
        {name: '隐私政策', href: '/privacy'},
        {name: '使用条款', href: '/terms'},
        {name: '支持', href: '/support'},
    ]

    return (
        <footer className="py-10 bg-black">
            <motion.div className="max-w-7xl mx-auto"
                        viewport={{once: true}}
                        whileInView={{
                            opacity: [0, 1],
                            y: [50, 0],
                            transition: {
                                delay: 0.2,
                                duration: 0.8,
                                ease: "easeInOut"
                            }
                        }}>
                <div className="mx-auto px-4 max-w-7xl py-10 flex flex-col items-center gap-12">
                    <div className="_editable_jwu41_1 DESC ml-2  text-sm text-white/60"
                        >© 2024 Edu
                        Genius Tracker
                    </div>
                    <div className="flex flex-col gap-8 items-center md:flex-row">
                        <ul className="flex flex-col items-center gap-8 sm:flex-row">
                            {navItems.map((item, index) => (
                                <li key={index}>
                                    <button
                                        className="text-sm text-white hover:text-sky-500 focus:text-sky-500  dark:hover:text-sky-500 dark:focus:text-sky-500">
                                        <div
                                        >{item.name}
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="w-full h-px bg-white/20 dark:bg-white/10 md:w-px md:h-6"></div>
                        <ul className="flex items-center gap-8">
                            {[faTwitter, faFacebook, faInstagram].map((icon, index) => (
                                <li key={index}>
                                <button className="text-white">
                                    <div className=" text-lg  hover:text-sky-500 focus:text-sky-500 dark:hover:text-sky-500 dark:focus:text-sky-500">

                                        <FontAwesomeIcon icon={icon}/></div>
                                </button></li>))}
                        </ul>
                    </div>
                </div>
            </motion.div>
        </footer>
    )
}