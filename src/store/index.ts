import { configureStore } from "@reduxjs/toolkit";
import { itemSlice } from "./features/itemSlice";

export const store = configureStore({
    reducer: {
        items: itemSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;