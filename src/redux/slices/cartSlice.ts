import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, ShippingInfo } from "../../interface/Cart";
import { addToCart } from "../actions/cartActions";

interface CartState {
    cartItems: CartItem[]
    shippingInfo: ShippingInfo | null
}

const initialState: CartState = {
    cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems")!)
        : [],
    shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo")!)
        : null,
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        removeFromCart: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter((i) => i.product !== action.payload)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        updateCartQuantity: (state, action: PayloadAction<{ productId: string; quantity: number }>) => {
            state.cartItems = state.cartItems.map((i) => i.product === action.payload.productId ? { ...i, quantity: action.payload.quantity } : i)
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
        },
        saveShippingInfo: (state, action: PayloadAction<ShippingInfo>) => {
            state.shippingInfo = action.payload;
            localStorage.setItem("shippingInfo", JSON.stringify(action.payload))
        },
        clearCart: (state) => {
            state.cartItems = []
            localStorage.removeItem("cartItems")
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.cartItems = action.payload
        })
    }
})

export const { removeFromCart, updateCartQuantity, saveShippingInfo, clearCart } = cartSlice.actions;
export default cartSlice.reducer;