import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Item } from "../../types/item";

interface ItemState {
  items: Item[];
}

const initialState: ItemState = {
  items: [],
};

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
    add: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(
        (item) => item.caption !== action.payload.toString()
      );
    },
    update: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[index] = action.payload;
    },
    
  },
});

export const recipesByFamillySelector = (
  state: ItemState,
  famillyId: number | string
): Item[] => {
  return state.items.filter((item) => item.familyid == famillyId);
};

export const { setRecipes } = itemSlice.actions;
