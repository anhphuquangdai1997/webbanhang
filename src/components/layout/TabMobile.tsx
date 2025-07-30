import React, { useState } from 'react';
import { CiFilter, CiMenuBurger } from "react-icons/ci";
import { TfiMore } from "react-icons/tfi";
import DrawerMobile from './DrawerMobile';
import { Link } from 'react-router-dom';
import { IoHomeOutline } from 'react-icons/io5';

const TabMobile: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handleClickTab = (id: number) => {
        setActiveTab(id);
        if (id === 2) {
            setIsDrawerOpen((prev) => !prev)
        }
        else {
            setIsDrawerOpen(false);
        }
    };

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-1 py-2 shadow-lg z-50">
                <ul className="flex justify-around items-center max-w-md mx-auto">
                    <Link
                        to='/'
                        onClick={() => handleClickTab(0)}
                        className={`cursor-pointer flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 ${activeTab === 0 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <IoHomeOutline size={24} className={`mb-1 ${activeTab === 0 ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className={`text-xs font-medium truncate ${activeTab === 0 ? 'text-blue-600' : 'text-gray-500'}`}>
                            Trang chủ
                        </span>
                    </Link>

                    <li
                        onClick={() => handleClickTab(1)}
                        className={`cursor-pointer flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 ${activeTab === 1 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <CiFilter size={24} className={`mb-1 ${activeTab === 1 ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className={`text-xs font-medium truncate ${activeTab === 1 ? 'text-blue-600' : 'text-gray-500'}`}>
                            Lọc
                        </span>
                    </li>
                    <li
                        onClick={() => handleClickTab(2)}
                        className={`cursor-pointer flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 ${activeTab === 2 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <CiMenuBurger size={24} className={`mb-1 ${activeTab === 2 ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className={`text-xs font-medium truncate ${activeTab === 2 ? 'text-blue-600' : 'text-gray-500'}`}>
                            Danh mục
                        </span>
                    </li>

                    <li
                        onClick={() => handleClickTab(3)}
                        className={`cursor-pointer flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 min-w-0 flex-1 ${activeTab === 3 ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        <TfiMore size={24} className={`mb-1 ${activeTab === 3 ? 'text-blue-600' : 'text-gray-500'}`} />
                        <span className={`text-xs font-medium truncate ${activeTab === 3 ? 'text-blue-600' : 'text-gray-500'}`}>
                            xem thêm
                        </span>
                    </li>
                </ul>
            </div >
            <DrawerMobile open={isDrawerOpen} title='Danh Mục' onClose={() => setIsDrawerOpen(false)} >
                <div className="p-4">
                    <h2 className="text-lg font-semibold mb-4">Danh mục sản phẩm</h2>
                </div>
            </DrawerMobile>
        </>
    );
};

export default TabMobile;
