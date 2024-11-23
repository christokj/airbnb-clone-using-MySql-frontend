import React, { useContext, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../components/Context/UserContext';
import AccountNav from '../components/User/AccountNav';
import PlacesPage from './PlacesPage';


function ProfilePage() {
  const [redirect, setRedirect] = useState(null);
  const { user, ready, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }
  async function logout() {
    await axios.post('/logout');
    setRedirect('/');
    setUser(null);
  }
 
  if (!ready && !user.length && !redirect) {
    return <Navigate to={'/login'} />
  }
 
  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className='text-center max-w-lg mx-auto my-5'>
          Logged in as {user.data.email } <br />
          <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
        </div>
      )}
      {subpage === 'places' && (
        <PlacesPage />
      )}
    </div>
  );
}

export default ProfilePage;
