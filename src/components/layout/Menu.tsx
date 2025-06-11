import React from 'react';
import { RiMenu2Line } from "react-icons/ri";

const Menu: React.FC = () => {
    return (
        <div className='w-30 gap-1 cursor-pointer h-10 flex justify-center items-center hover:bg-gray-400 hover:transition text-gray-600 bg-gray-200 border-none rounded-full text-sm font-medium'>
            <RiMenu2Line size={20} />
            <span className='text-md'>Danh mục</span>
        </div>
    )
}

export default Menu