import { createAsyncThunk } from "@reduxjs/toolkit"
import { CartItem, ShippingInfo } from "../../interface/Cart";
import axiosClient from "../../utils/axiosClient";

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (
        { id, quantity }: { id: string; quantity: number },
        { getState }
    ) => {
        const { data } = await axiosClient.get(`/product/${id}`);
        const item: CartItem = {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.images[0].url,
            stock: data.product.Stock,
            quantity,
        }

        const { cart }: any = getState();
        const existingItem = cart.cartItems.find((i: CartItem) => i.product === item.product);

        let updatedCartItems;
        if (existingItem) {
            updatedCartItems = cart.cartItems.map((i: CartItem) => 
                i.product === item.product ? { ...i, quantity: item.quantity } : i
            );
        }
        else {
            updatedCartItems = [...cart.cartItems, item];
        }
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return updatedCartItems
    }
)

export const removeItemsFromCart = createAsyncThunk(
    "cart/removeItem",
    async (id: string, { getState }) => {
        const { cart }: any = getState();
        const updatedItems = cart.cartItems.filter((item: any) => item.product !== id);
        localStorage.setItem("cartItems", JSON.stringify(updatedItems));
        return id;
    }
)

export const saveShipping = createAsyncThunk(
    "cart/saveShipping",
    async (data: ShippingInfo) => {
        localStorage.setItem("shippingInfo", JSON.stringify(data));
        return data;
    }
)
