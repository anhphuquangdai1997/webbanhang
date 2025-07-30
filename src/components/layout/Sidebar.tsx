
import { Sidebar, SidebarItem, SidebarItemGroup, SidebarItems } from "flowbite-react";
import { GrSecure } from "react-icons/gr";
import { User } from "../../interface/User";
import { CartItem } from "../../interface/Cart";
import { FaRegUser, FaRegUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { GoQuestion } from "react-icons/go";
import { MdSecurity, MdOutlinePhoneEnabled } from "react-icons/md";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/actions/userAction";

interface SidebarrProps {
    isAuthenticated: boolean,
    user: User | null,
    loading: boolean,
    cartItems: CartItem[]
}

const Sidebarr: React.FC<SidebarrProps> = ({ isAuthenticated, loading, user }) => {
    const dispatch = useAppDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }
    return (
        <Sidebar aria-label="Sidebar người dùng" className="w-full max-w-[280px]">
            <SidebarItems>
                <SidebarItemGroup>

                    {/* Thông tin người dùng */}
                    {isAuthenticated && (
                        <div className="px-4 py-3 border-b border-gray-200">
                            <p className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                                <FaUser className="text-indigo-600" />
                                {user?.name}
                            </p>
                            <p className="text-xs text-gray-500 ml-6">{user?.email}</p>
                        </div>
                    )}

                    {/* Menu items */}
                    <SidebarItem
                        href="#"
                        icon={IoHomeOutline}
                        label="Pro"
                        labelColor="dark"
                        className="text-sm font-medium text-gray-800"
                    >
                        Trang Chủ
                    </SidebarItem>
                    <SidebarItem
                        href="#"
                        icon={GoQuestion}
                        labelColor="dark"
                        className="text-sm font-medium text-gray-800"
                    >
                        Câu hỏi thường gặp
                    </SidebarItem>
                    <SidebarItem
                        href="#"
                        icon={MdSecurity}
                        labelColor="dark"
                        className="text-sm font-medium text-gray-800"
                    >
                        Quy Chế
                    </SidebarItem>
                    <SidebarItem
                        href="#"
                        icon={MdOutlinePhoneEnabled}
                        label="3"
                        className="text-sm font-medium text-gray-800"
                    >
                        Liên hệ
                    </SidebarItem>
                    <SidebarItem
                        href="#"
                        icon={GrSecure}
                        className="text-sm font-medium text-gray-800"
                    >
                        Chính sách bảo mật
                    </SidebarItem>

                    {/* Đăng xuất hoặc Đăng nhập/Đăng ký */}
                    <div className="border-t border-gray-200 mt-2 pt-2">
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                disabled={loading}
                                className="flex items-center gap-3 w-full px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-100 hover:text-red-600 transition disabled:opacity-50"
                            >
                                <FaSignOutAlt />
                                {loading ? 'Đang đăng xuất...' : 'Đăng xuất'}
                            </button>
                        ) : (
                            <div className="px-2 py-1 space-y-1">
                                <Link
                                    to="/login"
                                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                                >
                                    <FaRegUserCircle size={20} />
                                    Đăng nhập
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
                                >
                                    <FaRegUser size={20} />
                                    Đăng ký
                                </Link>
                            </div>
                        )}
                    </div>

                </SidebarItemGroup>
            </SidebarItems>
        </Sidebar>
    )
}
export default Sidebarr;