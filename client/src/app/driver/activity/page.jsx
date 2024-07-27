import React from 'react';
import Navbar from '@/ui/homenavbar/homenavbar';

const Activity = () => {
    return (
        <div>
            <Navbar />
        <div className='p-6 grid grid-cols-1 md:grid-cols-2 gap-3 '>
        <div className='col-span-1 relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[576px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none'>
        <div className="bg-white p-3 rounded-xl">
        <div className="text-[20px] font-bold text-navy-700 dark:text-white mb-2">Most Recent Activity</div>
                                <div className="image overflow-hidden">
                                    <img className="h-auto w-full mx-auto rounded-full"
                                        src="/images/activity.png" 
                                        alt="Last Parked" />
                                </div>
                                <h1 className="text-gray-900 font-bold text-lg leading-8 my-1 mt-4">Nugegoda Market Car Park</h1>
                                <p className="text-sm text-gray-500 hover:text-yellow-600 leading-6">27 July | 5.19 P.M to 7.12 P.M | 131.83 LKR</p>
                                <ul
                                    className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li className="flex items-center py-3">
                                        <span>Payment Status</span>
                                        <span className="ml-auto"><span
                                            className="bg-green-600 py-1 px-2 rounded text-white text-sm">Completed</span></span>
                                    </li>
                                </ul>
                            </div>
        </div>

            <div className=" col-span-1 relative flex flex-col items-center rounded-[10px] border-[1px] border-gray-200 w-[576px] mx-auto p-4 bg-white bg-clip-border shadow-md shadow-[#F3F3F3] dark:border-[#ffffff33] dark:!bg-navy-800 dark:text-white dark:shadow-none">
                <div className="flex items-center justify-between rounded-t-3xl p-3 w-full">
                    <div className="text-[20px] font-bold text-navy-700 dark:text-white">
                        History
                    </div>
                    <button className="linear rounded-[20px] bg-lightPrimary px-4 py-2 text-base font-medium text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 dark:active:bg-white/20">
                        See all
                    </button>
                </div>

                {/* First Item */}
                <div className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
                    <div className="flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center">
                            <img
                                className="h-full w-full rounded-xl"
                                src="/images/car.png"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                Track 1 Walkway Parking
                            </h5>
                            <p className="mt-1 text-sm font-normal text-gray-600">
                                Toyota Corolla | CAS 9349 | 17.13-17.50
                            </p>
                        </div>
                    </div>
                    <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                        <div>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                        </div>
                        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                            <p>   </p>
                            70.00<p className="ml-1">LKR</p>
                        </div>
                        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                            <p>1d</p>
                            <p className="ml-1">ago</p>
                        </div>
                    </div>
                </div>

                {/* Second Item */}
                <div className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
                    <div className="flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center">
                            <img
                                className="h-full w-full rounded-xl"
                                src="/images/car.png"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                Madiwela Ground Vehicle Park
                            </h5>
                            <p className="mt-1 text-sm font-normal text-gray-600">
                                Toyota Corolla | CAS 9349 | 13.00-13.45
                            </p>
                        </div>
                    </div>
                    <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                        <div>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                        </div>
                        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                            <p>   </p>
                            70.00<p className="ml-1">LKR</p>
                        </div>
                        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                            <p>20</p>
                            <p className="ml-1">July</p>
                        </div>
                    </div>
                </div>

                {/* Third Item */}
                <div className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
                    <div className="flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center">
                            <img
                                className="h-full w-full rounded-xl"
                                src="/images/van.png"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                Nugegoda Vehicle Park
                            </h5>
                            <p className="mt-1 text-sm font-normal text-gray-600">
                                Minivan | GH 1328 | 16.00-16.58
                            </p>
                        </div>
                    </div>
                    <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                        <div>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                        </div>
                        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                            <p>   </p>
                            70.00<p className="ml-1">LKR</p>
                        </div>
                        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                            <p>02</p>
                            <p className="ml-1">July</p>
                        </div>
                    </div>
                </div>

                {/* Fourth Item */}
                <div className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
                    <div className="flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center">
                            <img
                                className="h-full w-full rounded-xl"
                                src="/images/car.png"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                Narahenpita Vehicle Park
                            </h5>
                            <p className="mt-1 text-sm font-normal text-gray-600">
                                Toyota Corolla | CAS 9349 | 12.30-14.00
                            </p>
                        </div>
                    </div>
                    <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                        <div>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                        </div>
                        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                            <p>   </p>
                            105.00<p className="ml-1">LKR</p>
                        </div>
                        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                            <p>23</p>
                            <p className="ml-1">June</p>
                        </div>
                    </div>
                </div>

                {/* Fifth Item */}
                <div className="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-white px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700">
                    <div className="flex items-center gap-3">
                        <div className="flex h-16 w-16 items-center justify-center">
                            <img
                                className="h-full w-full rounded-xl"
                                src="/images/car.png"
                                alt=""
                            />
                        </div>
                        <div className="flex flex-col">
                            <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                Narahenpita Vehicle Park
                            </h5>
                            <p className="mt-1 text-sm font-normal text-gray-600">
                                Toyota Corolla | CAS 9349 | 13.00-13.45
                            </p>
                        </div>
                    </div>
                    <div className="mt-1 flex items-center justify-center text-navy-700 dark:text-white">
                        <div>
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                        </div>
                        <div className="ml-1 flex items-center text-sm font-bold text-navy-700 dark:text-white">
                            <p>   </p>
                            70.00<p className="ml-1">LKR</p>
                        </div>
                        <div className="ml-2 flex items-center text-sm font-normal text-gray-600 dark:text-white">
                            <p>2mo</p>
                            <p className="ml-1">ago</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Activity;
