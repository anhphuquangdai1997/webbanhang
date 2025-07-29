import React, { useState } from 'react';
import { UserProfile } from '../../interface/User';
import { useAppDispatch } from '../../redux/hooks';
import { updateProfile } from '../../redux/actions/userAction';
import Modal from '../layout/Modal';

interface ProfileProps {
    user: UserProfile | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    const dispatch = useAppDispatch();
    console.log(user, "user")

    const [isModal, setIsModal] = useState(false);
    const [open, setIsOpen] = useState(false);
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "https://via.placeholder.com/150?text=Avatar");
    const [avatar, setAvatar] = useState<string | null>(null);

    // Xử lý chọn avatar
    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateProfile({ name, email, avatar: avatar || undefined }));
        setIsModal(false);
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
                <h1 className="text-4xl font-bold mb-8 text-gray-800 tracking-wide">Thông tin cá nhân</h1>

                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-8">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className='relative'>
                            <img
                                className="w-36 h-36 rounded-full object-cover border-4 border-blue-200 shadow-md"
                                src={typeof user?.avatar === 'string' ? user.avatar : user?.avatar?.url || "https://via.placeholder.com/150?text=Avatar"}
                                alt="avatar"
                            />
                        </div>

                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-semibold text-gray-800">{user?.name}</h2>
                            <p className="text-gray-600 mt-1">{user?.email}</p>
                            <span className="inline-block mt-3 px-4 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium shadow-sm">
                                {user?.role === 'admin' ? 'Quản trị viên' : 'Khách hàng'}
                            </span>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center sm:justify-end gap-4">
                        <button onClick={() => setIsModal(true)} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow">
                            ✏️ Chỉnh sửa thông tin
                        </button>
                        <button onClick={() => setIsOpen(true)} className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium shadow">
                            🔒 Đặt lại mật khẩu
                        </button>
                    </div>
                </div>

                {isModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                            <h2 className="text-xl font-semibold mb-4">Chỉnh sửa thông tin</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Tên:</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 mb-2">Email:</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border rounded"
                                        required
                                    />
                                </div>
                                <div className="mb-6 flex flex-col items-center justify-center">
                                    <label className="block mb-1 text-gray-600">Ảnh đại diện</label>

                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="avatarInput"
                                        onChange={handleAvatarChange}
                                    />

                                    <img
                                        src={avatarPreview}
                                        alt="Avatar"
                                        onClick={() => document.getElementById("avatarInput")?.click()}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 cursor-pointer hover:border-indigo-500 transition"
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow">
                                        Lưu thay đổi
                                    </button>
                                    <button type="button" onClick={() => setIsModal(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition font-medium shadow">
                                        Đóng
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

            <Modal isOpen={open} onClose={() => setIsOpen(false)}>
                <h2 className="text-xl font-semibold mb-4">Đặt lại mật khẩu</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Mật khẩu mới:</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Nhập mật khẩu mới"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Xác nhận mật khẩu:</label>
                        <input
                            type="password"
                            className="w-full px-3 py-2 border rounded"
                            placeholder="Xác nhận mật khẩu mới"
                            required
                        />
                    </div>
                    <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-blue-700 transition font-medium shadow">
                        Đặt lại mật khẩu
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default Profile;
