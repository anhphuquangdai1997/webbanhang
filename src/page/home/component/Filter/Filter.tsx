import { TbMenu4 } from "react-icons/tb";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
    setFilteredCategory,
    setPriceRange,
    setRating
} from "../../../../redux/slices/productSlice";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { FaStar } from "react-icons/fa";


const priceOptions = [
    { label: "Tất cả", value: "all", range: [0, 10000] },
    { label: "Dưới 2 triệu", value: "under2", range: [0, 2000] },
    { label: "Từ 2 - 4 triệu", value: "2to4", range: [2000, 4000] },
    { label: "Trên 5 triệu", value: "above20", range: [5000, 10000] }, // max 10000 để an toàn
];

const categoryOptions = [
    { label: "Tất cả", value: "all" },
    { label: "Điện thoại", value: "SmartPhones" },
    { label: "Laptop", value: "Laptop" },
    { label: "Ipad", value: "Ipad" },
    { label: "Máy ảnh", value: "Camera" },
    { label: "Phụ Kiện", value: "Phụ Kiện" },
];

const Filter: React.FC = () => {
    const dispatch = useAppDispatch();

    const { filteredCategory, priceRange, ratings } = useAppSelector(
        (state) => state.product
    );

    const [selectedPriceOption, setSelectedPriceOption] = useState("all");
    const [showPrice, setShowPrice] = useState(true);
    const [showCategory, setShowCategory] = useState(true);
    const [showRating, setShowRating] = useState(true);

    const handleSelectPrice = (optionValue: string, range: [number, number]) => {
        setSelectedPriceOption(optionValue);
        dispatch(setPriceRange(range));
    };

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const minValue = Number(e.target.value);
        if (!isNaN(minValue) && minValue <= priceRange[1]) {
            dispatch(setPriceRange([minValue, priceRange[1]]));
            setSelectedPriceOption("custom");
        }
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const maxValue = Number(e.target.value);
        if (!isNaN(maxValue) && maxValue >= priceRange[0]) {
            dispatch(setPriceRange([priceRange[0], maxValue]));
            setSelectedPriceOption("custom");
        }
    };

    const handleCategoryChange = (value: string) => {
        dispatch(setFilteredCategory(value === "all" ? "" : value));
    };

    return (
        <div className="sticky top-[0.25rem] h-fit left-0 px-4 py-3 bg-white rounded shadow-md w-64">
            <p className="flex justify-between font-bold text-lg text-gray-800 items-center gap-2 mb-4">
                <TbMenu4 />
                <span className="flex items-center">Bộ lọc tìm kiếm</span>
            </p>

            {/* Mức giá */}
            <div className="border-b border-gray-200 pb-2 mb-2">
                <div
                    className="flex items-center justify-between cursor-pointer select-none"
                    onClick={() => setShowPrice((prev) => !prev)}
                >
                    <span className="font-semibold text-base">Mức giá</span>
                    {showPrice ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                </div>
            </div>

            {showPrice && (
                <div className="flex flex-col gap-2 pl-1">
                    {priceOptions.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center gap-2 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                checked={selectedPriceOption === option.value}
                                onChange={() =>
                                    handleSelectPrice(option.value, option.range as [number, number])
                                }
                                className="accent-red-500 w-4 h-4"
                            />
                            <span
                                className={
                                    selectedPriceOption === option.value
                                        ? "font-semibold text-red-600"
                                        : "text-gray-500"
                                }
                            >
                                {option.label}
                            </span>
                        </label>
                    ))}

                    {/* Input và slider */}
                    <div className="flex pt-4 items-center gap-1">
                        <div className="border rounded-xl text-[12px] h-[2.5rem] flex flex-col items-center min-w-[70px]">
                            <input
                                onChange={handleMinChange}
                                value={priceRange[0]}
                                type="number"
                                min={0}
                                max={priceRange[1]}
                                placeholder="Min"
                                className="w-full text-left border-none outline-none bg-transparent text-base"
                            />
                        </div>
                        <span className="flex items-center px-1 text-xl font-bold">~</span>
                        <div className="border rounded-xl text-[14px] h-[2.5rem] flex flex-col items-center min-w-[70px]">
                            <input
                                onChange={handleMaxChange}
                                value={priceRange[1]}
                                type="number"
                                min={priceRange[0]}
                                max={10000}
                                placeholder="Max"
                                className="w-full text-left border-none outline-none bg-transparent text-base"
                            />
                        </div>
                    </div>

                    <div className="w-full flex items-center mt-2">
                        <Slider
                            range
                            min={0}
                            max={10000}
                            step={100}
                            value={priceRange}
                            onChange={(value) =>
                                dispatch(setPriceRange(value as [number, number]))
                            }
                            trackStyle={[{backgroundColor:'#BB0000',height:6}]}
                            handleStyle={[
                                { backgroundColor: '#BB0000', borderColor: '#BB0000' },
                                { backgroundColor: '#BB0000', borderColor: '#BB0000' }
                            ]}
                            railStyle={{ backgroundColor: '#eee', height: 6 }}
                        />
                    </div>

                    <div className="px-2 pb-1.5">
                        <span className="text-gray-500 text-sm">
                            <span className="text-red-500">*</span> Bạn có thể nhập khoảng giá phù hợp với bạn
                        </span>
                    </div>
                </div>
            )}

            {/* Thể loại */}
            <div className="border-b border-gray-200 pb-2 mb-2">
                <div
                    className="flex items-center justify-between cursor-pointer select-none"
                    onClick={() => setShowCategory((prev) => !prev)}
                >
                    <span className="font-semibold text-base">Thể loại</span>
                    {showCategory ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                </div>
            </div>

            {showCategory && (
                <div className="grid grid-cols-2 gap-2">
                    {categoryOptions.map((option) => (
                        <div key={option.value}>
                            <p
                                className={`w-full text-left border ${(filteredCategory || "all") ===
                                    (option.value === "all" ? "all" : option.value)
                                    ? "border-red-500 bg-gray-100 text-red-500"
                                    : "border-gray-200 text-gray-700"
                                    } text-sm cursor-pointer px-2 py-1.5 hover:bg-gray-100 rounded-md`}
                                onClick={() => handleCategoryChange(option.value)}
                            >
                                {option.label}
                            </p>
                        </div>
                    ))}
                </div>
            )}

            {/* Đánh giá */}
            <div className="border-b border-gray-200 pb-2 py-3 mb-2">
                <div
                    className="flex items-center justify-between cursor-pointer select-none"
                    onClick={() => setShowRating((prev) => !prev)}
                >
                    <span className="font-semibold text-base">Đánh giá</span>
                    {showRating ? <FaChevronUp size={10} /> : <FaChevronDown size={10} />}
                </div>
            </div>

            {showRating && (
                <div>
                    <div className="flex justify-center gap-1 px-1 pt-1 cursor-pointer">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar
                                key={star}
                                size={24}
                                onClick={() => dispatch(setRating(ratings === star ? 0 : star))}
                                color={star <= ratings ? "#f59e0b" : "#d1d5db"} // vàng nếu <= ratings, xám nếu không
                                className="transition-colors duration-200 hover:text-yellow-500"
                            />
                        ))}
                    </div>
                    <p className="text-sm text-gray-500 py-2 mt-1">
                        Hiển thị sản phẩm từ <strong>{ratings}★</strong> trở lên
                    </p>
                </div>

            )}
        </div>
    );
};

export default Filter;
