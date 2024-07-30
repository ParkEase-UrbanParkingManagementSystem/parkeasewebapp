'use client'
import React, { useState } from 'react';
import styles from './paymentform.module.css';

const PaymentForm = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardHolder, setCardHolder] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Payment details submitted:', { cardNumber, expiryDate, cvv, cardHolder });
    };

    return (
        <form className={styles.paymentform} onSubmit={handleSubmit}>
            <h2>Pay Now</h2>
            <div className={styles.formgroup}>
                <label htmlFor="cardNumber">Card Number</label>
                <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formgroup}>
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    placeholder="MM/YY"
                    required
                />
            </div>
            <div className={styles.formgroup}>
                <label htmlFor="cvv">CVV</label>
                <input
                    type="text"
                    id="cvv"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                />
            </div>
            <div className={styles.formgroup}>
                <label htmlFor="cardHolder">Card Holder Name</label>
                <input
                    type="text"
                    id="cardHolder"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    required
                />
            </div>
            <div className={styles.button}>
                <button type="submit">Pay Now</button>
            </div>
            
        </form>
    );
};

export default PaymentForm;
