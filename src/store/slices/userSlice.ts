// store/userSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "@/types/User";
import api from '@/lib/api';

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await api.get("/me", { withCredentials: true });
  return response.data;
});

// Fetch all users (admin/doctor only)
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("users", { withCredentials: true });
      return response.data.data; // users array
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Error fetching users");
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await api.delete(`users/${id}`, { withCredentials: true });
      return id; // return ID to remove from state
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Delete failed');
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ id, data }: { id: number; data: { name: string; email: string } }, { rejectWithValue }) => {
    try {
      const res = await api.put(`users/${id}`, data, { withCredentials: true });
      return res.data.user;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Update failed');
    }
  }
);

interface UserState {
  user: User | null;
  roles: string[];
  permissions: string[];
  users: User[];
  loading: boolean;
  usersLoading: boolean;
  error: string | null;
  usersError: string | null;
}

const initialState: UserState = {
  user: null,
  roles: [],
  permissions: [],
  users: [],
  loading: false,
  usersLoading: false,
  error: null,
  usersError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Authenticated user
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
      })
    
      // All users
      .addCase(fetchAllUsers.pending, (state) => {
        state.usersLoading = true;
        state.usersError = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action: any) => {
        state.usersLoading = false;
        state.usersError = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(u => u.id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
