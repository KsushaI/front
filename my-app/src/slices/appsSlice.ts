import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

// Define the App interface
export interface App {
    id?: number;
    status: string;
    creation_date?: string;
    formation_date?: string | null;
    completion_date?: string | null;
    creator?: string;
    moderator?: string;
    start_date?: string;
    duration?: number;
    total?: number | null;
}

// Define the User interface
export interface User {
    id: string;
    username: string;
}

// Define the AppsState interface
interface AppsState {
    apps: App[]; // Array of App objects
    users: User[]; // Array of User objects
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: AppsState = {
    apps: [],
    users: [],
    loading: false,
    error: null,
};

// Define the type for the parameters
interface FetchAppsParams {
    start_date?: string;
    end_date?: string;
    status?: string;
}

// Define the thunk for fetching apps
export const fetchApps = createAsyncThunk(
    'apps/fetchApps',
    async (params: FetchAppsParams, { rejectWithValue }) => {
        try {
            const response = await api.appsApi.appsApiList({
                query: params, // Pass the parameters to the API method
            });
            return response.data; // Return the data from the response
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Thunk for fetching users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await api.users.usersList();
    console.log(response.data)
    return response.data; // Assuming this returns an array of User objects
});

const appsSlice = createSlice({
    name: 'apps',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchUsers.fulfilled, (state, action) => {
            // Ensure that action.payload is an array
            if (Array.isArray(action.payload)) {
                state.users = action.payload; // Store users in state
            } else {
                console.error("Expected an array of users, but received:", action.payload);
            }
        })
        .addCase(fetchApps.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchApps.fulfilled, (state, action) => {
            // Ensure that action.payload is an array
            if (Array.isArray(action.payload)) {
                state.loading = false;
                state.apps = action.payload; // Update apps with fetched data
            } else {
                console.error("Expected an array of apps, but received:", action.payload);
            }
        })
        .addCase(fetchApps.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || "Error fetching apps";
        });
    },
});

export default appsSlice.reducer;