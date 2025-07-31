import React from 'react'
import { Product } from '../../../interface/Products';
import { Link } from 'react-router-dom';
import Rating from '../../../components/layout/Rating';

interface ProductCardProps {
    product: Product;
}


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="group w-full sm:max-w-[300px] flex flex-col mx-auto bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="relative overflow-hidden px-2 pt-2">
                <img
                    className="w-full h-[160px] object-contain transform group-hover:scale-105 transition-transform duration-300"
                    src={product.images[0]?.url || 'https://via.placeholder.com/350x400?text=No+Image'}
                    alt={product.name}
                />
            </div>

            <div className="p-3 flex flex-col flex-1">
                <h3 className="font-semibold text-sm sm:text-base mb-1 text-gray-800 line-clamp-2">
                    {product.name}
                </h3>
                <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                    {product.description}
                </p>

                <div className="flex justify-between items-center mt-auto mb-1">
                    <span className="text-base sm:text-lg font-bold text-blue-600">${product.price}</span>
                    <span className={`text-sm font-semibold ${product.Stock > 0 ? 'text-green-700' : 'text-red-500'}`}>
                        {product.Stock > 0 ? 'còn hàng' : 'hết hàng'}
                    </span>
                </div>

                <div className="flex justify-between items-center pt-1 gap-2">
                    <Rating rating={product.ratings} />
                    <span className="text-[10px] text-gray-500">
                        {product.reviews.length} reviews
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard;