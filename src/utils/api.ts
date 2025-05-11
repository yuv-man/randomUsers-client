import axios, { AxiosResponse } from 'axios';
import { IUser } from '../types/types';

const RANDOM_USER_API_URL = 'https://randomuser.me/api/';
const API_URL = 'https://jsonplaceholder.typicode.com';
const NUMBER_OF_USERS = 10;

const userClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
  });

const randomUserClient = axios.create({
    baseURL: RANDOM_USER_API_URL,
    timeout: 10000,
});

export const getRandomUsers = async (): Promise<IUser[]> => {
    try {
        const response: AxiosResponse<{results: IUser[]}> = await randomUserClient.get<{results: IUser[]}>(`/?results=${NUMBER_OF_USERS}`);
        return response.data.results;
    } catch (error) {
        console.error('Failed to fetch random users:', error);
        throw error;
    }
};


export const userAPI = {
    getAllUsers: async (): Promise<IUser[]> => {
        try {
            const response: AxiosResponse<IUser[]> = await userClient.get<IUser[]>('/users');
            return response.data;
        } catch (error) {
            console.error('Failed to fetch all users:', error);
            throw error;
        }
    },

    getUserById: async (id: number): Promise<IUser> => {
        try {
            const response: AxiosResponse<IUser> = await userClient.get<IUser>(`/users/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Failed to fetch user with id ${id}:`, error);
            throw error;
        }
    },
}

