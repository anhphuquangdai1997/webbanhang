import React, { useState } from 'react';
import {
  sortPriceAsc,
  sortPriceDesc,
  setFilteredCategory,
  clearFilters,
} from '../../../redux/slices/productSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../redux/hooks';
import { AiOutlineClose } from 'react-icons/ai';
import { Dropdown, DropdownItem } from 'flowbite-react';

const NavHome: React.FC = () => {
  const dispatch = useDispatch();
  const { filteredCategory } = useAppSelector((state) => state.product);

  const [sortOption, setSortOption] = useState('asc');

  const sortOptions = [
    { label: 'Tăng dần', value: 'asc' },
    { label: 'Giảm dần', value: 'desc' },
  ];

  const categories = [
    { label: 'Tất cả', value: 'all' },
    { label: 'Điện Thoại', value: 'SmartPhones' },
    { label: 'Laptop', value: 'Laptop' },
    { label: 'IPad', value: 'Ipad' },
    { label: 'Camera', value: 'Camera' },
    { label: 'Phụ Kiện', value: 'Phụ Kiện' },
  ];

  const handleSortChange = (value: string) => {
    setSortOption(value);
    if (value === 'asc') {
      dispatch(sortPriceAsc());
    } else {
      dispatch(sortPriceDesc());
    }
  };

  const handleCategoryChange = (value: string) => {
    dispatch(setFilteredCategory(value === 'all' ? '' : value));
  };

  const handleCancel = () => {
    dispatch(clearFilters());
    setSortOption('asc');
    dispatch(sortPriceAsc());
  };

  const currentSortLabel =
    sortOptions.find((s) => s.value === sortOption)?.label || 'Tăng dần';

  const currentCategoryLabel =
    categories.find((c) => c.value === (filteredCategory || 'all'))?.label || 'Tất cả';

  return (
    <div className="w-full px-2 py-1 bg-white rounded-lg mb-2 flex flex-col md:flex-row md:justify-between md:items-center gap-2">
      {/* Tiêu đề */}
      <div className="flex items-center w-fit shrink-0">
        <div className="h-[25px] w-[5px] mr-2 bg-red-500"></div>
        <h2 className="text-base text-[#222] uppercase font-bold m-0">BÁN CHẠY NHẤT</h2>
      </div>

      {/* Bộ lọc */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-600">Sắp xếp theo</span>

        {/* Dropdown sắp xếp */}
        <Dropdown
          label={currentSortLabel}
          size="xs"
          dismissOnClick={true}
          className="z-2 bg-gray-200 text-gray-600"
        >
          {sortOptions.map((option) => (
            <DropdownItem
              key={option.value}
              onClick={() => handleSortChange(option.value)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </Dropdown>

        {/* Dropdown danh mục */}
        <Dropdown
          label={currentCategoryLabel}
          size="xs"
          dismissOnClick={true}
          className="z-2 bg-gray-200 text-gray-600"
        >
          {categories.map((category) => (
            <DropdownItem
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
            >
              {category.label}
            </DropdownItem>
          ))}
        </Dropdown>

        {/* Nút xoá bộ lọc */}
        {filteredCategory && (
          <button
            onClick={handleCancel}
            className="bg-gray-900 cursor-pointer h-[20px] w-[20px] rounded-full hover:bg-gray-500 transition flex items-center justify-center"
            aria-label="Clear filters"
          >
            <AiOutlineClose className="text-white" size={15} />
          </button>
        )}
      </div>
    </div>
  );
};

export default NavHome;
