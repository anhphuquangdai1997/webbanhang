import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getProductDetail } from "../../../redux/actions/productActions";
import { BsCart2 } from "react-icons/bs";
import Rating from "../../../components/layout/Rating";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import Loader from "../../../components/layout/Loader";
import { addToCart } from "../../../redux/actions/cartActions";
import { IoCheckmarkCircle } from "react-icons/io5";
import Modal from "../../../components/layout/Modal";
import InteractiveRating from "../../../components/layout/InteractiveRating";
import { Toast, ToastToggle } from "flowbite-react";
import { HiExclamation } from "react-icons/hi";

// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';


const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const { productDetail: product, loading } = useAppSelector((state) => state.product);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rating, setRating] = useState(5);
    const [showToast, setShowToast] = useState(false);
    const navigate = useNavigate()
    const { isAuthenticated } = useAppSelector(state => state.user);

    useEffect(() => {
        if (!id) return;
        dispatch(getProductDetail(id));
        setSelectedImageIndex(0);
    }, [id, dispatch]);


    useEffect(() => {
        if (!product) return;

        const interval = setInterval(() => {
            setSelectedImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [product]);

    if (!product) return null;
    if (loading) return <Loader />;
    const handleSelectImage = (index: number) => {
        setSelectedImageIndex(index);
    };
    const addToCartHandler = () => {
        const quantity = 1;
        if (product.Stock < quantity) {
            alert("Xin lỗi, sản phẩm đã hết hàng");
            return;
        }
        dispatch(addToCart({ id: product._id, quantity }));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

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

    return (
        <>
            <div className="max-w-6xl mx-auto p-4">
                {showSuccess && (
                    <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 z-50">
                        <IoCheckmarkCircle size={20} />
                        <span>Đã thêm vào giỏ hàng</span>
                    </div>
                )}
                <Breadcrumb />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left - Images */}
                    <div className="p-2">
                        <img
                            className="w-full h-[450px] cursor-pointer py-2 object-contain bg-white rounded-xl border border-gray-200"
                            src={product.images[selectedImageIndex]?.url}
                            alt={product.name || "Product Image"}
                        />
                        <div className="flex mt-4 gap-2">
                            {product.images.map((image, index) => (
                                <img
                                    onClick={() => handleSelectImage(index)}
                                    key={image._id}
                                    className={`w-20 h-20 cursor-pointer object-contain bg-white rounded-xl border ${selectedImageIndex === index ? "border-red-500" : "border-gray-200"
                                        }`}
                                    src={image.url}
                                    alt={`${product.name} image ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right - Details */}
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-tahoma text-gray-800">{product.name}</h2>
                        <div className="flex gap-2 text-gray-600 text-md font-tahoma mt-2 mb-4">
                            <Rating rating={product.ratings} />
                            <span>{product.reviews.length} review{product.reviews.length !== 1 ? 's' : ''}</span>
                        </div>

                        <span className="text-3xl font-tahoma font-bold text-red-600 mb-6">
                            {product.price.toLocaleString('vi-VN')} đ
                        </span>

                        <div className="mt-2 mb-4 border rounded-lg text-xl text-center border-gray-200 pt-4">
                            <p className="text-gray-600 mx-auto rounded-md mt-2 mb-4">Thông Tin Sản Phẩm</p>
                            <div className="text-left text-sm font-tahoma leading-loose text-gray-600 px-4">
                                <p>{product.description}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 ">
                            <button
                                className="flex-1 w-full h-full flex flex-col items-center justify-center bg-red-500 text-white border border-gray-100 rounded-md text-center font-bold text-xs md:text-sm mb-[2px]"
                                type="button"
                                onClick={checkoutHandler}
                            >
                                MUA NGAY
                                <span className="text-[9px] font-tahoma">(Nhận tại nhà hoặc tại cửa hàng)</span>
                            </button>
                            <button
                                className="border py-2 px-0.5 border-gray-200 text-red-500 rounded-md text-center flex flex-col items-center"
                                type="button"
                                disabled={product.Stock < 1 ? true : false}
                                onClick={addToCartHandler}
                            >
                                <BsCart2 size={20} />
                                <span className="text-[9px] font-tahoma">Thêm vào giỏ</span>
                            </button>
                        </div>
                    </div>
                </div>
                {/* relationship */}
                {/* relationship */}
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 uppercase">
                        Sản phẩm liên quan
                    </h3>
                </div>

                {/* Đánh giá khách hàng */}
                <div className="mt-10">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800 uppercase">Đánh giá của khách hàng</h3>

                    <div className="bg-white p-4 rounded-lg shadow space-y-6">
                        {/* Tổng quan & Biểu đồ sao */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Tổng điểm */}
                            <div className="flex flex-col items-center justify-center">
                                <div className="text-4xl font-bold text-yellow-500 flex items-center">
                                    {product.ratings?.toFixed(1) || 0}
                                    <span className="ml-1">★</span>
                                </div>
                                <p className="text-sm text-gray-600">
                                    ({product.reviews.length} đánh giá và nhận xét)
                                </p>
                            </div>

                            {/* Biểu đồ số sao */}
                            <div className="md:col-span-2 space-y-1">
                                {[5, 4, 3, 2, 1].map((star) => {
                                    const count = product.reviews.filter(r => Number(r.rating) === star).length;
                                    const percent = product.reviews.length
                                        ? (count / product.reviews.length) * 100
                                        : 0;
                                    return (
                                        <div key={star} className="flex items-center gap-2 text-sm">
                                            <span className="w-4">{star}</span>
                                            <span className="text-yellow-500">★</span>
                                            <div className="w-full h-2 bg-gray-200 rounded">
                                                <div className="h-2 bg-red-500 rounded" style={{ width: `${percent}%` }} />
                                            </div>
                                            <span className="ml-2 text-gray-600">{count} đánh giá</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Nút gửi đánh giá */}
                        <div className="text-center">
                            <p className="font-semibold text-gray-800">Hãy cho chúng tôi biết ý kiến của bạn!</p>
                            <button onClick={() => setIsModalOpen(true)} className="bg-red-600 cursor-pointer text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition mt-2">
                                Gửi đánh giá
                            </button>
                        </div>

                        {/* Danh sách đánh giá */}
                        <div className="space-y-4">
                            {product.reviews.length > 0 ? (
                                product.reviews.map((review) => (
                                    <div key={review._id} className="bg-[#f5f5f5] p-4 rounded-lg shadow-sm text-sm">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 bg-gray-300 text-white font-bold rounded-full flex items-center justify-center">
                                                    {review.name.charAt(0).toUpperCase()}
                                                </div>
                                                <span className="font-semibold">{review.name}</span>
                                            </div>
                                            <div className="text-gray-500 text-xs flex items-center gap-1">
                                                <span className="inline-block">🕒</span>
                                                <span>1 tháng trước</span>
                                            </div>
                                        </div>
                                        <div className="ml-9">
                                            <p className="text-gray-700 mb-1 font-semibold">
                                                Đánh giá:{" "}
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i} className={i < Number(review.rating) ? "text-yellow-500" : "text-gray-300"}>
                                                        ★
                                                    </span>
                                                ))}
                                            </p>
                                            <p><span className="font-semibold">Nhận xét:</span> {review.comment}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">Chưa có đánh giá nào cho sản phẩm này.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} >
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Gửi đánh giá của bạn</h3>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        // TODO: Submit logic
                        setIsModalOpen(false);
                    }}
                    className="space-y-4"
                >
                    <div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Số sao</label>
                            <InteractiveRating value={rating} onChange={setRating} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nhận xét</label>
                        <textarea
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            rows={3}
                            placeholder="Viết nhận xét của bạn..."
                            required
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium"
                        >
                            Gửi đánh giá
                        </button>
                    </div>
                </form>
            </Modal>
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
        </>
    );
};

export default ProductDetail;