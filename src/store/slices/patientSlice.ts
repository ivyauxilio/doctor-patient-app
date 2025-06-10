// store/slices/patientSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '@/lib/api'; // your axios instance
import { PatientData } from '@/lib/api';


// interface FetchPatientsParams {
//   page?: number;
//   perPage?: number;
// }

interface PatientState {
  data: PatientData[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: PatientState = {
  data: [],
  current_page: 1,
  last_page: 1,
  per_page: 10,
  total: 0,
  loading: false,
  error: null,
};

// export const fetchPatients = createAsyncThunk('patients/fetchAll', async () => {
//   const response = await api.get('/patients'); // API endpoint
//   return response.data;
// });
// export const fetchPatients = createAsyncThunk(
//   'patients/fetchAll',
//   async ({ page = 1, perPage = 10 }: FetchPatientsParams) => {
//     const response = await api.get(`/patients?page=${page}&per_page=${perPage}`);
//     return response.data; // contains data, current_page, last_page, etc.
//   }
// );
export const fetchPatients = createAsyncThunk(
  'patients/fetchAll',
  async ({ page = 1, search = '' }: { page?: number; search?: string }) => {
    const response = await api.get(`/patients?page=${page}&search=${search}`);
    console.log("res",search, response.data)
    return response.data; // returns { data, current_page, last_page, per_page, total, ... }
  } 
  // async ({ page, search }: { page: number; search?: string }) => {
  //   const response = await api.get('/patients', {
  //     params: { page, search }
  //   });
  //   console.log("res",response.data)
  //   return response.data;
  // }
);

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        // state.loading = false;
        // state.data = action.payload;
        // const { data, current_page, last_page, per_page, total } = action.payload;
        // state.data = data;
        // state.pagination = { current_page, last_page, per_page, total };
        state.loading = false;
        state.data = action.payload.data;
        state.current_page = action.payload.current_page;
        state.last_page = action.payload.last_page;
        state.per_page = action.payload.per_page;
        state.total = action.payload.total;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch patients';
      });
  },
});

export default patientSlice.reducer;
