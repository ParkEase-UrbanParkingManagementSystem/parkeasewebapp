'use client'
// import { useSearchParams } from 'next/navigation'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckOutForm from '@/ui/checkoutform/checkoutform'

const Payment = () => {
    // const searchParam=useSearchParams();
    // const amount=searchParam.get('amount'); //modify this

    const StripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

    const options={
        mode:'payment',
        amount:70,//change this
        currency:'lkr'
    }

    return(
        <Elements stripe={StripePromise} options={options}>
            <CheckOutForm amount={70} />
        </Elements>
        
    )
    
}

export default Payment