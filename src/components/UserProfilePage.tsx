import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import type { IUser } from '../types/types';
import '../styles/UserProfilePage.scss';
import editIcon from '../assets/icons/edit.svg';
import { useUserStore } from '../stores/userStore';
import { userAPI } from '../utils/api';
import { toast, Toaster } from 'react-hot-toast';

const UserProfilePage: React.FC = () => {
  const { id } = useParams();
  const { isRandom } = useLocation().state || false;
  const { getUser, removeUser, setUsers, users } = useUserStore();
  const user = getUser(id!);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name.first + ' ' + user?.name.last || '');
  const navigate = useNavigate();

  const editUser = (user: IUser) => {
    const updatedUser: IUser = {
      ...user,
      name: {
        title: user.name.title,
        first: name.split(' ')[0],
        last: name.split(' ')[1]
      }
    }
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    setUsers(updatedUsers);
    setIsEditing(false);
    userAPI.updateUser(user._id, updatedUser);
    toast.success('User updated successfully');
  }

  const saveUser = (user: IUser) => {
    userAPI.saveUser(user);
    setIsEditing(false);
    toast.success('User saved successfully');
  }

  const deleteUser = (user: IUser) => {
    if(!isRandom) {
      userAPI.deleteUser(user._id);
    } 
    removeUser(user.id);
    toast.success('User deleted successfully');
    setTimeout(() => {
      navigate(-1);
    }, 1000);
  }

  const cancelEdit = (user: IUser) => {
    setName(user.name.first + ' ' + user.name.last);
    setIsEditing(false);
  }

  if (!user) {
    return <div className="user-page">User not found</div>;
  }

  const formattedDate = new Date(user.dob.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const userName = () => {
    return (
      isEditing ? (
        <div className="save-user-input">
          <input className="user-name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <div className="save-user-buttons">
            <button onClick={() => {setIsEditing(false)}}>Save</button>
            <button onClick={() => cancelEdit(user)}>Cancel</button>
          </div>
        </div>
      ) : (
        <div className="user-name">
          <p style={{marginRight: '10px'}}>{name}</p>
          <img src={editIcon} alt="edit" onClick={() => setIsEditing(true)}/>
        </div>
      )
    );
  }

  return (
    <div className="user-page">
      <Toaster position="top-right" />
      <h1>User Profile</h1>
      <div className="user-content">
        <img src={user.picture.large} alt={`${user.name.first}`} />
        <div className="user-info">
          <div className="user-name-container">
            {userName()}
            <p>{user.dob.age} years old | {formattedDate} | {user.gender}</p>
          </div>
          <div className="user-details">
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.location.city}, {user.location.state}, {user.location.country}</p> 
          </div>
          <div className='buttons'>
            {isRandom && <button onClick={() => {saveUser(user)}}>Save</button>}
            {!isRandom && <button onClick={() => editUser(user)}>Edit</button>}
            <button onClick={() => {deleteUser(user)}}>Delete</button>
            <button onClick={() => navigate(-1)}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
