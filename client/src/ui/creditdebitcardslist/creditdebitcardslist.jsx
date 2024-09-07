import React from 'react';
import Image from 'next/image';

const CreditDebitCardsList = ({ card }) => {
    if (!card || !card.type_id) {
        return <p>Card information is not available.</p>;
    }

    let imageSrc = '';

    switch (card.type_id) {
        case 1:
            imageSrc = '/images/visa.png';
            break;
        case 2:
            imageSrc = '/images/mastercard.png';
            break;
        default:
            imageSrc = '/images/default.jpg';
            break;
    }

    return (
        <div>
            <div className='flex items-center justify-between mt-2 border-t border-b'>
                <div className='flex items-center gap-5'>
                    <Image
                        src={imageSrc}
                        width={100}
                        height={100}
                        alt={`${card.card_name} image`}
                    />
                    <div>
                        <h2 className='font-semibold text-[18px]'>{card.card_number}</h2>
                        <p>{card.card_name}</p>
                        <p>{card.expiration_date}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreditDebitCardsList;
