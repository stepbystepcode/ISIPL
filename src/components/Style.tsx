import { motion } from "framer-motion"

export const Style = () => {
    const styleList = [
        {
            title: '团队研讨会',
            desc: '活动',
            img: 'https://cdn.wegic.ai/assets/onepage/ai/image/665a8de7-7ae9-4bbf-94b1-5dc2fcd72ca2.jpeg'
        },
        {
            title: '教育会议',
            desc: '会议',
            img: 'https://cdn.wegic.ai/assets/onepage/ai/image/ce461945-3aeb-4247-a301-c42bd4f25778.jpeg'
        },
        {
            title: '办公室日常',
            desc: '日常',
            img: 'https://cdn.wegic.ai/assets/onepage/ai/image/00d42e06-e7e0-4abe-9bfc-16e00f44630a.jpeg'
        },
        {
            title: '团队建设',
            desc: '活动',
            img: 'https://cdn.wegic.ai/assets/onepage/ai/image/cd2369a9-03f5-417b-bb2d-48c15889eb79.jpeg'
        },
        {
            title: '培训活动',
            desc: '培训',
            img: 'https://cdn.wegic.ai/assets/onepage/ai/image/2c07a103-297c-4b25-985f-acdf994e22b2.jpeg'
        },
        {
            title: '团队会议',
            desc: '会议',
            img: 'https://cdn.wegic.ai/assets/onepage/ai/image/f988c0cf-24d5-4f96-ba19-796598089100.jpeg'
        }
    ];
    return (
        <section className="bg-white dark:bg-slate-800 px-6 py-24 md:px-8 md:py-32">
            <div className="mx-auto w-full max-w-7xl flex flex-col gap-12">
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
                    <div className="w-full flex flex-col gap-6 text-center md:text-left">
                        <h2 className="TITLE-PRIMARY text-4xl font-semibold text-slate-900 dark:text-slate-50">
                            <div
                              >团队风采
                            </div>
                        </h2>
                        <p className="DESC font-normal text-slate-700 dark:text-slate-400">
                            <div
                              >展示我们的团队活动，增强亲和力。
                            </div>
                        </p>
                    </div>
                </motion.div>
                <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-3 lg:grid-cols-6">
                    {styleList.map((style, index) => (
                        <motion.div className="max-w-7xl mx-auto"
                                    key={index}
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
                            <div className="relative group">
                                <div className="overflow-hidden aspect-w-3 aspect-h-4 flex justify-center items-center">
                                    <img
                                        className="IMAGE object-cover w-full h-full transition-all duration-300 origin-bottom group-hover:scale-110 aspect-[3/4]"
                                        alt={style.title}
                                        src={style.img}
                                    />
                                    <div className="absolute z-20  flex flex-col justify-center items-center">
                                        <h3 className="TITLE-SECONDARY text-base font-bold text-white">
                                            <div
                                               >{style.title}
                                            </div>
                                        </h3>
                                        <div className="DESC text-sm font-medium text-gray-300">
                                            <div
                                               >{style.desc}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute z-10 inset-0 bg-black/20  pointer-events-none"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                </div>
            </div>
        </section>
    )
}