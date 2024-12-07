import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
 // Adjust this import according to your types definition
import {api} from '../api'; // Adjust this import according to your API structure


export interface AppData {
    /** ID */
    id?: number;
    /**
     * Status
     * @minLength 1
     * @maxLength 26
     */
    status: string;
    /**
     * Creation date
     * @format date-time
     */
    creation_date?: string;
    /**
     * Formation date
     * @format date-time
     */
    formation_date?: string | null;
    /**
     * Completion date
     * @format date-time
     */
    completion_date?: string | null;
    /** Creator */
    creator?: string;
    /** Moderator */
    moderator?: string;
    /**
     * Start date
     * @format date
     */
    start_date?: string;
    /**
     * Duration
     * @min -2147483648
     * @max 2147483647
     */
    duration?: number;
    /**
     * Total
     * @min -2147483648
     * @max 2147483647
     */
    total?: number | null;
  }
  
// Async thunk for fetching application data
export const fetchAppData = createAsyncThunk<AppData, string>(
    'apps/fetchAppData',
    async (id: string) => {
        const response = await api.appsApi.appsApiRead(id);
        return response.data; // Return the data from the response
    }
);

// Define initial state
interface AppState {
    appData: AppData | null;
    loading: boolean;
    error: string | null;
}

const initialState: AppState = {
    appData: null,
    loading: false,
    error: null,
};

// Create the slice
const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},  // No additional reducers are required
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppData.pending, (state) => {
                state.loading = true;      // Set loading state
                state.error = null;        // Clear any previous errors
            })
            .addCase(fetchAppData.fulfilled, (state, action) => {
                state.loading = false;     // Clear loading state
                state.appData = action.payload; // Set fetched app data
            })
            .addCase(fetchAppData.rejected, (state, action) => {
                state.loading = false;     // Clear loading state
                state.error = action.error.message || 'Failed to fetch app data'; // Set error state
            });
    },
});

// Export the reducer
export default appSlice.reducer;