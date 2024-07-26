import {Header} from "@/components/Header.tsx";
import {Footer} from "@/components/Footer.tsx";
import {AboutBanner} from "@/components/AboutBanner.tsx";
import {Team} from "@/components/Team.tsx";
import {Skill} from "@/components/Skill.tsx";
import {AboutEvaluate} from "@/components/AboutEvaluate.tsx";
import {Style} from "@/components/Style.tsx";

export const About = () => {
    return (<div className="mt-safe overflow-hidden">
        <Header/>
        <AboutBanner />
        <Team />
        <Skill />
        <AboutEvaluate />
        <Style />
        <Footer/>
    </div>)
}