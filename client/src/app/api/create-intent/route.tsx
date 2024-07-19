import { NextResponse } from "next/server";
import { Stripe } from "stripe"

const stripe = new Stripe('sk_test_51PdnBHAWjaYRrVu24a2zLPLgWrvMhsFLq8YQb5XBc6KQrp6lomQf5DvMwT5mTi4kp0qbMbrL122t9kBuNVx85Z6C00oS0DVeQb'!,{
    typescript:true,
    apiVersion:"2023-10-16"
})

export async function POST(request:any) {
    const data:any=await request.json();
    const amount=data.amount;

    try{
        const paymentIntent=await stripe.paymentIntents.create({
            amount:Number(amount)*100,
            currency:'LKR'
        })

        return NextResponse.json(paymentIntent.client_secret,{status:200})
    }
    catch(error:any)
    {
        return new NextResponse(error,{
            status:400
        })
    }
}