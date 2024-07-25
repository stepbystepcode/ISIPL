import {Header} from "@/components/Header.tsx";
import {Banner} from "@/components/Banner.tsx";
import {Features} from "@/components/Features.tsx";
import {Evaluate} from "@/components/Evaluate.tsx";
import {QA} from "@/components/QA.tsx";
import {Address} from "@/components/Address.tsx";
import {Join} from "@/components/Join.tsx";
import {Footer} from "@/components/Footer.tsx";

export default function Home() {
    return (
        <>
            <Header />
            <Banner />
            <Features />
            <Evaluate />
            <QA />
            <Address />
            <Join />
            <Footer />
        </>
    )
}
