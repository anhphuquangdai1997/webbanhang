import { useEffect } from 'react'
import ProductCard from './ProductCard';
import type { Product } from '../../../interface/Products';
import Loader from '../../../components/layout/Loader';
import Pagination from '../../../components/layout/Pagination';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchProducts } from '../../../redux/actions/productActions';
import { setCurrentPage } from '../../../redux/slices/productSlice';
const Product: React.FC = () => {

    const dispatch = useAppDispatch();
    const { products, loading, currentPage, totalPage, filteredCategory, priceRange,ratings } = useAppSelector((state) => state.product)

    useEffect(() => {
        dispatch(fetchProducts({ page: currentPage, category: filteredCategory, price: priceRange,ratings }));
    }, [dispatch, currentPage, filteredCategory, priceRange,ratings]);

    if (loading) return <Loader />

    return (
        <div className='w-full min-h-[800px] p-4'>
            {products.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                    <h2 className="text-xl font-semibold text-gray-600">Không có sản phẩm nào phù hợp</h2>
                </div>
            ) : (
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard product={product} key={product._id} />
                        ))}
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPage={totalPage}
                        onPageChange={(page) => dispatch(setCurrentPage(page))}
                    />
                </div>
            )
            }
        </div >
    )
}

export default Product
