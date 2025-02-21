import {motion} from "framer-motion"

interface Item {
    text: string;
    key: number;
    num: number;
}

const ListItem = ({text, num}: Item) => (
    <div
        className={`w-full text-center border border-black/10 dark:border-white/10 `}
    >
        <img className="w-full h-auto aspect-[4/1] opacity-60 object-cover" src={`/avatar/${num}.jpeg`} alt=""/>
        <div className="px-4 pb-6">
            <div className="relative inline-flex -mt-8 mb-3">
                <img className="w-16 h-16 rounded-full aspect-[1/1] object-cover" src={`/avatar/${num}.jpeg`} alt=""/>
            </div>
            <div className="mb-5 flex flex-col gap-1">
                <div className="inline-block font-bold text-xl text-slate-900 dark:text-slate-50">
                    {text}
                </div>
                <div className="text-sm text-slate-500">@{text}</div>
            </div>
        </div>
    </div>
);
const listData: string[] = [
    '提供多种学习评价方式',
    '支持多种评价维度',
    '支持多种评价形式',
    '支持多种评价对象',
];
export const Features = () => {
    return (
        <div className="w-full bg-white dark:bg-slate-900 px-6 py-24 md:px-8 md:py-32">
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
                <div className="w-full max-w-7xl mx-auto">
                    <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                        <div className="text-4xl font-bold text-slate-900 dark:text-slate-50 md:text-5xl">
                        PLAFS 主要功能
                        </div></div>
                    <div
                        className="max-w-xl mx-auto md:max-w-none flex flex-col md:flex-row md:items-center space-y-8 md:space-y-0">
                        <div className="md:w-1/2">
                            <div className="flex space-x-6">
                                <div className="w-1/2 space-y-6">
                                    {listData.slice(0, 2).map((item, index) => (
                                        <ListItem key={index} num={index+1} text={item}/>
                                    ))}
                                </div>
                                <div className="w-1/2 space-y-6 mt-6">
                                    {listData.slice(2).map((item, index) => (
                                        <ListItem
                                            key={index}
                                            num={index+3}
                                            text={item}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="md:w-1/2 md:pl-10 lg:pl-20">
                            <div
                                className="w-full flex flex-col items-center gap-6 text-center md:text-left md:items-start">
                                <img className="IMAGE w-full h-auto aspect-[4/3] object-cover mb-12"
                                     src="https://cdn.wegic.ai/assets/onepage/ai/image/9ff0a57a-8bb3-4c33-98ee-80c5c3a052bc.jpeg"
                                     alt="DIY Teaching"
                                     />
                                <div className=" text-4xl font-semibold text-slate-900 dark:text-slate-50" >个性化教学 </div>
                                <div className=" text-xl text-slate-600 dark:text-slate-400">利用高效的数据处理引擎，实时解析学生学习数据，提供个性化评价与思维能力测评。 </div>
                                <button className=" w-fit text-white bg-sky-500 py-2 px-6 md:py-3 md:px-8 rounded-lg hover:bg-sky-600 mt-6">
                                    <div>了解更多</div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}