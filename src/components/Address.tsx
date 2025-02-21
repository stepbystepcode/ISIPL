import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLocationDot} from "@fortawesome/free-solid-svg-icons";

export const Address = () => {
    const addressList = [
        {
            title: 'PLAFS 北京办公室',
            description: '联系我们的北京团队，了解更多信息。',
            location: '北京市朝阳区望京街道',
            email: 'beijing@edugeniustracker.com'
        },
        {
            title: 'PLAFS 上海办公室',
            description: '与我们的上海专家讨论您的需求。',
            location: '上海市浦东新区世纪大道',
            email: 'shanghai@edugeniustracker.com'
        },
        {
            title: 'PLAFS 深圳办公室',
            description: '在深圳开启您的个性化教育之旅。',
            location: '深圳市南山区科技园',
            email: 'shenzhen@edugeniustracker.com'
        }
    ];
    return (
        <section className="py-10 bg-white dark:bg-slate-800 sm:py-16 lg:py-20">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="grid justify-items-center grid-cols-1 lg:grid-cols-3 gap-y-12 lg:gap-x-8 xl:gap-x-20">
                    {addressList.map((address, index) => (
                        <div key={index}>
                            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white/90">
                                <div 
                                   >Edu
                                    {address.title}
                                </div>
                            </h3>
                            <div className="mt-3 text-base font-normal text-slate-700 dark:text-white/70">
                                <div 
                                   >{address.description}
                                </div>
                            </div>
                            <div className="mt-10 space-y-5">
                                <div className="flex items-center">
                                    <div className="text-sky-500 dark:text-white/70 text-base"
                                       >
                                        <FontAwesomeIcon icon={faLocationDot} />
                                    </div>
                                    <span
                                        className=" block ml-3 text-base font-medium text-slate-900 dark:text-white/90"><div
                                        
                                   >{address.location}</div></span>
                                </div>
                                <div className="flex items-center">
                                    <div className=" text-sky-500 dark:text-white/70 text-base"
                                    >
                                       <FontAwesomeIcon icon={faEnvelope}/>
                                    </div>
                                    <span
                                        className=" block ml-3 text-base font-medium text-slate-900 dark:text-white/90"><div
                                        
                                        >{address.email}</div></span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}