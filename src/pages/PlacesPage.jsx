import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import iconPlus from '../json/icons8-plus.json';
import axios from 'axios';
import AccountNav from '../components/User/AccountNav';
import PlaceImg from '../components/Place/PlaceImg';


function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
    if (!places.length) {

        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        });
    
    }
    }, []);
    let photos = [];
    if(places.length) {
        
        try {
            // Parse photos if it's a JSON string
            photos = typeof places[0].photos === 'string' ? JSON.parse(places[0].photos) : places[0].photos;
        } catch (err) {
            console.error('Error parsing photos:', err);
        }
    }
    if (!places.length) {
        return (
            <div className='text-center'>
            <AccountNav />

                You don't have any places yet.

                <div className='text-center'>
                <Link className='inline-flex mb-4 gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'} >
                    <Lottie className='w-5' animationData={iconPlus} />
                    Add new places
                </Link>
            </div>
            </div>
        );
    }
    return (
        <div>
            <AccountNav />
            <div className='text-center'>
                <Link className='inline-flex mb-4 gap-1 bg-primary text-white py-2 px-6 rounded-full' to={'/account/places/new'} >
                    <Lottie className='w-5' animationData={iconPlus} />
                    Add new places
                </Link>
            </div>
            <div>
                {places.length > 0 && places.map(place => (
                    <Link to={'/account/places/' + place.id} key={place.title} className='max-[500px]:flex-col flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl' >
                        <div>
                            {place.photos?.[0] && (
                                <div className='flex w-32 h-32 bg-gray-300 grow shrink-0 rounded-2xl'>
                                    <PlaceImg photos={photos[0]} />
                                </div>
                            )}
                        </div>
                        <div className='grow-0 shrink'>
                            <h2 className='text-xl'>{place.title}</h2>
                            <p className='text-sm mt-2'>{place.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default PlacesPage;