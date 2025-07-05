import { useParams } from "react-router-dom";
import productApi from "../../../services/ApiProducts";
import { useEffect, useState } from "react";
import { Product } from "../../../interface/Products";
import { BsCart2 } from "react-icons/bs";
import Rating from "../../../components/layout/Rating";
import Breadcrumb from "../../../components/layout/Breadcrumb";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Loader from "../../../components/layout/Loader";
import { addToCart } from "../../../redux/actions/cartActions";
import { IoCheckmarkCircle } from "react-icons/io5";
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';


const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const { loading } = useAppSelector((state) => state.product);

    const dispatch =useAppDispatch()

    useEffect(() => {
        const fetchProductById = async () => {
            if (!id) return;
            try {
                const response = await productApi.products.getProductById(id);
                setProduct(response.data.product);
                setSelectedImageIndex(0);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProductById();
    }, [id]);


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
    };    const addToCartHandler = () => {
        const quantity = 1;
        if (product.Stock < quantity) {
            alert("Xin lỗi, sản phẩm đã hết hàng");
            return;
        }
        dispatch(addToCart({ id: product._id, quantity }));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
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
                            onClick={() => alert('Mua ngay')}
                        >
                            MUA NGAY
                            <span className="text-[9px] font-tahoma">(Nhận tại nhà hoặc tại cửa hàng)</span>
                        </button>
                        <button
                            className="border py-2 px-0.5 border-gray-200 text-red-500 rounded-md text-center flex flex-col items-center"
                            type="button"
                            disabled={product.Stock<1 ?true :false}
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
                <div className="space-y-4">
                    {product.reviews.length > 0 ? (
                        product.reviews.map((review) => (
                            <div key={review._id} className="p-4 border-none rounded-lg bg-white shadow-sm">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="font-semibold">{review.name}</span>
                                    <Rating rating={Number(review.rating)} />
                                </div>
                                <p className="text-gray-600">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-600">Chưa có đánh giá nào cho sản phẩm này.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;