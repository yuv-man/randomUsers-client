import React, { useState, useEffect, useMemo, useRef } from 'react';
import UserCard from './UserCard';
import '../styles/UserList.scss';
import { userAPI } from '../utils/api';
import type { IUser } from '../types/types';
import { useUserStore } from '../stores/userStore';

const UserList: React.FC<{ isRandom: boolean }> = ({ isRandom }: { isRandom: boolean }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [countryFilter, setCountryFilter] = useState<string>('');
  const { users, setUsers, isRandomPage, setIsRandomPage } = useUserStore();

  const fetchUsers = useMemo(
    () => isRandom ? userAPI.getRandomUsers() : userAPI.getAllUsers(),
    [isRandom]
  );

  
  useEffect(() => {
    const shouldFetch = isRandom !== isRandomPage || users.length === 0;
      
    if (shouldFetch) {
      setUsers([]);
      fetchUsers
        .then((data: IUser[]) => {
          setError(null);
          setUsers(data);
          setIsLoading(false);
          setIsRandomPage(isRandom);
        })
        .catch((error: unknown) => {
          let errorMessage = 'An unexpected error occurred';
          if (error instanceof Error) {
            errorMessage = error.message;
          }
          setError(errorMessage);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [fetchUsers, isRandom, isRandomPage, users.length]);

  const filteredUsers = useMemo(() => {
    if(users.length === 0) return [];
    return users.filter(user => {
      const nameMatch = `${user.name.first} ${user.name.last}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const countryMatch = countryFilter === '' || 
        user.location.country.toLowerCase().includes(countryFilter.toLowerCase());
      return nameMatch && countryMatch;
    });
  }, [users, searchTerm, countryFilter]);

  if (isLoading) {
    return <div className="user-list">Loading...</div>;
  }

  if (error) {
    return <div className="user-list error">{error}</div>;
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        {isRandom ? (
          <h1>Random Users</h1>
        ) : (
          <h1>Saved Profiles</h1>
        )}
      </div>

      <div className="filters">
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <input
          type="text"
          placeholder="Filter by country..."
          value={countryFilter}
          onChange={(e) => setCountryFilter(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="user-list">
      {filteredUsers.length === 0 ? (
        <p>No users found</p>
      ) : (
        filteredUsers.map((user) => (
          <UserCard key={user.id} user={user} isRandom={isRandom} />
        ))
      )}
      </div>
    </div>
  );
};

export default UserList;
