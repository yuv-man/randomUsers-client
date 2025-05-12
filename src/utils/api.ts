import axios, { AxiosResponse } from 'axios';
import { IUser } from '../types/types';

const RANDOM_USER_API_URL = 'https://randomuser.me/api/';
const API_URL = 'http://localhost:5000/api';
const NUMBER_OF_USERS = 10;

const userClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
  });

const randomUserClient = axios.create({
    baseURL: RANDOM_USER_API_URL,
    timeout: 10000,
});

const getRandomUsers = async (): Promise<IUser[]> => {
    try {
        const response: AxiosResponse<{results: IUser[]}> = await randomUserClient.get<{results: IUser[]}>(`/?results=${NUMBER_OF_USERS}`);
        const users = response.data.results.map(user => ({
            ...user,
            id: `${user.id.name}${user.id.value}` || user.email
        }));
        return users;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message || 'Failed to fetch random users. Please try again.');
        }
        throw new Error('An unexpected error occurred. Please try again.');
    }
};

const getAllUsers = async (): Promise<IUser[]> => {
    try {
        const response: AxiosResponse<IUser[]> = await userClient.get<IUser[]>('/users');
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message || 'Failed to fetch users. Please try again.');
        }
        throw new Error('An unexpected error occurred. Please try again.');
    }
}

const getUserById = async (id: string): Promise<IUser> => {
    try {
        const response: AxiosResponse<IUser> = await userClient.get<IUser>(`/users/${id}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message || 'Failed to fetch user. Please try again.');
        }
        throw new Error('An unexpected error occurred. Please try again.');
    }
}

const saveUser = async (user: IUser): Promise<IUser> => {
    try {
        const response: AxiosResponse<IUser> = await userClient.post<IUser>('/users', user);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message || 'Failed to save user. Please try again.');
        }
        throw new Error('An unexpected error occurred. Please try again.');
    }
}

const updateUser = async (id: string, user: IUser): Promise<IUser> => {
    try {
        const response: AxiosResponse<IUser> = await userClient.put<IUser>(`/users/${id}`, user);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message || 'Failed to update user. Please try again.');
        }
        throw new Error('An unexpected error occurred. Please try again.');
    }
};

const deleteUser = async (id: string): Promise<void> => {
    try {
        await userClient.delete(`/users/${id}`);
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.message || 'Failed to delete user. Please try again.');
        }
        throw new Error('An unexpected error occurred. Please try again.');
    }
};

export const userAPI = {
    getRandomUsers,
    getAllUsers,
    getUserById,
    saveUser,
    updateUser,
    deleteUser
};

