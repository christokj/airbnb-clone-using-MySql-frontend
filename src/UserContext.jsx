import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [ready, setReady] = useState(false);
    const [user, setUser] = useState([]);
    useEffect(() => {
        if (user.length === 0 ) {
            axios.get('/profile')
            .then(({ data }) => {
                    console.log("first ")
                    console.log('Fetched data:', data); 
                    setUser(data);
                    setReady(true);  // Move this here to ensure it's only called after data is set
                })
                .catch((error) => {
                    console.error("Error fetching profile:", error); // Log error
                });
                console.log(user.length, ready, user)
            }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    );
}

// export default UserContext
