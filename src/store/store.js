import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";
import { calendarioSlice } from "./calendario/calendarioSlice";
import { authSlice } from "./auth/authSlice";
// import { uiSlice } from "./ui/uiSlice";
// import { uiSlice } from "./";

export  const store = configureStore({
  reducer: {
    calendario: calendarioSlice.reducer,
    ui:         uiSlice.reducer,
    auth:       authSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }) 
})