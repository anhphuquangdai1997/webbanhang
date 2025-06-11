
export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    avatar?: {
        public_id: string;
        url: string;
    };
    createdAt: string;

} 
export interface UserState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    // users: User[]; // For admin to manage users
}

