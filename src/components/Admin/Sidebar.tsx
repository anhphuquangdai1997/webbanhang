import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar:React.FC = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  return (
    <div className="bg-white flex flex-col sticky top-0 z-100 py-16">
      {/* Logo */}
      <Link to="/" className="">
        <img 
          src="https://www.hana-tochi-to.jp/res/img/logo.svg" 
          alt="logo" 
          className="w-35 h-auto transition-all px-2 duration-500 hover:drop-shadow-lg hover:filter hover:brightness-110"
        />
      </Link>

      {/* Dashboard */}
      <Link 
        to="/admin/dashboard"
        className="no-underline text-gray-500 font-light text-base p-8 transition-all duration-500 hover:text-red-500 hover:scale-110"
      >
        <p className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
          </svg>
          Dashboard
        </p>
      </Link>

      {/* Products với dropdown */}
      <div className="text-gray-500 font-light text-base p-8 transition-all duration-500 hover:text-red-500">
        <button
          onClick={() => setIsProductsOpen(!isProductsOpen)}
          className="flex items-center w-full text-left focus:outline-none"
        >
          <svg 
            className={`w-5 h-5 mr-2 transition-transform duration-300 ${isProductsOpen ? 'rotate-90' : ''}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"/>
          </svg>
          Products
        </button>
        
        {/* Dropdown menu */}
        <div className={`ml-7 mt-2 space-y-2 transition-all duration-300 ${isProductsOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <Link 
            to="/admin/products"
            className="block text-gray-400 hover:text-red-400 transition-colors duration-300 py-2"
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
              </svg>
              All Products
            </div>
          </Link>
          
          <Link 
            to="/admin/product"
            className="block text-gray-400 hover:text-red-400 transition-colors duration-300 py-2"
          >
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Create Product
            </div>
          </Link>
        </div>
      </div>

      {/* Orders */}
      <Link 
        to="/admin/orders"
        className="no-underline text-gray-500 font-light text-base p-8 transition-all duration-500 hover:text-red-500 hover:scale-110"
      >
        <p className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 2a1 1 0 000 2h4a1 1 0 100-2H7z" clipRule="evenodd"/>
          </svg>
          Orders
        </p>
      </Link>

      {/* Users */}
      <Link 
        to="/admin/users"
        className="no-underline text-gray-500 font-light text-base p-8 transition-all duration-500 hover:text-red-500 hover:scale-110"
      >
        <p className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
          </svg>
          Users
        </p>
      </Link>

      {/* Reviews */}
      <Link 
        to="/admin/reviews"
        className="no-underline text-gray-500 font-light text-base p-8 transition-all duration-500 hover:text-red-500 hover:scale-110"
      >
        <p className="flex items-center">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
          Reviews
        </p>
      </Link>
    </div>
  );
};

export default Sidebar;