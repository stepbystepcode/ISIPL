import {Header} from "@/components/Header.tsx";
import {Banner} from "@/components/Banner.tsx";
import {Features} from "@/components/Features.tsx";
import {Evaluate} from "@/components/Evaluate.tsx";
import {QA} from "@/components/QA.tsx";
import {Address} from "@/components/Address.tsx";
import {Join} from "@/components/Join.tsx";
import {Footer} from "@/components/Footer.tsx";
import { SafeArea } from 'capacitor-plugin-safe-area';
import { StatusBar, Style } from '@capacitor/status-bar';
import {useEffect} from "react";
export default function Home() {
    useEffect(() => {
        (async function(){
            const safeAreaData = await SafeArea.getSafeAreaInsets();
            const {insets} = safeAreaData;
            for (const [key, value] of Object.entries(insets)) {
                document.documentElement.style.setProperty(
                    `--safe-area-inset-${key}`,
                    `${value}px`,
                );
            }
        })()
        const setStatusBarStyleLight = async () => {
            await StatusBar.setStyle({ style: Style.Light });
        };
        setStatusBarStyleLight();
    }, []);
    return (
        <div className="mt-safe overflow-hidden">
            <Header />
            <Banner />
            <Features />
            <Evaluate />
            <QA />
            <Address />
            <Join />
            <Footer />
        </div>
    )
}
