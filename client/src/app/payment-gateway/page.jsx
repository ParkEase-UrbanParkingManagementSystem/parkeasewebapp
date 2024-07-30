import React from 'react';
import PaymentForm from '@/ui/paymentform/paymentform';
import styles from './paymentgateway.module.css';
import Navbar from "@/ui/homenavbar/homenavbar";

const PaymentGateway = () => {
    return (
        <div>
            <Navbar />

            <div className={styles.paymentgateway}>
                <PaymentForm />
            </div>
        </div>
    );
};

export default PaymentGateway;
