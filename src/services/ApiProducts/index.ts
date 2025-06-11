import axios from "axios";

const BASE_URL = 'https://backend-fullstack-kbiq.onrender.com/api/v1';


const productApiUrl = '/products';
const productIdApiUrl = '/product';

const productApi = {
    products: {
        getAllProducts: async ({page=1}:{page?:number}) => {
            return await axios.get(`${BASE_URL}${productApiUrl}?page=${page}`)
        },
        getProductById: async (id: string) => {
            return await axios.get(`${BASE_URL}${productIdApiUrl}/${id}`)
        }
    }
}

export default productApi;