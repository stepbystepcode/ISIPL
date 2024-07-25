import {motion} from "framer-motion"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowRight, faPlay} from "@fortawesome/free-solid-svg-icons";
export const Evaluate = () => {
    return (
        <div className="py-10 bg-[#e8f3ff] dark:bg-slate-800">
            <div className="mx-auto px-4 py-10 max-w-7xl flex flex-col gap-20 items-center">
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
                    <div className="mx-auto text-center max-w-2xl flex flex-col gap-6">
                        <h2 className=" text-5xl font-semibold text-slate-900 dark:text-white">
                            <div>用户评价</div>
                        </h2>
                        <p className=" text-base font-normal text-slate-600 dark:text-white/70">
                            <div>来自学生和教师的真实反馈，见证Edu
                                Genius Tracker的卓越表现。
                            </div>
                        </p>
                    </div>
                </motion.div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {[{name: '李明', role: '学生'}, {name: '王芳', role: '教师'}, {name: '张三', role: '家长'}].map((item, index) => (
                        <motion.div className="max-w-7xl mx-auto"
                                    viewport={{once: true}}
                                    key={index}
                                    whileInView={{
                                        opacity: [0, 1],
                                        y: [50, 0],
                                        transition: {
                                            delay: 0.2,
                                            duration: 0.8,
                                            ease: "easeInOut"
                                        }
                                    }}>
                            <div className="relative overflow-hidden group rounded-2xl"><img
                                className="object-cover w-full h-auto aspect-[4/3] md:aspect-[3/4] transition-all duration-200 group-hover:scale-110"
                                alt="https://cdn.wegic.ai/assets/onepage/ai/image/47cc6667-a036-4314-9a48-0ba3a43dbb6b.jpeg"
                                src="https://cdn.wegic.ai/assets/onepage/ai/image/47cc6667-a036-4314-9a48-0ba3a43dbb6b.jpeg"
                            />
                                <div
                                    className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#116170] via-transparent to-transparent opacity-80"></div>
                                <div className="absolute bottom-0 left-0 w-full px-6 py-5">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-base font-semibold text-white">
                                                <div
                                                >{item.name}
                                                </div>
                                            </p>
                                            <p className=" mt-1 text-sm font-normal text-white/70">
                                                <div>{item.role}
                                                </div>
                                            </p>
                                        </div>
                                        <button
                                            className=" inline-flex items-center justify-center h-14 w-14 text-white bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl hover:bg-white/20 transition-all duration-200 pointer-events-auto">
                                            <FontAwesomeIcon icon={faPlay}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    ))}
                </div>
                <div>
                    <button
                        className="inline-flex group items-center gap-2 text-base font-semibold text-sky-500 hover:text-sky-400 dark:hover:text-sky-400 transition-all duration-200 group">
                        查看所有评价
                        <div className="text-sky-500 group-hover:translate-x-1 transition-all duration-200 group-hover:text-sky-400 dark:group-hover:text-sky-400"><FontAwesomeIcon icon={faArrowRight} /></div>
                    </button>
                </div>
            </div>
        </div>
    );
}