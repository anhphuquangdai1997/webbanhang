import React from 'react'
import { Product } from '../../../interface/Products';
import { Link } from 'react-router-dom';
import Rating from '../../../components/layout/Rating';

interface ProductCardProps {
    product: Product;
}


const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <Link to={`/product/${product._id}`} key={product._id} className="group max-w-[350px] flex flex-col mx-auto bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1">
            <div className="relative overflow-hidden px-0.5">
                <img
                    className="w-full md:h-35 sm:h-45 pt-2 object-contain transform group-hover:scale-105 transition-transform duration-300"
                    src={product.images[0]?.url || 'https://via.placeholder.com/350x400?text=No+Image'}
                    alt={product.name}
                />
            </div>

            <div className="p-4 flex flex-col flex-1">
                <div className="font-semibold line-clamp-2 text-sm mb-1 text-gray-800">{product.name}</div>
                <p className="text-gray-600 text-xs mb-3 line-clamp-2">
                    {product.description}
                </p>
                <div className="flex justify-between mt-auto items-center">
                    <span className="text-xl font-semibold text-blue-600">${product.price}</span>
                    <span className={`font-semibold text-sm ${product.Stock > 0 ?'text-green-700' :'text-red-500'}`}>{product.Stock>0 ? 'còn hàng' : 'hết hàng'}</span>
                </div>
                <div className="flex justify-between py-1 gap-2">
                    <Rating rating={product.ratings} />
                    {product.reviews.length > 0 && (
                        <span className="text-sm text-gray-600">{product.reviews.length} reviews</span>
                    )}
                </div>
            </div>
        </Link>
    )
}

export default ProductCard;