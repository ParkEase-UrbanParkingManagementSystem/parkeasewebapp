import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const CheckOutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        // Handle form submission and payment processing here
        console.log('Amount:', amount); // Use the amount prop as needed
    };

    return (
        <div className='flex flex-col justify-center items-center w-full mt-6'>
            <form onSubmit={handleSubmit} className='max-w-md'>
                <PaymentElement />
                <button className='w-full bg-black text-white p-2 rounded-lg mt-2'>
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckOutForm;
