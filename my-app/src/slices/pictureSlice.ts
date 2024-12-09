// features/visaSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {api } from '../api'; // Adjust according to your file structure


/*export const uploadPicture = createAsyncThunk(
    'visa/uploadPicture',
    async (id: string, file:  ) => {
        if (!file) {
            alert("Пожалуйста, выберите изображение для загрузки");
            return;
          }
      
          const formData = new FormData();
          formData.append('image', file); // Добавляем файл в FormData
        await api.visasApi.visasApiUpdatePicCreate(id, {
            body: formData,
            //headers: {
            //  'Content-Type': 'multipart/form-data', // Указываем тип контента
           //},
          })
    }
);*/



  interface UploadImagePayload {
    id: string;
    file: File | null;
  }

export const uploadImage = createAsyncThunk(
    'images/upload',
    async ({ id, file }: UploadImagePayload) => {
        if (!file) {
          throw new Error("Пожалуйста, выберите изображение для загрузки");
        }
    
        const formData = new FormData();
        formData.append('pic', file); // Add the file to FormData
    
        // Call your API
        await api.visasApi.visasApiUpdatePicCreate(id, {
          body: formData,
        });
      }
  );

  interface ImageState {
    loading: boolean;
    error: string | null;
    success: boolean;
  }
  
  const initialState: ImageState = {
    loading: false,
    error: null,
    success: false,
  };
const pictureSlice = createSlice({
    name: 'images',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Upload failed'; // Capture error messages
    });
  },
});

export default pictureSlice.reducer;