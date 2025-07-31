export interface CartItem {
    product: string;
    name: string;
    price: number;
    stock: number;
    image: string;
    quantity: number;
}
export interface ShippingInfo {
    address: string;
    city: string;
    state:string;
    phonreNo: string;
    postalCode: string;
    country: string;
}