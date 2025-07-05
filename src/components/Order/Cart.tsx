import CartItem from "./CartItem";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

const Cart: React.FC = () => {
    const { cartItems } = useAppSelector(state => state.cart);
    
    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10 text-center">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Giỏ hàng trống</h2>
                <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-10">
            <div className="overflow-x-auto border-none rounded">
                <div className="bg-orange-500 text-white font-semibold grid grid-cols-4 py-2 px-4">
                    <div className="col-span-2">Sản phẩm</div>
                    <div className="col-span-1 text-right">Số lượng</div>
                    <div className="col-span-1 text-right">Thành tiền</div>
                </div>
                <div className="divide-y divide-gray-200">
                    {cartItems.map(item => (
                        <CartItem key={item.product} item={item} />
                    ))}
                </div>
                <div className="grid grid-cols-3 p-2">
                    <div className="md:col-span-2"></div>
                    <div className="md:col-span-1 col-span-3 border-t-[3px] border-[tomato]">
                        <div className="flex justify-between items-center">
                            <span className="text-lg font-semibold">Tổng cộng</span>
                            <span className="text-xl font-bold text-orange-500">
                                {totalAmount.toLocaleString('vi-VN')} đ
                            </span>
                        </div>
                        <div className="mt-4 flex py-4 justify-end gap-2">
                            <Link to="/">
                                <button className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300">
                                    Tiếp tục mua
                                </button>
                            </Link>
                            <button className="bg-[tomato] text-white px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300">
                                Thanh toán
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Cart;