import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import eventReducer from "../redux/features/events/eventSlice";
import bookingReducer from "../redux/features/booking/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    event: eventReducer,
    booking: bookingReducer,
  },
});
