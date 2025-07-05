import React from 'react';
import { MdDelete } from "react-icons/md";
import { CartItem as CartItemType } from '../../interface/Cart';
import { useAppDispatch } from '../../redux/hooks';
import { removeFromCart } from '../../redux/slices/cartSlice';
import { updateCartQuantity } from '../../redux/slices/cartSlice';

interface CartItemProps {
    item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
    const dispatch = useAppDispatch();

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(item.product));
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity > 0 && newQuantity <= item.stock) {
            dispatch(updateCartQuantity({ productId: item.product, quantity: newQuantity }));
        }
    };

    return (
        <div className="grid grid-cols-4 items-center border-b border-gray-200 py-4 px-4">
            <div className="col-span-2 flex items-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain mr-4" />
                <div className="flex-1">
                    <div>
                        <p className="md:font-medium font-normal line-clamp-3">{item.name}</p>
                        <p className="text-sm text-green-500">Giá: {item.price.toLocaleString('vi-VN')} đ</p>
                    </div>
                    <button 
                        onClick={handleRemoveFromCart}
                        className="text-red-500 hover:text-red-700 transition-colors"
                    >
                        <MdDelete size={25} />
                    </button>
                </div>
            </div>
            <div className="col-span-1 flex items-center justify-end gap-2">
                <button 
                    onClick={() => handleQuantityChange(item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 bg-gray-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    -
                </button>
                <span className="w-6 text-center">{item.quantity}</span>
                <button 
                    onClick={() => handleQuantityChange(item.quantity + 1)}
                    disabled={item.quantity >= item.stock}
                    className="w-8 h-8 bg-gray-600 text-white rounded disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    +
                </button>
            </div>
            <div className="col-span-1 text-right">
                <p className="text-lg font-semibold">
                    {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                </p>
            </div>
        </div>
    )
}
export default CartItem;