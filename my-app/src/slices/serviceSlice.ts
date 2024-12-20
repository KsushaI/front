import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import fetchVisas from './actions/fetchvisas'; 
import { api } from '../api'; 

export interface Visa {
    pk: number;
    type: string;
    price: number;
    url: string;
    status: string; 
    description: string | null; 
    creator: string | null; 
}

export interface VisasResult {
    user_draft_app_id: number | null;
    number_of_services: number;
    services: Visa[];
}

interface VisasState {
    services: Visa[];
    loading: boolean;
    error: string | null;
}


const initialState: VisasState = {
    services: [],
    loading: false,
    error: null,
};


interface Service {
    id: number;
    type: string;
    price: number;

}


interface EditServicePayload {
    id: string; 
    formData: {
        type: string;
        price: number;
        status: string;

    };
}

interface AddVisaPayload {
    type: string;
    price: number;
    status: string;
}


export const addVisa = createAsyncThunk(
    'services/add',
    async (visaData: AddVisaPayload) => {
        const response = await api.visasApi.visasApiCreate({ body: visaData });
        return response.data; // Assuming the response contains the created visa
    }
);


export const editService = createAsyncThunk(
    'services/edit',
    async ({ id, formData }: EditServicePayload) => {
        const response = await api.visasApi.visasApiUpdate(id, { body: formData });
        return response.data;
    }
);


export const deleteService = createAsyncThunk(
    'services/delete',

    async (id: string) => {
        await api.visasApi.visasApiDelete(id); 
        return Number(id);

    }
);

const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchVisas.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVisas.fulfilled, (state, action: PayloadAction<VisasResult>) => {
                state.loading = false;
                state.services = action.payload.services; 
            })
            .addCase(fetchVisas.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string; 
            })
            .addCase(editService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editService.fulfilled, (state, action: PayloadAction<Visa>) => {
                state.loading = false;
              
                const updatedService = action.payload;
                state.services = state.services.map(service =>
                    service.pk === updatedService.pk ? updatedService : service
                );
            })
            .addCase(editService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка при редактировании сервиса";
            })
            .addCase(addVisa.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addVisa.fulfilled, (state, action: PayloadAction<Visa>) => {
                state.loading = false;
            
                state.services.push(action.payload);
            })
            .addCase(addVisa.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка при добавлении визы";
            })
            .addCase(deleteService.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteService.fulfilled, (state, action: PayloadAction<number>) => {
                state.loading = false;
                
                state.services = state.services.filter(service => service.pk !== action.payload);
            })
            .addCase(deleteService.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка при удалении сервиса";
            });
    },
},
);


export default serviceSlice.reducer;