import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
import MetaData from "../../components/layout/MetaData";
import MenuBar from "../../components/layout/MenuBar";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { BsBack } from "react-icons/bs";
import { useState } from "react";
import { Toast, ToastToggle } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";


const Cart: React.FC = () => {
    const { cartItems } = useAppSelector(state => state.cart);
    const { isAuthenticated } = useAppSelector(state => state.user);
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [showToast, setShowToast] = useState(false);

    const totalAmount = cartItems
        .filter(item => selectedItems.includes(item.product))
        .reduce((total, item) => total + item.price * item.quantity, 0);
    const navigate = useNavigate();

    const handleCheckChange = (productId: string, checked: boolean) => {
        setSelectedItems(prev =>
            checked ? [...prev, productId] : prev.filter(id => id !== productId)
        )
    }
    const isAllSelected = selectedItems.length === cartItems.length && cartItems.length > 0;
    const handleSelectAllChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            const allIds = cartItems.map(item => item.product);
            setSelectedItems(allIds)
        }
        else {
            setSelectedItems([])
        }
    }

    const checkoutHandler = () => {
        if (!isAuthenticated) {
            setShowToast(true);
            setTimeout(() => {
                navigate("/login?redirect=shipping")
            }, 2000);
            return;
        }
        navigate("/login?redirect=shipping");
    }

    if (cartItems.length === 0) {
        return (
            <div className="max-w-5xl mx-auto px-4 py-10 text-center">
                <MenuBar title="Giỏ hàng" />
                <div className="flex flex-col items-center justify-center py-10">
                    <p className="text-lg font-medium text-gray-800 mb-2">Giỏ hàng của bạn đang trống !</p>
                    <p className="text-gray-600 mb-6">Hãy chọn thêm sản phẩm để mua sắm nhé.</p>
                    <Link
                        to="/"
                        className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2"
                    >
                        <BsBack size={16} />
                        QUAY VỀ TRANG CHỦ
                    </Link>
                </div>
            </div>
        );
    }


    return (
        <Fragment>
            <MetaData title="Giỏ hàng" />
            <div className="max-w-5xl mx-auto px-1  ">
                <MenuBar title="Giỏ hàng" />
                <div className="overflow-x-auto py-10 border-none rounded">
                    <div className="flex items-center gap-2 px-1 mb-4">
                        <input
                            type="checkbox"
                            checked={isAllSelected}
                            onChange={handleSelectAllChange}
                            className="w-4 h-4 accent-red-500 self-start rounded-full text-red-600"
                        />
                        <label className="text-sm text-gray-700 font-medium">Chọn tất cả</label>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {cartItems.map(item => (
                            <CartItem key={item.product} item={item} checked={selectedItems.includes(item.product)} onCheckChange={handleCheckChange} />
                        ))}
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
                            onClick={checkoutHandler}
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
                {showToast && (
                    <div className="fixed top-4 right-4 z-[9999]">
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                                <HiExclamation className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">Bạn Chưa đăng nhập</div>
                            <ToastToggle onClick={() => setShowToast(false)} />
                        </Toast>
                    </div>
                )}
            </div>
        </Fragment>
    )
}
export default Cart;