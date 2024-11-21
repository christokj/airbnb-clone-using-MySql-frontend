import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BookingWidget from '../BookingWidget';
import PlaceGallery from '../PlaceGallery';
import AddressLink from '../AddressLink';

function PlacePage() {
    const { title } = useParams();
    const [place, setPlace] = useState(null);
    useEffect(() => {
        if (!title) {
            return;
        }
        axios.get(`/places/${title}`).then(response => {
            setPlace(response.data);
        });
    }, [title]);
    if (!place) return '';

    let perks = [];
    if (place.perks) {
        try {
            // Parse photos if it's a JSON string
            perks = typeof place.perks === 'string' ? JSON.parse(place.perks) : place.perk;
        } catch (err) {
            console.error('Error parsing photos:', err);
        }
    }

console.log(place )
console.log(perks)

    return (
        <div className='max-sm:px-2 bg-gray-50 -mx-8 px-32 pt-8 -mt-4'>
            <h1 className='text-3xl'>{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place} />
            <div className="gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className='my-4'>
                        <h2 className='font-semibold text-2xl'>Description</h2>
                        {place.description}
                    </div>
                    Check in: {place.check_in} <br />
                    Check out: {place.check_out} <br />
                    Max number of guests: {place.max_guests}
                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className='bg-white -mx-32 px-32 py-8 mt-4 border-t'>
                <div className='font-semibold text-2xl'>
                    <h2>Extra info</h2>
                </div>
                <div className='mb-4 mt-2 text-sm text-gray-700 leading-5 '>
                    {place.extra_info}
                    
                     <div className='font-semibold text-black text-2xl'>
                    <h2 >Perks</h2>
                </div>
                    {
                    perks.length && perks.map(perk => (
                        <div key={perk}> - {perk}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlacePage;