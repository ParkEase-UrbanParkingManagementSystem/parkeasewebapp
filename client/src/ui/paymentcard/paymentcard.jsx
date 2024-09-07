import React from 'react';

const PaymentCard = ({ image, title, description, link, count, currency }) => {
    return (
        <div className="relative">
            <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm">
                <img
                    alt={title}
                    src={image}
                    className=" h-56 w-full object-cover"
                />

                <div className="p-4 sm:p-6">
                    <a href={link}>
                        <h3 className="text-lg font-medium text-gray-900">
                            {title}
                        </h3>
                    </a>

                    <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500">
                        {description}
                    </p>

                    <a href={link} className="group mt-4 inline-flex items-center gap-1 font-bold text-sm text-blue-600">
                        See more
                        <span aria-hidden="true" className="block transition-all group-hover:ms-0.5 rtl:rotate-180">
                            &rarr;
                        </span>
                    </a>
                </div>
            </article>

            {/* Badge or count display */}
            <div className="absolute top-2 right-2 bg-yellow-500 text-white text-sm font-bold px-2 py-1 rounded-full">
                {count} {currency && currency}
            </div>
        </div>
    );
}

export default PaymentCard;
