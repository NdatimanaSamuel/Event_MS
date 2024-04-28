import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookingService from "./bookingService";

const initialState = {
  bookings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new Ticket
export const bookTicket = createAsyncThunk(
  "ticket/createNew",
  async (bookingData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await bookingService.bookTicket(bookingData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//client get his /her booked tickets
export const viewBookedTicket = createAsyncThunk(
  "ticket/viewBookedTicket",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await bookingService.getAllBookedTicket(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// cancel booking
export const cancelBookings = createAsyncThunk(
  "booking/rejectBooking",
  async (bookingId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await bookingService.cancelMyBooking(bookingId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// admin view all bookings
export const adminViewAllBooking = createAsyncThunk(
  "booking/AdminViewAllBooking",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await bookingService.adminViewBookings(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// manage admin status
export const adminManageBookingStatus = createAsyncThunk(
  "booking/manageBookingStatus",
  async ({ bookingId, statusData }, thunkAPI) => { // Updated destructuring
    try {
      const token = thunkAPI.getState().auth.user?.token;
      return await bookingService.manageBookingStatusAdmin(bookingId, statusData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);


export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(bookTicket.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = "";
      })
      .addCase(bookTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.bookings.push(action.payload);
      })
      .addCase(bookTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(viewBookedTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(viewBookedTicket.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(viewBookedTicket.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(cancelBookings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cancelBookings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = state.bookings.filter(
          (booking) => booking.id !== action.meta.arg
        );
        state.message = action.payload.message;
      })
      .addCase(cancelBookings.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(adminViewAllBooking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminViewAllBooking.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bookings = action.payload;
      })
      .addCase(adminViewAllBooking.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(adminManageBookingStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminManageBookingStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.booking = action.payload;
        state.message = "Booking status updated successfully";
      })
      .addCase(adminManageBookingStatus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookingSlice.actions;
export default bookingSlice.reducer;
