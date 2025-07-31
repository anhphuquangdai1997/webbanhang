import React from 'react';
import { MdDelete } from "react-icons/md";
import { CartItem as CartItemType } from '../../interface/Cart';
import { useAppDispatch } from '../../redux/hooks';
import { removeFromCart } from '../../redux/slices/cartSlice';
import { updateCartQuantity } from '../../redux/slices/cartSlice';

interface CartItemProps {
    item: CartItemType;
    checked?:boolean;
    onCheckChange?:(productId:string,checked:boolean)=>void
}

const CartItem: React.FC<CartItemProps> = ({ item,checked=false,onCheckChange }) => {
    const dispatch = useAppDispatch();

    const handleRemoveFromCart = () => {
        dispatch(removeFromCart(item.product));
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity > 0 && newQuantity <= item.stock) {
            dispatch(updateCartQuantity({ productId: item.product, quantity: newQuantity }));
        }
    };
    const handleCheckChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
        onCheckChange?.(item.product,e.target.checked)
    }

    return (
        <div className="relative flex items-center gap-3 p-3 mt-1 bg-white border rounded-xl shadow-sm">
            {/* checkbox */}
            <input 
                type='checkbox'
                checked={checked}
                onChange={handleCheckChange}
                className='w-4 h-4 accent-red-500 self-start rounded-full text-red-600'
            />
            {/* Ảnh sản phẩm */}
            <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain flex-shrink-0"
            />

            {/* Nội dung sản phẩm */}
            <div className="flex flex-col justify-between flex-grow">
                {/* Tên sản phẩm */}
                <p className="text-sm font-medium text-gray-800 line-clamp-2 pr-6">{item.name}</p>

                {/* Giá sản phẩm */}
                <p className="text-sm font-semibold text-red-500 mt-1">
                    {item.price.toLocaleString('vi-VN')}đ
                </p>

                {/* Nút số lượng */}
                <div className="flex items-center gap-2 mt-2">
                    <button
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center disabled:opacity-50"
                    >
                        -
                    </button>
                    <span className="w-6 text-center">{item.quantity}</span>
                    <button
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="w-7 h-7 rounded-full bg-gray-200 text-gray-700 font-bold text-sm flex items-center justify-center disabled:opacity-50"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Nút xoá */}
            <button
                onClick={handleRemoveFromCart}
                className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
            >
                <MdDelete size={18} />
            </button>
        </div>
    )
}
export default CartItem;