import React, { useEffect, useState } from 'react';
import iconCard from '../json/credit card.json';
import Lottie from 'lottie-react';
import axios from 'axios';
import AccountNav from '../components/User/AccountNav';
import BookingDates from '../components/Place/BookingDates';

function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        if (!bookings.length){

            axios.get('/bookings').then(response => {
                setBookings(response.data);
            });
        }
    }, [bookings]);
    if (!bookings.length) {
        return (
            <div className='text-center mt-5'>
            <AccountNav />
                You don't have any places yet.
            </div>
        )
    }
    return (
        <div>
            <AccountNav />
            <div className='items-center'>
                {bookings?.length > 0 && bookings.map(booking => (
                    <div key={booking.user_id} className='flex gap-4 bg-gray-50 rounded-2xl overflow-hidden'>
                        <div className='w-48 max-[500px]:hidden'>
                            {/* <PlaceImg place={booking.place} className='rounded-2xl max-[500px]:hidden' /> */}
                        </div>
                        <div className='py-3 pr-3 grow'>
                            <h2 className='text-xl'>{booking.place}</h2>
                            <div className='text-xl'>
                                <BookingDates booking={booking} className='mb-2 mt-4 text-gray-500' />
                                <div className="gap-1 flex">
                                    <Lottie className='w-7 h-7' animationData={iconCard} />
                                    <span className='text-2xl'>
                                        Total price: ${booking.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BookingsPage;
