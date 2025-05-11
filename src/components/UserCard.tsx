import React, { useState, useEffect } from 'react';
import '../styles/UserCard.scss';
import { userAPI } from '../utils/api';
import { toast } from 'react-hot-toast';
import type { IUser } from '../types/types';

const UserCard: React.FC<{ user: IUser }> = ({ user }) => {
  
  const formattedName: string = `${user.name.title}. ${user.name.last} (${user.name.first})`;
  
  return (
    <div className="user-card">
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
