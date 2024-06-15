import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL_API = '/api/v1/reservations';

// Add Reservation Thunk
export const addReservation = createAsyncThunk('reservations/addReservation', async (reservationData) => {
  try {
    const response = await fetch(URL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('acess-token'))?.token}`,
      },
      body: JSON.stringify(reservationData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
});

// Get Reservations Thunk
export const getReservations = createAsyncThunk(
  'reservations/getReservations',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(URL_API, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('acess-token'))?.token}`,
        },
      });

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

// Cancel Reservation Thunk
export const cancelReservation = createAsyncThunk(
  'reservations/cancelReservation',
  async (reservationId, thunkAPI) => {
    try {
      const response = await axios.delete(`${URL_API}/${reservationId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${JSON.parse(localStorage.getItem('acess-token'))?.token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return { id: reservationId };
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const initialState = {
  content: [],
  isLoading: false,
  error: undefined,
};

export const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addReservation.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(addReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.content.push(action.payload);
      })
      .addCase(addReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.reservation;
      })
      .addCase(getReservations.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getReservations.fulfilled, (state, action) => {
        const newContent = [];
        const keys = Object.keys(action.payload);
        keys.forEach((keyOfActionPayload) => {
          newContent.push({
            id: keyOfActionPayload,
            ...action.payload[keyOfActionPayload],
          });
        });
        state.isLoading = false;
        state.content = newContent;
      })
      .addCase(getReservations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload.reservation;
      })
      .addCase(cancelReservation.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.content = state.content.filter(reservation => reservation.id !== action.payload.id);
      })
      .addCase(cancelReservation.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default reservationSlice.reducer;
