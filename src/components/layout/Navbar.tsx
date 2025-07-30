import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { CiMenuBurger } from "react-icons/ci";
import { BsCart2 } from "react-icons/bs";
import { RiListUnordered } from "react-icons/ri";
import { FaUserCircle, FaSignOutAlt, FaUserShield, FaUser } from "react-icons/fa";
import Menu from './Menu';
import DrawerMobile from './DrawerMobile';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { logout } from '../../redux/actions/userAction';
import Sidebarr from './Sidebar';

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const { isAuthenticated, user, loading } = useAppSelector((state) => state.user);
    const { cartItems } = useAppSelector((state) => state.cart);
    const dispatch = useAppDispatch();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Searching for:', searchQuery);
    };

    const handleLogout = () => {
        setShowLogoutModal(true)
    };
    const cancelLogout = () => {
        setShowLogoutModal(false)
    }

    const confirmLogout = () => {
        dispatch(logout())
        setShowLogoutModal(false);
        setIsUserMenuOpen(false);
    }

    // Đóng user menu khi click ra ngoài
    const handleClickOutside = () => {
        setIsUserMenuOpen(false);
    };

    return (
        <>
            {/* DrawerMobile cho mobile */}
            <DrawerMobile open={openDrawer} onClose={() => setOpenDrawer(false)} title="Menu">
                <Sidebarr 
                    isAuthenticated={isAuthenticated}
                    user={user}
                    loading={loading}
                    cartItems={cartItems} />
            </DrawerMobile>
            <nav className="bg-white shadow-lg w-full sticky top-0 left-0 z-10">
                <div className="max-w-7xl mx-auto px-2 sm:px-2 lg:px-4">
                    <div className="flex justify-between h-16">
                        {/* Logo and brand name */}
                        <div className={`flex items-center ${isSearchOpen ? 'md:flex hidden' : 'flex'}`}>
                            <Link to="/" className="flex-shrink-0">
                                <img
                                    className="h-auto w-40"
                                    src="https://www.hana-tochi-to.jp/res/img/logo.svg"
                                    alt="Logo"
                                />
                            </Link>
                        </div>

                        {/* Search Bar - Desktop */}
                        <div className="hidden md:flex flex-1 items-center justify-center px-4 gap-5">
                            <div className='flex items-center'><Menu /></div>
                            <form onSubmit={handleSearch} className="w-full max-w-lg">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-gray-100 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                        placeholder="Search..."
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-0 top-0 mt-2 mr-3 text-gray-600 hover:text-indigo-600"
                                    >
                                        <IoIosSearch size={24} />
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Desktop menu */}
                        <div className="hidden md:flex items-center space-x-4 relative">
                            <div className="relative">
                                {isAuthenticated && user ? (
                                    <div className="relative">
                                        <button
                                            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                            className="focus:outline-none"
                                        >
                                            <img
                                                src={user.avatar?.url || "/default-avatar.png"}
                                                alt=""
                                                className="w-10 h-10 rounded-full object-cover border border-gray-300 cursor-pointer hover:border-indigo-500 transition-colors"
                                            />
                                        </button>

                                        {/* Dropdown Menu */}
                                        {isUserMenuOpen && (
                                            <>
                                                {/* Overlay để đóng menu khi click ra ngoài */}
                                                <div
                                                    className="fixed inset-0 z-10"
                                                    onClick={handleClickOutside}
                                                ></div>

                                                <div className="absolute top-12 right-0 border-none shadow-lg rounded-lg py-2 w-48 z-20 bg-white border">
                                                    <div className="px-4 py-2 border-b border-gray-100">
                                                        <p className="text-sm text-gray-800 font-semibold flex items-center gap-2">
                                                            <FaUser className="text-indigo-600" />
                                                            {user.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                                                    </div>

                                                    {user.role === "admin" && (
                                                        <Link
                                                            to="/admin/dashboard"
                                                            onClick={() => setIsUserMenuOpen(false)}
                                                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition"
                                                        >
                                                            <FaUserShield className="text-indigo-500" />
                                                            Quản trị
                                                        </Link>
                                                    )}

                                                    <Link
                                                        to="/profile"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition"
                                                    >
                                                        <FaUserCircle className="text-gray-500" />
                                                        Hồ sơ
                                                    </Link>
                                                    <Link
                                                        to="/cart"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition"
                                                    >
                                                        <RiListUnordered className="text-gray-500" />
                                                        Đơn hàng
                                                    </Link>

                                                    <Link
                                                        to="/cart"
                                                        onClick={() => setIsUserMenuOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition"
                                                    >
                                                        <BsCart2 className="text-gray-500" />
                                                        Giỏ hàng
                                                    </Link>

                                                    <hr className="my-1 border-gray-100" />

                                                    <button
                                                        onClick={handleLogout}
                                                        disabled={loading}
                                                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition disabled:opacity-50"
                                                    >
                                                        <FaSignOutAlt />
                                                        {loading ? 'Đang đăng xuất...' : 'Đăng xuất'}
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        to="/login"
                                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition"
                                    >
                                        <FaUser size={22} />
                                    </Link>
                                )}
                            </div>
                            <Link
                                to="/cart"
                                className="w-10 h-10 flex justify-center items-center hover:bg-gray-400 text-gray-500 bg-gray-200 border-none rounded-full text-sm font-medium relative"
                            >
                                <BsCart2 size={20} />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
                        </div>

                        {/* modal đăng xuất */}
                        {showLogoutModal && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                                <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-sm">
                                    <h2 className="text-lg font-semibold text-gray-800 mb-4">Xác nhận đăng xuất</h2>
                                    <p className="text-sm text-gray-600 mb-6">Bạn có chắc chắn muốn đăng xuất không?</p>
                                    <div className="flex justify-end space-x-3">
                                        <button
                                            onClick={cancelLogout}
                                            className="px-4 py-2 text-sm rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                                        >
                                            Huỷ
                                        </button>
                                        <button
                                            onClick={confirmLogout}
                                            className="px-4 py-2 text-sm rounded-md bg-red-500 text-white hover:bg-red-600"
                                        >
                                            xác nhận
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Mobile Search Bar */}
                        <div className={`md:hidden flex items-center transition-all duration-300 ease-in-out ${isSearchOpen ? 'flex-1 mx-2' : 'w-0 overflow-hidden'}`}>
                            <form onSubmit={handleSearch} className="w-full">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full bg-gray-100 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                        placeholder="Search..."
                                    />
                                    <button
                                        type="submit"
                                        className="absolute right-0 top-0 mt-2 mr-3 text-gray-600 hover:text-indigo-600"
                                    >
                                        <IoIosSearch size={24} />
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Mobile Search and Menu buttons */}
                        <div className="md:hidden flex items-center space-x-2">
                            <button
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
                            >
                                {isSearchOpen ? (
                                    <IoClose size={24} />
                                ) : (
                                    <IoIosSearch size={24} />
                                )}
                            </button>
                            <Link to="/cart" className="relative">
                                <BsCart2 size={22} />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </Link>
                            <button
                                onClick={() => setOpenDrawer(!openDrawer)}
                                className="p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none">
                                <CiMenuBurger size={24} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;