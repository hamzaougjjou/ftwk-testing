import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
    reducers: {
        addTocart: (state, action) => {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                console.log('Item already exists in the cart');
                return state; // Return current state if item already exists
            }

            let newState = [...state, action.payload];
            localStorage.setItem("cart", JSON.stringify(newState));
            // console.log('Item added to cart');
            return newState;
        },
        removeFromCart: (state, action) => {
            const newState = state.filter(item => item.id !== action.payload.id);
            localStorage.setItem("cart", JSON.stringify(newState));
            console.log('Item removed from cart');
            return newState;
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            
            //resust quantity less than 0
            if( quantity<=0 ){ return state}

            const item = state.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
                localStorage.setItem("cart", JSON.stringify(state));
            }
            return state;
        }
    }
});

export const { addTocart, removeFromCart , updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;