import {motion} from "framer-motion"
export const QA = () => {
    const qaList = [
        {
            question: '如何注册PLAAFTS?',
            answer: '点击首页的“立即注册”按钮，填写相关信息即可完成注册。'
        },
        {
            question: '系统如何进行个性化评价?',
            answer: '系统通过高效的数据处理引擎，实时解析学生的学习数据，提供个性化的评价与反馈。'
        },
        {
            question: '是否支持移动设备?',
            answer: 'PLAAFTS支持所有设备，您可以随时随地访问和使用。'
        }
    ];
    return (
        <section className="py-10 bg-white dark:bg-slate-800">
            <div className="max-w-7xl mx-auto px-4 py-10">
                <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
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
                        <div className="flex flex-col gap-6">
                            <div className="font-semibold tracking-widest text-sky-500 uppercase">
                                <div
                               >常见问题
                                </div>
                            </div>
                            <h2 className="TITLE-PRIMARY text-5xl font-semibold text-slate-900 dark:text-slate-50">
                                <div
                               >常见问题解答
                                </div>
                            </h2>
                            <div className="DESC text-base font-normal text-slate-600 dark:text-slate-400">
                                <div
                               >解答您在使用Edu
                                    Genius Tracker过程中可能遇到的疑问。
                                </div>
                            </div>
                        </div>
                    </motion.div>
                    <div className="flex flex-col gap-10">
                        <div className="space-y-8">
                            {qaList.map((qa, index) => (

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
                                    <div
                                        className="bg-white dark:bg-slate-700 border border-black/10 dark:border-white/10 rounded-lg hover:-translate-y-1  hover:shadow-xl hover:shadow-black/5 transition-all duration-300">
                                        <div className="p-6 flex flex-col gap-6">
                                            <div className=" text-xl font-semibold text-slate-900 dark:text-slate-50">
                                                <div
                                                >{qa.question}
                                                </div>
                                            </div>
                                            <div className=" text-base font-normal text-slate-600 dark:text-slate-400">
                                                <div
                                                >{qa.answer}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
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
                            <button
                                className=" flex group items-center gap-1 text-base font-semibold text-sky-500 hover:text-sky-400 focus:text-sky-500 ">
                                <div
>查看所有问题
                                </div>
                                <span className="group-hover:translate-x-1 transition-all duration-300">→</span>
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}