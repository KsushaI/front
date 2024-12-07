import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import fetchVisas from './actions/fetchvisas'; // импортируйте ваше асинхронное действие

export interface Visa {
    pk: number;
    type: string;
    price: number;
    url: string;
    status: string; // Added to reflect the response
    description: string | null; // Can be null
    creator: string | null; // Can be null
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
  
  // Инициализация начального состояния
  const initialState: VisasState = {
    services: [],
    loading: false,
    error: null,
  };
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
          state.services = action.payload.services; // Загружаем данные о визах
        })
        .addCase(fetchVisas.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string; // Записываем ошибку
        });
    },
  });
  
  // Экспортируем редюсер
  export default serviceSlice.reducer;