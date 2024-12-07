import { createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../api'; // импортируйте ваш визовый API

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

// Создание асинхронного действия для получения услуг
const fetchVisas = createAsyncThunk<VisasResult, void>(
  'visas/fetchVisas',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.visasApi.visasApiList();
      return response.data; // Возвратите данные из ответа
    } catch (error) {
      return rejectWithValue('Не удалось загрузить визы'); // Обработка ошибок
    }
  }
);

export default fetchVisas;