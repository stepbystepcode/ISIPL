import { motion } from "framer-motion"
import {faDiscord, faTiktok, faTwitter} from "@fortawesome/free-brands-svg-icons";
import Bg from './Bg';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
export const Banner = () => {
    return (
        <div className="relative mt-16 lg:mt-36">
            <motion.div className="max-w-7xl mx-auto"
                         viewport={{ once: true }}
                         whileInView={{
                             opacity: [0, 1],
                             y: [50, 0],
                             transition: {
                                 delay: 0.2,
                                 duration: 0.8,
                                 ease: "easeInOut"
                             }
                         }}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div>
                        <div
                            className="relative my-0 lg:my-20 max-w-xl mx-auto md:max-w-none text-center md:text-left flex flex-col md:flex-row">
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-3xl -mx-20 -z-10 overflow-hidden mb-12 mt-0 md:mb-0">
                                <div
                                    className="absolute -top-16 left-1/2 -translate-x-1/3 md:-translate-x-1/2 pointer-events-none -z-10 blur-2xl">
                                    <Bg/>
                                </div>
                            </div>
                            <div className="flex flex-col md:w-[640px] py-12 md:py-20 md:min-h-[480px]">
                                <div className="text-5xl font-bold text-slate-50 mb-6">欢迎来到PLAAFTS</div>
                                <div className="text-white/60 mb-6">个性化学习评价与反馈系统，助力学生全面发展。</div>
                            <div className="w-full mt-6 flex flex-col gap-6 items-center md:flex-row">
                                <button
                                    className="w-fit flex items-center gap-1 text-white whitespace-nowrap px-6 py-3 rounded-full bg-sky-500 hover:bg-sky-600 group">
                                    <span>立即注册</span>
                                    <div className="group-hover:translate-x-1 transition-all duration-300">

                                        <FontAwesomeIcon icon={faArrowRight} />
                                    </div>
                                </button>
                                <div className="flex items-center gap-6">
                                    <div className="inline-flex -space-x-4 -ml-0.5">
                                        {[1, 2, 3, 4].map((avatar) => (<img key={avatar}
                                                                            className="w-12 h-12 rounded-full border-4 border-black/80 aspect-[1/1] object-cover"
                                                                            src={`/avatar/${avatar}.jpeg`} alt=""/>))}
                                    </div>
                                    <div className="text-xl text-white/60 font-medium">+50K</div>
                                </div>
                            </div>
                            <div className="mt-10 flex items-center justify-center gap-6 md:justify-start">
                                {[faTiktok, faDiscord, faTwitter].map((icon, index) => (
                                    <button key={index} className="w-10 h-10  rounded-full hover:bg-sky-500">
                                        <div className="text-xl text-center text-white">

                                            <FontAwesomeIcon icon={icon}/></div>
                                    </button>))}
                            </div>
                            </div>
                            <div className=" mx-auto  md:absolute md:left-[50rem] md:top-1/2 md:-translate-y-1/2">
                                <img src="/banner.jpeg" alt="banner"
                                     className="w-full h-auto rounded-xl aspect-[4/3] md:aspect-[3/4.5] object-cover"/>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}