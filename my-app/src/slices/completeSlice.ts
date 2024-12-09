import { createAsyncThunk, createSlice, PayloadAction  } from '@reduxjs/toolkit';
import { api } from '../api'; // Импортируйте ваш API


// Интерфейс для заявки
export interface IRequest {
    id: number; // Unique identifier
    status: string; // Status of the application (e.g., "Черновик")
    creation_date: string; // Creation date in ISO format
    formation_date: string | null; // Formation date or null
    completion_date: string | null; // Completion date or null
    creator: string; // Creator's identifier (e.g., username)
    moderator: string | null; // Moderator's identifier or null
    start_date: string; // Start date in YYYY-MM-DD format
    duration: number; // Duration in days
    total: number | null; // Total amount or null
  }
  


// Тип для состояния заявок
interface IRequestState {
    requests: IRequest[];
    loading: boolean;
    error: string | null;
}
 
const initialState: IRequestState = {
    requests: [],
    loading: false,
    error: null,
  };

// Создаем thunk для завершения заявки
const completeRequest = createAsyncThunk<void, { id: string; action: string }>(
    'requests/completeRequest',
    async ({ id, action }) => {
        const response = await api.appsApi.appsApiUpdate2(id, action);
        return response.data // Call your API to complete the request
    }
);


// Создаем срез для управления состоянием заявок
const completeSlice = createSlice({
    name: 'requests',
    initialState,
    reducers: {
        // Ваши редюсеры (если есть)
    },
    extraReducers: (builder) => {
        builder
            .addCase(completeRequest.pending, (state) => {
                state.loading = true; // Устанавливаем состояние загрузки
            })
            .addCase(completeRequest.fulfilled, (state) => {
                state.loading = false; // Сбрасываем состояние загрузки
                state.error = null; // Сбрасываем ошибку, если она была
                // Здесь можно обновить состояние requests, если необходимо
            })
            .addCase(completeRequest.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false; // Сбрасываем состояние загрузки
                //state.error = action.error.message;// Устанавливаем сообщение об ошибке
            });
    },
});

// Экспортируем действия и редюсер
export default completeSlice.reducer;