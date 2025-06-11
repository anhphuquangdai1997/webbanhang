import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../../utils/axios"

interface FetchProductsParams {
  page?: number;
  category?: string;
  sortByPrice?: "asc" | "desc" | null;
  price?: [number, number];
  ratings?: number;
}

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (params: FetchProductsParams, thunkAPI) => {
    try {
      const { page = 1, category = "", sortByPrice = null, price = [0, 10000], ratings = 0 } = params;
      let url = `/products?page=${page}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
      if (category && category !== "all") {
        url += `&category=${category}`;
      }
      if (sortByPrice) {
        url += `&sortByPrice=${sortByPrice}`
      }
      const res = await axiosClient.get(url);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch");
    }
  }
);
