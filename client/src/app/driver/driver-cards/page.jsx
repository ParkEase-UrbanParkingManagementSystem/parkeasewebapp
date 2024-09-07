'use client'
import React, { useState, useEffect } from 'react';
import CreditDebitCardsList from '@/ui/creditdebitcardslist/creditdebitcardslist';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Navbar from '@/ui/homenavbar/homenavbar';
import AddCardIcon from '@mui/icons-material/AddCard';
import Image from 'next/image';
// import { useRouter } from 'next/navigation';


const DriverCards = () => {
    // const router = useRouter();
    const [driverId, setDriverId] = useState(null);
    const [cards, setCards] = useState([]);  // Initialize as an empty array
    const [activeIndex, setActiveIndex] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [showAddCardForm, setShowAddCardForm] = useState(false);
    const [newCard, setNewCard] = useState({
        type: '',
        number: '',
        name: '',
        expdate: '',
        cvv: '',

    });

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/card`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        token: token // Use 'Authorization' instead of 'token'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch vehicles');
                }

                const data = await response.json();
                setDriverId(data.driver_id);
                setCards(data.data || []);  // Ensure the correct data path and default to an empty array
            } catch (error) {
                console.error(error);
            }
        };

        fetchCards();
    }, []);

    const handleSelectedCard = (card, index) => {
        setSelectedCard(card);
        setActiveIndex(index);
    };

    const handleOpenAddCardForm = () => {
        setShowAddCardForm(true);
    };

    const handleCloseAddCardForm = () => {
        setShowAddCardForm(false);
        setNewCard({ type: '', number: '', name: '', epxdate: '', cvv: '' });
    };

    const formatExpirationDate = (expdate) => {
        const [month, year] = expdate.split('/');
        // Assuming the last day of the month
        return `${20 + year}-${month}-01`;
    };

    const handleAddCard = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_KEY}/card`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token: token  // Use 'Authorization' instead of 'token'
                },
                body: JSON.stringify({
                    type_id: newCard.type,
                    card_number: newCard.number,
                    card_name: newCard.name,
                    expiration_date: formatExpirationDate(newCard.expdate),
                    CVV: newCard.cvv
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Failed to add card:', errorData);
                throw new Error('Failed to add card');
            }

            const addedCard = await response.json();

            // Update the local cards list
            setCards((prevCards) => [...prevCards, addedCard.data]);
            handleCloseAddCardForm();
        } catch (error) {
            console.error('Error during card addition:', error);
        }
    };


    return (
        <div>
            <Navbar />
            <div className="flex items-start justify-center min-h-screen mt-8">

                <div className="bg-white p-3 w-50 shadow-lg rounded-xl ">

                    {!showAddCardForm && (
                        <>
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span className="tracking-wide"><CreditCardIcon /> Credit/Debit Payment Options</span>
                            </div>

                            {cards.length === 0 &&

                                <div className='flex flex-col items-center justify-center mt-4'>
                                    <Image
                                        src={"/images/question-mark.png"}
                                        width={80}
                                        height={100}
                                        alt={`image`}
                                    />
                                    <p className='text-[15px]  mb-1 mt-3 text-center'>You have no Credit/Debit Cards added</p>
                                </div>
                            }

                            {cards.map((item, index) => (
                                <div
                                    key={index}
                                    className={`cursor-pointer p-2 rounded-md border-black ${activeIndex === index ? 'border-[2px]' : ''}`}
                                    onClick={() => handleSelectedCard(item, index)}
                                >
                                    <CreditDebitCardsList card={item} />
                                </div>
                            ))}

                            <div className="flex items-center justify-center mt-4 mb-4">
                                <button className="flex items-center text-white font-bold py-2 px-4 rounded"
                                    style={{ backgroundColor: '#ffb403' }}
                                    onClick={handleOpenAddCardForm}
                                >
                                    <AddCardIcon />
                                    <span>Add Card</span>
                                </button>
                            </div>
                        </>
                    )}

                    <CreditDebitCardsList />

                    {showAddCardForm && (

                        <div className='bg-white p-5 pt-2 pb-2 rounded-lg'>

                            <div className='mb-1'>
                                <label className='block mb-1'>Card Type</label>
                                <select
                                    className='border p-2 w-full rounded-xl'
                                    value={newCard.type}
                                    onChange={(e) => setNewCard({ ...newCard, type: e.target.value })}
                                >
                                    <option value=''>Select Card Type</option>
                                    <option value='1'>Visa</option>
                                    <option value='2'>Master Card</option>
                                </select>
                            </div>

                            <div className='mb-1'>
                                <label className='block mb-1'>Card Number</label>
                                <input
                                    type='text'
                                    className='border p-2 w-full rounded-xl'
                                    value={newCard.number}
                                    onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                                />
                            </div>

                            <div className='mb-1'>
                                <label className='block mb-1'>Name on Card</label>
                                <input
                                    type='text'
                                    className='border p-2 w-full rounded-xl'
                                    value={newCard.name}
                                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                                />
                            </div>

                            <div className='mb-1'>
                                <label className='block mb-1'>Expiration Date</label>
                                <input
                                    type='text'
                                    className='border p-2 w-full rounded-xl'
                                    value={newCard.expdate}
                                    onChange={(e) => setNewCard({ ...newCard, expdate: e.target.value })}
                                />
                            </div>

                            <div className='mb-1'>
                                <label className='block mb-1'>CVV</label>
                                <input
                                    type='text'
                                    className='border p-2 w-full rounded-xl'
                                    value={newCard.cvv}
                                    onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                                />
                            </div>

                            <div className='flex justify-end'>
                                <button
                                    className='p-2 bg-black text-white rounded-lg mr-2 mt-1'
                                    onClick={handleCloseAddCardForm}
                                >
                                    Cancel
                                </button>
                                <button
                                    className='p-2 text-white rounded-lg mt-1'
                                    style={{ backgroundColor: '#ffb403' }}
                                    onClick={handleAddCard}
                                >
                                    Add Card
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default DriverCards