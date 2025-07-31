import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import MetaData from "../../components/layout/MetaData";
import MenuBar from "../../components/layout/MenuBar";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";


const Cart: React.FC = () => {
    const { cartItems } = useAppSelector(state => state.cart);

    const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10 text-center">
                <MenuBar title="Giỏ hàng" />
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Giỏ hàng trống</h2>
                <Link to="/" className="text-blue-600 hover:text-blue-800 underline">
                    Tiếp tục mua sắm
                </Link>
            </div>
        );
    }

    const checkoutHandler = () => {
        navigate("/login?redirect=shipping");
    }

    return (
        <Fragment>
            <MetaData title="Giỏ hàng" />
            <div className="max-w-5xl mx-auto  ">
                <MenuBar title="Giỏ hàng" />
                <div className="overflow-x-auto py-10 border-none rounded">
                    <button className="bg-red-500 p-2 rounded-full font-bold border-none text-white mb-2 ">Giỏ hàng</button>
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
                                    <button className="bg-gray-500 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-gray-600 transition duration-300">
                                        Tiếp tục mua
                                    </button>
                                </Link>
                                <button onClick={checkoutHandler} className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-orange-600 transition duration-300">
                                    Thanh toán
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* tổng tiền */}
                <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[800px] px-4 z-50">
                    <div className="bg-white rounded-t-xl shadow-sm px-6 py-4">
                        <div className="flex justify-between items-center mb-3">
                            <p className="text-sm font-semibold text-gray-800">Tổng tiền tạm tính:</p>
                            <span className="text-red-500 text-sm font-semibold">
                                {totalAmount.toLocaleString("vi-VN")}đ
                            </span>
                        </div>
                        <button
                            disabled={totalAmount === 0}
                            className={`w-full py-2 rounded-md font-semibold text-sm ${totalAmount === 0
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-red-500 text-white hover:bg-red-600 transition"
                                }`}
                        >
                            MUA NGAY
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Cart;