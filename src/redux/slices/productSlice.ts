import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchProducts, getAdminProduct } from "../actions/productActions";
import { ProductState } from "../../interface/Products";

const initialState: ProductState = {
    products: [],
    adminProducts: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPage: 1,
    sortByPrice: null,
    filteredCategory: "",
    priceRange: [0, 10000],
    ratings: 0,
}

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload
        },
        sortPriceAsc: (state) => {
            state.sortByPrice = 'asc';
            state.products.sort((a, b) => a.price - b.price)
        },

        sortPriceDesc: (state) => {
            state.sortByPrice = 'desc';
            state.products.sort((a, b) => b.price - a.price)
        },
        setFilteredCategory: (state, action: PayloadAction<string>) => {
            state.filteredCategory = action.payload;
            state.currentPage = 1; // Reset to first page when filtering by category
        },
        setPriceRange: (state, action: PayloadAction<[number, number]>) => {
            state.priceRange = action.payload;
            state.currentPage = 1;
        },
        setRating: (state, action: PayloadAction<number>) => {
            state.ratings = action.payload;
            state.currentPage = 1; // Reset to first page when filtering by rating
        },
        clearFilters: (state) => {
            state.filteredCategory = "";
            state.sortByPrice = null;
            state.priceRange = [0, 10000];
            state.ratings = 0;
            state.currentPage = 1;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                const total = Math.ceil(action.payload.filteredProductsCount / action.payload.resultPerPage)
                state.totalPage = total;

            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
        builder
            .addCase(getAdminProduct.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAdminProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.adminProducts = action.payload;
            })
            .addCase(getAdminProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }


})
export const { setCurrentPage, sortPriceAsc, sortPriceDesc, setFilteredCategory, clearFilters, setPriceRange, setRating } = productSlice.actions;
export default productSlice.reducer;