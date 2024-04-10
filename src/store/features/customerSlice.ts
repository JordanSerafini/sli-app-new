import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Customer } from "../../types/customer";

interface CustomerState {
    customers: Customer[];
}

const initialState: CustomerState = {
    customers: [],
};

export const customerSlice = createSlice({
    name: "customers",
    initialState,
    reducers: {
        setCustomers: (state, action: PayloadAction<Customer[]>) => {
            state.customers = action.payload;
        },
        addCustomer: (state, action: PayloadAction<Customer>) => {
            state.customers.push(action.payload);
        },
        removeCustomer: (state, action: PayloadAction<string>) => {
            state.customers = state.customers.filter(customer => customer.id !== action.payload);
        },
        updateCustomer: (state, action: PayloadAction<Customer>) => {
            const index = state.customers.findIndex(customer => customer.id === action.payload.id);
            if (index !== -1) {
                state.customers[index] = action.payload;
            }
        },
    },
});

export const { setCustomers, addCustomer, removeCustomer, updateCustomer } = customerSlice.actions;
