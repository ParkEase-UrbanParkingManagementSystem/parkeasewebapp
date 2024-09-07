import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./statcards.module.css";

const StatCards = ({ imgSrc, title, number, registeredInDb, pendingInDb, flaggedInDb }) => {
    return (
        // <div className={styles.container}>
        //     <Icon size={24} />
        //     <div className={styles.texts}>
        //         <span className={styles.title}>{title}</span>
        //         <span className={styles.number}>{number}</span>
        //     </div>
        // </div>

        <a href="#" className="block rounded-lg p-4 shadow-sm shadow-indigo-100">
            <img
                alt=""
                src={imgSrc}
                className="h-56 w-full rounded-md object-cover"
            />

            <div className="mt-2">
                <dl>
                    <div>
                        <dt className="sr-only">Title</dt>

                        <dd className="text-sm text-gray-500">{title}</dd>
                    </div>

                    <div>
                        <dt className="sr-only">Count</dt>

                        <dd className="font-medium">{number}</dd>
                    </div>
                </dl>

                <div className="mt-6 flex items-center gap-8 text-xs">
                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <svg
                            className="size-4 text-indigo-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                
                            />
                        </svg>

                        <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Registered</p>

                            <p className="font-medium">{registeredInDb}</p>
                        </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <svg
                            className="size-4 text-indigo-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                            />
                        </svg>

                        <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Pending</p>

                            <p className="font-medium">{pendingInDb}</p>
                        </div>
                    </div>

                    <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
                        <svg
                            className="size-4 text-indigo-700"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 3v18h16V9H8L6 6z"
                            />
                        </svg>

                        <div className="mt-1.5 sm:mt-0">
                            <p className="text-gray-500">Flagged</p>

                            <p className="font-medium">{flaggedInDb}</p>
                        </div>
                    </div>
                </div>
            </div>
        </a>


    );
};


export default StatCards;

