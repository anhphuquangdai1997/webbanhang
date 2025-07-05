import React from 'react';
import Profile from '../../components/User/Profile';
import { useAppSelector } from '../../redux/hooks';

const ProfilePage: React.FC = () => {
    const {user} =useAppSelector((state) => state.user);

    return (
        <Profile user={user}  />
    )
}
export default ProfilePage;