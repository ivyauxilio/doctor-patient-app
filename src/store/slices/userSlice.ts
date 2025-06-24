// store/userSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/User";
import api from '@/lib/api';

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await api.get("/me", { withCredentials: true });
  return response.data;
});


interface UserState {
  user: User | null;
  roles: string[];
  permissions: string[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  roles: [],
  permissions: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.roles = action.payload.roles;
        state.permissions = action.payload.permissions;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as any)?.message || 'An error occurred';
      });
  },
});

export default userSlice.reducer;
