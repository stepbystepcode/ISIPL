import { motion } from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedin, faTwitter} from "@fortawesome/free-brands-svg-icons";

export const Team = () => {
    const TeamMembers = [
        {
            name: '李华',
            title: '数据科学家',
            image: 'https://cdn.wegic.ai/assets/onepage/ai/image/1e3f81f0-770f-4c28-84a0-974bc41f71f0.jpeg',
            socials: [
                {
                    icon: 'twitter',
                    link: ''
                },
                {
                    icon: 'linkedin',
                    link: ''
                },
            ],
        },
        {
            name: '王芳',
            title: '教育专家',
            image: 'https://cdn.wegic.ai/assets/onepage/ai/image/aae05239-3b40-4939-ab7a-fc6e841efe6c.jpeg',
            socials: [
                {
                    icon: 'twitter',
                    link: ''
                },
                {
                    icon: 'linkedin',
                    link: ''
                }
            ],
        },
        {
            name: '张伟',
            title: '技术工程师',
            image: 'https://cdn.wegic.ai/assets/onepage/ai/image/e1b6acca-87b3-43aa-bfc5-e23242c86ac5.jpeg',
            socials: [
                {
                    icon: 'twitter',
                    link: ''
                },
                {
                    icon: 'linkedin',
                    link: ''
                }
            ]
        }];
    return (
        <div className="bg-white dark:bg-slate-800 py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="TITLE-PRIMARY text-3xl font-bold tracking-tight text-slate-900 dark:text-white/90 sm:text-4xl">
                        <div className="_editable_jwu41_1 undefined"
                        >我们的团队
                        </div>
                    </h2>
                    <p className="DESC mt-6 text-lg leading-8 text-slate-700 dark:text-white/80">
                        <div className="_editable_jwu41_1 undefined"
                        >我们是一支由教育专家、数据科学家和技术工程师组成的团队，致力于提升个性化教学效果。
                        </div>
                    </p>
                </div>
                <ul role="list"
                    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {TeamMembers.map((member, index) => (
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
                            <li><img className="IMAGE aspect-[3/2] w-full rounded-2xl object-cover" alt="people_0"
                                     src="https://cdn.wegic.ai/assets/onepage/ai/image/1e3f81f0-770f-4c28-84a0-974bc41f71f0.jpeg"
                            />
                                <h3 className="TITLE-SECONDARY mt-6 text-lg font-semibold leading-8 tracking-tight text-slate-900 dark:text-white/90">
                                    <div className="_editable_jwu41_1 undefined"
                                    >{member.name}
                                    </div>
                                </h3>
                                <p className="TEXT-CONTENT text-base leading-7 text-slate-600 dark:text-white/80">
                                    <div className="_editable_jwu41_1 undefined"
                                    >{member.title}
                                    </div>
                                </p>
                                <ul role="list" className="mt-6 flex gap-x-6">
                                    <li><span
                                        className="text-slate-400 hover:text-slate-500 dark:hover:text-white"><div
                                        className="text-xl text-slate-900 dark:text-white/90"

                                       >

                            <FontAwesomeIcon icon={faTwitter}/>
                                    </div></span>
                                    </li>
                                    <li><span
                                        className="text-slate-400 hover:text-slate-500 dark:hover:text-white"><div
                                        className="text-xl text-slate-900 dark:text-white/90"

                                       >
                                        <FontAwesomeIcon icon={faLinkedin} />
                                    </div></span>
                                    </li>
                                </ul></li>
                        </motion.div>
                    ))}
                </ul>
            </div>
        </div>
)
}