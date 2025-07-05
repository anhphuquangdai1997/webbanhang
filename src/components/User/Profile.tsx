import React, { useRef, useState } from 'react';
import { UserProfile } from '../../interface/User';
import { FaImage } from "react-icons/fa";

interface ProfileProps {
    user: UserProfile | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {

    const [isModal, setIsModal] = useState(false)

    const fileInputRef = useRef<HTMLInputElement>(null);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 tracking-wide">Thông tin cá nhân</h1>

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Avatar */}
                    <div className='relative'>
                        <img
                            className="w-36 h-36 rounded-full object-cover border-4 border-blue-200 shadow-md"
                            src={typeof user?.avatar === 'string' ? user.avatar : user?.avatar?.url || "https://via.placeholder.com/150?text=Avatar"}
                            alt="avatar"
                        />
                        <div className='absolute bottom-0 right-4 rounded-full shadow-lg'>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files[0]) {
                                        const file = e.target.files[0];
                                        // Handle file upload logic here
                                        console.log("Selected file:", file);
                                    }
                                }}
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="flex items-center gap-2 p-2 bg-gray-300 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow"
                            >
                                <FaImage className="text-sm" />
                            </button>
                        </div>
                    </div>

                    {/* User Info */}
                    <div className="text-center md:text-left">
                        <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
                        <p className="text-gray-600 mt-1">{user?.email}</p>
                        <span className="inline-block mt-3 px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium shadow-sm">
                            {user?.role === 'admin' ? 'Quản trị viên' : 'khách hàng'}
                        </span>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center sm:justify-end gap-4">
                    <button onClick={() => setIsModal(true)} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow">
                        ✏️ Chỉnh sửa thông tin
                    </button>
                    <button className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow">
                        🔒 Đặt lại mật khẩu
                    </button>
                </div>
            </div>

            {
                isModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa thông tin</h2>
                            {/* Form for editing user info */}
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Tên:</label>
                                    <input type="text" defaultValue={user?.name} className="w-full px-3 py-2 border rounded" />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Email:</label>
                                    <input type="email" defaultValue={user?.email} className="w-full px-3 py-2 border rounded" />
                                </div>
                                <div className='gap-2 flex justify-end'>
                                    <button type="submit" className="px-2 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow">
                                        Lưu thay đổi
                                    </button>
                                    <button onClick={() => setIsModal(false)} className="px-2 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-medium shadow">Đóng</button>
                                </div>
                            </form>

                        </div>
                    </div>
                )
            }
        </div>

    )
}
export default Profile;