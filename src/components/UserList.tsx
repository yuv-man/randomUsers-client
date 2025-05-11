import React, { useState, useEffect, useMemo } from 'react';
import UserCard from './UserCard';
import '../styles/UserList.scss';
import { userAPI, getRandomUsers } from '../utils/api';
import type { IUser } from '../types/types';

const UserList: React.FC<{ isRandom: boolean }> = ({ isRandom }: { isRandom?: boolean }) => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const fetchUsers = useMemo(
    () => isRandom ? getRandomUsers() : userAPI.getAllUsers(),
    [isRandom]
  );

  useEffect(() => {
    fetchUsers
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    if(users.length === 0) return [];
    return users.filter(user => 
      `${user.name.first} ${user.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [users, searchTerm]);

  if (isLoading) {
    return <div className="user-list">Loading...</div>;
  }

  if (error) {
    return <div className="user-list error">{error}</div>;
  }

  return (
    <div className="user-list-container">

        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="user-list">
        {filteredUsers.length === 0 ? (
            <p>No users found</p>
        ) : (
            filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
            ))
        )}
        </div>
    </div>
  );
};

export default UserList;
