import {faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export const Join = () => {
    return (
        <div className="w-full bg-white dark:bg-slate-800">
            <div className="max-w-7xl mx-auto py-10 px-4">
                <div
                    className="relative isolate overflow-hidden bg-[#114770] px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
                    <h2 className=" mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white/90 sm:text-4xl">
                        <div 
                          >立即加入Edu
                            Genius Tracker
                        </div>
                    </h2>
                    <p className="DESC mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300/90">
                        <div 
                           >注册并体验我们的个性化学习评价与反馈系统，助力学生全面发展。
                        </div>
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <button
                            className=" flex items-center justify-center text-white bg-sky-500 font-medium border-0 py-2 xl:py-3 px-6 focus:outline-none hover:bg-sky-400 rounded-lg text-sm sm:text-base 2xl:text-lg transition-colors duration-500">
                            <div 
                           >立即注册
                            </div>
                        </button>
                        <button
                            className=" text-sm group flex items-center gap-1 font-semibold leading-6 text-white">
                            <div 
                           >了解更多
                            </div>
                            <div className=" group-hover:translate-x-1 transition-all duration-300"
                              >
                                <FontAwesomeIcon icon={faArrowRight}/>
</div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}