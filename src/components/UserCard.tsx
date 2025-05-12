import React from 'react';
import '../styles/UserCard.scss';
import { toast } from 'react-hot-toast';
import type { IUser } from '../types/types';
import { useNavigate } from 'react-router-dom';

const UserCard: React.FC<{ user: IUser; isRandom: boolean }> = ({ user, isRandom }) => {
  const navigate = useNavigate();

  const handleClick = () => { 
    navigate(`/user/${user.id}`, { state: { isRandom } });
  };
  
  const formattedName: string = `${user.name.title}. ${user.name.last} (${user.name.first})`;
  
  return (
    <div className="user-card" onClick={handleClick}>
      <div className="avatar">
        <img src={user.picture.thumbnail} alt={`${user.name.first}'s avatar`} />
      </div>
      <div className="info">
        <div className="name-container">
          <h2 className="name">{formattedName}</h2>
          <p className="gender">{user.gender}</p>
          <p className="address">{user.location.country}</p>
        </div>
        <div className="contact-container">
          <p className="email">
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </p>
          <p className="phone">{user.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
