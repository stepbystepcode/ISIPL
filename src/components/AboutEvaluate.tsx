import {useState} from "react";

export const AboutEvaluate = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const personList = [
        {
            name: '刘老师',
            title: '中学教师',
            image: 'https://cdn.wegic.ai/assets/onepage/ai/image/b22de63c-fb7a-4bde-bc30-52ccb464aff5.jpeg',
            comment: 'Edu Genius Tracker帮助我提升了学生的学习效果，个性化评价非常精准。'
        },
        {
            name: '张老师',
            title: '小学教师',
            image: 'https://cdn.wegic.ai/assets/onepage/ai/image/c0d28b54-c175-49be-ad8a-897232f2c980.jpeg',
            comment: '这个系统的思维能力测评功能非常强大，帮助学生更好地掌握知识。'
        },
        {
            name: '王老师',
            title: '大学教授',
            image: 'https://cdn.wegic.ai/assets/onepage/ai/image/a8e13812-cb1e-4e11-9eba-8276156a64c5.jpeg',
            comment: '高效的数据处理引擎让我们能够实时了解学生的学习情况，提供及时的反馈。'
        }
    ];
    return (
        <div className="relative flex flex-col justify-center bg-slate-50 dark:bg-slate-900 overflow-hidden">
            <div className="w-full max-w-7xl mx-auto px-4 md:px-6 py-20">
                <div className="flex justify-center">
                    <div className="w-full max-w-3xl mx-auto text-center">
                        <div className="relative h-32">
                            <div
                                className="absolute  w-16 h-16  flex items-center justify-center bg-gradient-to-b rounded-full from-sky-500/10  top-0 left-1/2 -translate-x-1/2">
                                {personList.map((person, index) => (
                                    <img
                                        className={`absolute w-16 h-16 top-0 -z-10 rounded-full  duration-700 object-cover aspect-[1/1] border border-black/10 dark:border-white/10 ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}
                                        key={index}
                                        alt={person.name}
                                        src={person.image}
                                        />
                                    ))}
                              </div>
                        </div>
                        <div className="mb-9">
                            <div className="relative flex flex-col transition-all duration-150 delay-300 ease-in-out">
                                {personList.map((person, index) => (
                                    <div
                                        key={index}
                                        className={`transition-opacity duration-500 ${activeIndex === index ? ' opacity-100 visible relative' : 'absolute opacity-0 invisible'}`}
                                    >
                                        <div className="text-2xl font-semibold text-slate-900 dark:text-slate-200">
                                            <div
                                              >
                                                {person.comment}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center -m-1.5">
                            {personList.map((person, index) => (
                                <button onClick={()=>setActiveIndex(index)} className={`inline-flex justify-center whitespace-nowrap rounded-full px-4 py-3 m-1.5 text-xs shadow-sm focus-visible:outline-none focus-visible:ring focus-visible:ring-sky-300 dark:focus-visible:ring-slate-600 transition-colors duration-150 ${activeIndex !==index?'bg-white dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-300 hover:bg-sky-100 text-slate-900':'bg-sky-500 shadow-sky-950/10 text-white' }`}>
                                    <div
                                    >{person.name}
                                    </div>
                                    - <div
                                >
                                    {person.title}
                                </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
)
}