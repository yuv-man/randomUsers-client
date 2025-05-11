export interface IUser {
    id: number;
    name: {
        title: string;
        first: string;
        last: string;
    };
    email: string;
    phone: string;
    cell: string;
    dob: {
        date: string;
        age: number;
    };
    location: {
        street: {
            number: number;
            name: string;
        };
        city: string;
        state: string;
        postcode: number;
        country: string;
    };
    picture: {
        large: string;
        medium: string;
        thumbnail: string;
    };
    gender: string;
    nat: string;
    [key: string]: any; // For other potential user properties
}

export interface FavoriteUsers {
    [key: string]: IUser;
}

export interface FailedUser {
    id: string;
    name: string;
    error: string;
}

export interface Summary {
    totalFavorites: number;
    successCount: number;
    failedCount: number;
    failedUsers: FailedUser[];
}

export interface FavoriteUsersResponse {
    summary: Summary;
    users: FavoriteUsers;
}

export interface fetchRequest {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    data?: any;
    headers?: any;
    params?: any;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
  }
  
  export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }