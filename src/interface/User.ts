
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
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
    users: User[];
    deleteLoading: boolean;
    deleteSuccess: boolean;
    updateLoading: boolean,
    updateSuccess: boolean,
}

export interface UserProfile {
    _id: string;
    name: string;
    email: string;  
    avatar?: {
        public_id: string;
        url: string;
    };
    role:string
}

