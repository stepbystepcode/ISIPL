import {motion} from "framer-motion"
export const QA = () => {
    const qaList = [
        {
            question: '如何注册Edu Genius Tracker?',
            answer: '点击首页的“立即注册”按钮，填写相关信息即可完成注册。'
        },
        {
            question: '系统如何进行个性化评价?',
            answer: '系统通过高效的数据处理引擎，实时解析学生的学习数据，提供个性化的评价与反馈。'
        },
        {
            question: '是否支持移动设备?',
            answer: 'Edu Genius Tracker支持所有设备，您可以随时随地访问和使用。'
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
                            <p className="font-semibold tracking-widest text-sky-500 uppercase">
                                <div
                                     data-link="link=&amp;target=_blank&amp;text=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98">常见问题
                                </div>
                            </p>
                            <h2 className="TITLE-PRIMARY text-5xl font-semibold text-slate-900 dark:text-slate-50">
                                <div
                                     data-link="link=&amp;target=_blank&amp;text=%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94">常见问题解答
                                </div>
                            </h2>
                            <p className="DESC text-base font-normal text-slate-600 dark:text-slate-400">
                                <div
                                     data-link="link=&amp;target=_blank&amp;text=%E8%A7%A3%E7%AD%94%E6%82%A8%E5%9C%A8%E4%BD%BF%E7%94%A8Edu%20Genius%20Tracker%E8%BF%87%E7%A8%8B%E4%B8%AD%E5%8F%AF%E8%83%BD%E9%81%87%E5%88%B0%E7%9A%84%E7%96%91%E9%97%AE%E3%80%82">解答您在使用Edu
                                    Genius Tracker过程中可能遇到的疑问。
                                </div>
                            </p>
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
                                            <p className=" text-xl font-semibold text-slate-900 dark:text-slate-50">
                                                <div
                                                >{qa.question}
                                                </div>
                                            </p>
                                            <p className="TEXT-CONTENT text-base font-normal text-slate-600 dark:text-slate-400">
                                                <div
                                                >{qa.answer}
                                                </div>
                                            </p>
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
                                className="TEXT-LINK flex group items-center gap-1 text-base font-semibold text-sky-500 hover:text-sky-400 focus:text-sky-500 ">
                                <div
                                    data-link="link=%2F&amp;target=_blank&amp;text=%E6%9F%A5%E7%9C%8B%E6%89%80%E6%9C%89%E9%97%AE%E9%A2%98">查看所有问题
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