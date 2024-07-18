import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems : [], shippingAddress: " ", paymentMethod : " "}
const Decimal = (num) =>{
    return Math.round(num * 100 / 100).toFixed(2);
}
export const cartSlice  = createSlice({
    name : 'cart',
    initialState,
    reducers:{
        addToCart  : (state, action) =>{
            const item = action.payload;

            const existItem = state.cartItems.find(x => x._id === item._id);
            if(existItem){
                state.cartItems = state.cartItems.map((x)=> x._id === existItem._id ? item : x)
            }else{
                state.cartItems = [...state.cartItems, item]
            }
            state.itemPrice = Decimal(state.cartItems.reduce((acc,item)=> acc + item.price * item.qty, 0));

            state.itemShipping = Decimal(state.itemPrice > 100 ? 20 : 0);

            state.itemTax = Decimal (Number(0.15 * state.itemPrice).toFixed(2));

            state.totalPrice  = (Number (state.itemPrice) + Number(state.itemShipping) +Number( state.itemTax) ).toFixed(2);
            localStorage.setItem('cart', JSON.stringify(state))
        },
        removeFromCart : (state, action) =>{
            state.cartItems = state.cartItems.filter((item) => item._id !== action.payload);
            state.itemPrice = Decimal(state.cartItems.reduce((acc,item)=> acc + item.price * item.qty, 0));

            state.itemShipping = Decimal(state.itemPrice > 100 ? 20 : 0);

            state.itemTax = Decimal (Number(0.15 * state.itemPrice).toFixed(2));

            state.totalPrice  = (Number (state.itemPrice) + Number(state.itemShipping) +Number( state.itemTax) ).toFixed(2);
            localStorage.setItem('cart', JSON.stringify(state))
            
        },
        saveShippingAddress : (state, action) => {
            state.shippingAddress = action.payload;

            state.itemPrice = Decimal(state.cartItems.reduce((acc,item)=> acc + item.price * item.qty, 0));

            state.itemShipping = Decimal(state.itemPrice > 100 ? 20 : 0);

            state.itemTax = Decimal (Number(0.15 * state.itemPrice).toFixed(2));

            state.totalPrice  = (Number (state.itemPrice) + Number(state.itemShipping) +Number( state.itemTax) ).toFixed(2);
            localStorage.setItem('cart', JSON.stringify(state))
            console.log(state.saveShippingAddress,'from slices');
            
        },
        savePaymentMethod : (state, action) =>{
            state.paymentMethod = action.payload;
            state.itemPrice = Decimal(state.cartItems.reduce((acc,item)=> acc + item.price * item.qty, 0));

            state.itemShipping = Decimal(state.itemPrice > 100 ? 20 : 0);

            state.itemTax = Decimal (Number(0.15 * state.itemPrice).toFixed(2));

            state.totalPrice  = (Number (state.itemPrice) + Number(state.itemShipping) +Number( state.itemTax) ).toFixed(2);
            localStorage.setItem('cart', JSON.stringify(state))
            console.log(state.paymentMethod,'from slices');
        },
        clearCart : (state, action) =>{
            state.cartItems = [];
            state.itemPrice = Decimal(state.cartItems.reduce((acc,item)=> acc + item.price * item.qty, 0));

            state.itemShipping = Decimal(state.itemPrice > 100 ? 20 : 0);

            state.itemTax = Decimal (Number(0.15 * state.itemPrice).toFixed(2));

            state.totalPrice  = (Number (state.itemPrice) + Number(state.itemShipping) +Number( state.itemTax) ).toFixed(2);
            localStorage.setItem('cart', JSON.stringify(state))
            console.log(state.paymentMethod,'from slices');

        }
        
    }
})

export const {addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCart} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;