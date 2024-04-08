import { configureStore } from "@reduxjs/toolkit";
import { recipeSlice } from "./features/recipes/recipeSlice";

export const store = configureStore({
    reducer: {
        recipe: recipeSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;