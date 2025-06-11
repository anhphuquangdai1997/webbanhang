import React, { useState } from 'react'
import { sortPriceAsc, sortPriceDesc, setFilteredCategory, clearFilters } from '../../../redux/slices/productSlice'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../redux/hooks';
import { AiOutlineClose } from 'react-icons/ai'

const NavHome: React.FC = () => {
    const [sortOption, setSortOption] = useState('asc')

    const dispatch = useDispatch()
    const { filteredCategory } = useAppSelector((state) => state.product)


    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSortOption(value)
        if (value === 'asc') {
            dispatch(sortPriceAsc())
        } else if (value === 'desc') {
            dispatch(sortPriceDesc())
        }
    }
    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        dispatch(setFilteredCategory(value === 'all' ? '' : value))
    }
    const handleCancel = () => {
        dispatch(clearFilters())
        setSortOption('asc');
        dispatch(sortPriceAsc())
    }

    return (
        <div className='w-full px-2 py-1 bg-white rounded-lg mb-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
            {/* Tiêu đề */}
            <div className='flex items-center w-fit shrink-0'>
                <div className='h-[25px] w-[5px] mr-2 bg-red-500'></div>
                <h2 className='text-base text-[#222] uppercase font-bold m-0'>BÁN CHẠY NHẤT</h2>
            </div>

            {/* Bộ lọc */}
            <div className='flex flex-wrap items-center gap-2'>
                <span className='text-sm text-gray-600'>Sắp xếp theo</span>

                <select
                    value={sortOption}
                    onChange={handleChange}
                    className='h-[30px] md:w-[100px] w-[60px]  md:text-sm text-xs bg-gray-200 border border-gray-100 rounded px-2 text-gray-700 focus:outline-none'
                >
                    <option value='asc'>Tăng dần</option>
                    <option value='desc'>Giảm dần</option>
                </select>

                <select
                    value={filteredCategory || 'all'}
                    onChange={handleCategoryChange}
                    className='h-[30px] md:w-[90px] w-[60px]  md:text-sm text-xs px-2 bg-gray-200 border border-gray-100 rounded text-gray-700 focus:outline-none'
                >
                    <option value='all'>All</option>
                    <option value='SmartPhones'>Điện Thoại</option>
                    <option value='Laptop'>Laptop</option>
                    <option value='Ipad'>IPad</option>
                    <option value='Camera'>Camera</option>
                    <option value='Phụ Kiện'>Phụ Kiện</option>
                </select>

                {filteredCategory && filteredCategory !== '' && (
                    <button
                        onClick={handleCancel}
                        className='bg-gray-900 cursor-pointer h-[20px] w-[20px] rounded-full hover:bg-gray-500 transition flex items-center justify-center'
                        aria-label="Clear filters"
                    >
                        <AiOutlineClose className="text-white" size={15} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default NavHome
