import { useEffect } from 'react';
// This is now confirmed to be an app mockup for the event management app
import heroAppMockup from '../../../public/assets/images/app-mockup2.jpg';
import applestore from '../../../public/assets/images/App_Store_(iOS)-Badge-Logo.wine.png'; // Assuming these are still relevant
import playstore from '../../../public/assets/images/Google_Play-Badge-Logo.wine.png'; // Assuming these are still relevant
import { useAppearance } from '@/hooks/use-appearance';
import { Link } from '@inertiajs/react';

export default function Welcome() {
    const { updateAppearance } = useAppearance();

    useEffect(() => {
        updateAppearance('light');
    }, []);

    return (
        <section className="relative lg:h-[100vh] lg:overflow-hidden bg-[#f6f6f6]">
            {/* Navbar */}
            <div className="flex items-center  justify-between py-3 lg:px-14 px-3 border-b border-gray-200">
                <div className="flex items-center gap-x-2">

                    <img className='w-12 h-12 object-contain' src="https://app.youthempowermentsummit.africa/storage/images/participants/avatar.png" alt="Y.E.S Africa App Logo" />

                </div>
                <div className="flex font-semibold text-gray-700 capitalize items-center gap-x-8 ">

                    <a href="https://youthempowermentsummit.africa/" target="_blank" rel="noopener noreferrer" className="hover:text-alpha transition-colors">
                        Y.E.S Africa
                    </a>
                    <a href="http://learning.youthempowermentsummit.africa/" target="_blank" rel="noopener noreferrer" className="hover:text-alpha transition-colors">
                        Learning Platform
                    </a>
                </div>
                <Link href="/login" className='bg-alpha text-white py-2 px-5 rounded-md text-sm font-medium hover:bg-[#3F39C7] transition-colors'>
                    Login
                </Link>
            </div>

            <div className="lg:h-[calc(100vh-80px)]  flex lg:flex-row flex-col-reverse lg:gap-0 gap-6 items-center lg:px-14">
                <div className="lg:w-1/2 w-full lg:h-full lg:p-0 p-12  flex flex-col justify-center space-y-6">
                    <p className="text-xl text-gray-700 font-medium text-center lg:text-start">— Your Ultimate Summit Companion</p>
                    <h1 className="lg:text-5xl text-xl text-center lg:text-start font-bold text-gray-900 leading-tight">
                        Experience the Y.E.S Africa <br /> Summit Like Never Before
                    </h1>
                    <p className="text-lg text-center lg:text-startr text-gray-600 lg:w-4/5">
                        The official Y.E.S Africa Summit app is your one-stop solution for navigating the event, accessing schedules, connecting with attendees, and staying updated on all summit activities.
                    </p>
                    <div className="flex gap-4 mt-6">
                        <a href="#" className="transform transition-transform duration-300 hover:scale-105">
                            <img src={playstore} alt="Download on Google Play" className="h-14 object-contain " /> 
                        </a>
                        <a href="#" className="transform transition-transform duration-300 hover:scale-105">
                            <img src={applestore} alt="Download on the App Store" className="h-14 object-contain " /> 
                        </a>
                    </div>
                    <div className="flex items-center lg:flex-row flex-col  gap-4 mt-8">
                        <div className="flex -space-x-2">
                            <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User 1" />
                            <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 2" />
                            <img className="inline-block h-12 w-12 rounded-full ring-2 ring-white" src="https://randomuser.me/api/portraits/men/68.jpg" alt="User 3" />
                            <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-300 ring-2 ring-white text-gray-700 text-base font-semibold">
                                10K+
                            </div>
                        </div>
                        <span className="text-gray-700 font-semibold text-lg">Summit Attendees <br /> Already Connected!</span>
                    </div>
                </div>

                {/* Right Section (App Mockup) */}
                <div className="w-1/2 h-full lg:p-0 py-20 flex items-center justify-center relative pr-10">
                    {/* Abstract background elements - keeping them for visual interest */}
                    <div className="absolute top-1/4 -right-10 w-64 h-64 border-l-8 border-t-8 border-alpha rounded-full transform rotate-45 opacity-50"></div>
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 border-r-8 border-b-8 border-beta rounded-full transform -rotate-30 opacity-50"></div>

                    <img
                        src={heroAppMockup}
                        alt="Y.E.S Africa Summit App Mockup"
                        className="lg:h-[85%] h-full object-contain rounded-3xl border-8 border-gray-800 shadow-2xl relative z-10"
                    />
                    <div className="absolute top-[20%] left-[70%] bg-white  px-3 py-2 rounded-lg shadow-md flex items-center text-sm font-medium text-gray-700 z-20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="lg:h-4 lg:w-4 w-8 h-8 mr-1 text-beta" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Live Session Updates
                    </div>
                    <div className="absolute top-[65%] left-[15%] bg-white px-3 py-2 rounded-lg shadow-md flex items-center text-sm font-medium text-gray-700 z-20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="lg:h-4 lg:w-4 w-8 h-8 mr-1 text-alpha" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Networking Made Easy
                    </div>
                </div>
            </div>



        </section>
    );
}