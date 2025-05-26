import { useEffect } from 'react';
import mockup from '../../../public/assets/images/app-mockup2.jpg';
import applestore from '../../../public/assets/images/App_Store_(iOS)-Badge-Logo.wine.png';
import playstore from '../../../public/assets/images/Google_Play-Badge-Logo.wine.png';
import { useAppearance } from '@/hooks/use-appearance';
// import AppMockup from "@/components/app-mockup"
export default function Welcome() {


    const { appearance, updateAppearance } = useAppearance();
    useEffect(() => {

        updateAppearance('light')
    }, [])
    return (
        <section className="relative h-[100vh] overflow-hidden bg-gradient-to-br from-[#2e539d] to-[#1a3366] text-white">
            {/* <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-10"></div> */}

            <div className="bg--500 container mx-auto px-8 pt-16">
                <div className="bg--500 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
                    <div className="bg--500 z-10 space-y-8">
                        <div className="space-y-4">
                            <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">Experience Yes Africa Like Never Before</h1>
                            <p className="text-xl text-gray-200 md:text-2xl">Your all-in-one event companion – from schedules to networking.</p>
                        </div>

                        <div className="flex flex-col gap-4 sm:flex-row">
                            <a href="" className="w-[70%] lg:w-[20%]">
                                <img src={applestore} alt="apple store" className="h-full w-full object-contain" />
                            </a>
                            <a href="" className="w-[72%] lg:w-[23%]">
                                <img src={playstore} alt="play store" className="h-full w-full object-contain" />
                            </a>
                        </div>
                    </div>

                    <div className="z-10 flex justify-center md:justify-end">
                        <div className="relative">
                            <div className="absolute -inset-4 animate-pulse rounded-full bg-[#b09417] opacity-20 blur-3xl"></div>
                            <div className="relative transform transition-transform duration-500 hover:scale-105">
                                <img
                                    src={mockup}
                                    alt="Yes Africa Mobile App"
                                    width={300}
                                    height={600}
                                    className="rounded-3xl border-8 border-gray-800 shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
