import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBrain, faDatabase, faUserGraduate} from "@fortawesome/free-solid-svg-icons";

export const AboutBanner = () => {
    const features = [
        {
            title: "个性化评价",
            description: "基于学生数据，提供精准的个性化学习评价。",
            icon: faUserGraduate
        },
        {
            title: "思维能力测评",
            description: "实时测评学生的思维能力，帮助提升学习效果。",
            icon: faBrain
        },
        {
            title: "高效数据处理",
            description: "利用先进的数据处理引擎，确保数据的准确性与实时性。",
            icon: faDatabase
        }
    ];
    return (
        <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32  mt-16"><img
            className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-20"
            alt="About Banner Background"
            src="https://cdn.wegic.ai/assets/onepage/ai/image/79fe33bf-1983-4e7f-a587-cd48c2e03ab6.jpeg"
        />
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                        <div
                        >关于Edu
                            Genius Tracker
                        </div>
                    </h2>
                    <div className="mt-6 text-lg leading-8 text-gray-300">
                        <div
                        >我们利用高效的数据处理引擎，实时解析学生学习数据，提供个性化评价与思维能力测评，助力个性化教学。
                        </div>
                    </div>
                </div>
                <div
                    className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
                    {features.map((feature, index) => (
                        <div key={index}
                            className="flex gap-x-4 rounded-xl bg-white/5 backdrop-blur-xl p-6 ring-1 ring-inset ring-white/10">
                            <div className="text-lg text-indigo-400">
                                <FontAwesomeIcon icon={feature.icon}/>
                            </div>
                            <div className="text-base leading-7">
                                <h3 className="font-semibold text-white">
                                    <div
                                    >{feature.title}
                                    </div>
                                </h3>
                                <p className="mt-2 text-gray-300">
                                    <div
                                    >{feature.description}
                                    </div>
                                </p>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}