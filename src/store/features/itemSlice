import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../types/item";

interface ItemState {
    Items: Item[];
}

const initialState: ItemState = {
    Items: []
}

export const itemSlice = createSlice({
    name: "Items",
    initialState,
    reducers: {
        setRecipes: (state, action) => {
            state.Items = action.payload;
        }
    }
})

export const recipesByFamillySelector = (state: ItemState, famillyId: number | string ): Item[] => {
    return state.Items.filter((item) => item.familyid == famillyId);
}

export const {setRecipes} = itemSlice.actions;