import { motion } from "framer-motion"
import {faBook, faChartLine, faCogs, faLaptop, faUserCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Skill = () => {
    const skills = [
        {
            title: '数据分析',
            desc: '精通数据分析，确保学生数据的准确性与实时性。',
            percentage: 95,
            icon: faChartLine
        },
        {
            title: '教育心理学',
            desc: '深谙教育心理学，帮助学生提升学习动力。',
            percentage: 90,
            icon: faBook
        },
        {
            title: '算法开发',
            desc: '开发先进的算法，提供精准的个性化学习建议。',
            percentage: 85,
            icon: faCogs
        },
        {
            title: '用户体验设计',
            desc: '设计直观易用的用户界面，提升用户体验。',
            percentage: 80,
            icon: faUserCheck
        },
        {
            title: '教育技术',
            desc: '应用最新的教育技术，提升教学效果。',
            percentage: 75,
            icon: faLaptop
        }
    ];
    return (
        <div className="w-full h-full bg-white dark:bg-slate-800">
            <section className="w-full h-full max-w-7xl mx-auto py-20 px-4 flex flex-col items-center">
                <h1 className="TITLE-PRIMARY text-4xl font-semibold text-slate-900 dark:text-white">
                    <div className="_editable_jwu41_1 undefined"
                       >我们的技能
                    </div>
                </h1>
                <div
                    className="DESC text-base max-w-xl text-center mt-4 mb-12 font-normal text-slate-700 dark:text-white/80">
                    <div className="_editable_jwu41_1 undefined"
                      >我们具备多种专业技能，确保为每一位学生提供最佳的个性化教学体验。
                    </div>
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
                    <div className="w-full h-full flex flex-wrap -m-4">
                        {skills.map((skill, index) => (
                            <div className="w-full h-full flex flex-col p-4 md:w-1/3" key={index}>
                                <div className="w-full h-full p-6 rounded-lg border border-black/10 dark:border-white/10">
                                    <div className="text-xl mb-4 dark:text-white/80"

                                        >
                                        <FontAwesomeIcon icon={skill.icon}/>
                                  </div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white/80">
                                        <div className="_editable_jwu41_1 undefined"
                                           >{skill.title}
                                        </div>
                                    </h3>
                                    <p className="leading-relaxed text-base font-normal text-slate-700 dark:text-white/80">
                                        <div className="_editable_jwu41_1 undefined"
                                           >{skill.desc}
                                        </div>
                                    </p>
                                    <div className="flex mt-6 items-center"><span
                                        className="text-xs font-semibold inline-block py-1 px-2 text-sky-600 bg-sky-100 rounded-full dark:bg-sky-200"> <div
                                        className="_editable_jwu41_1 undefined"
                                        data-link="link=&amp;target=_blank&amp;text=95%25">{skill.percentage}%</div></span>
                                        <div className="w-full bg-slate-200 dark:bg-slate-900 rounded-full h-2 ml-4">
                                            <div className="bg-sky-500 h-2 rounded-full" style={{width: `${skill.percentage}%`}}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </div>
    )
}