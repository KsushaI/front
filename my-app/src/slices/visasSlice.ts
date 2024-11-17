// src/slices/visasSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Visa {
  pk: number;
  type: string;
  price: number;
  url: string;
}

interface VisasState {
  filteredVisas: Visa[];
}

const initialState: VisasState = {
  filteredVisas: [],
};

const visasSlice = createSlice({
  name: 'visas',
  initialState,
  reducers: {
    setFilteredVisas(state, action: PayloadAction<Visa[]>) {
      state.filteredVisas = action.payload;
    },
  },
});

export const { setFilteredVisas } = visasSlice.actions;
export const selectFilteredVisas = (state: { visas: VisasState }) => state.visas.filteredVisas;

export default visasSlice.reducer;