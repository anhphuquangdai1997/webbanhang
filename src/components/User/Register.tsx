import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";
import ProfileImage from "../../assets/profile.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { registerUser } from "../../redux/actions/userAction";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [avatarPreview, setAvatarPreview] = useState<string>(ProfileImage);
    const [message, setMessage] = useState<string>("");
    const [avatar, setAvatar] = useState<string>("");

    const dispatch = useAppDispatch();
    const { loading, isAuthenticated } = useAppSelector((state) => state.user);
    const navigate = useNavigate();
    // Hàm nén ảnh
    const compressImage = (file: File): Promise<string> => {
        return new Promise((resolve) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // Resize ảnh về 300x300 để giảm size
                canvas.width = 300;
                canvas.height = 300;

                ctx?.drawImage(img, 0, 0, 300, 300);

                // Convert về base64 với chất lượng 70%
                const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
                resolve(compressedBase64);
            };

            img.src = URL.createObjectURL(file);
        });
    };

    // Xử lý khi chọn file
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Kiểm tra size file (tối đa 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage("File quá lớn. Vui lòng chọn file nhỏ hơn 5MB");
                return;
            }

            try {
                // Nén ảnh
                const compressedBase64 = await compressImage(file);

                // Set preview và avatar
                setAvatarPreview(compressedBase64);
                setAvatar(compressedBase64);
                setMessage(""); // Clear message
            } catch (error) {
                setMessage("Có lỗi khi xử lý ảnh");
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!avatar) {
            setMessage("vui lòng chọn ảnh đại diện")
            return
        }
        setMessage("")
        try {
            await dispatch(registerUser({
                name,
                email,
                password,
                avatar,
            }))
            if (isAuthenticated) {
                setName("")
                setEmail("")
                setPassword("")
                setAvatarPreview(ProfileImage)
                setAvatar("")
                setMessage("Đăng ký thành công")
            }
            navigate('/')
        } catch (error) {
            console.log("Error during registration:", error);
        }
    }


    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Đăng ký</h2>

                {message && (
                    <div className={`mb-4 p-3 rounded ${message.includes("thành công")
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}>
                        {message}
                    </div>
                )}

                <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Tên</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-gray-600">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <div className="mb-6 relative">
                    <label className="block mb-1 text-gray-600">Mật khẩu</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="*********"
                        required
                        className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-9 right-3 cursor-pointer text-gray-500"
                    >
                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </div>
                </div>

                <div className="mb-6 flex flex-col items-center justify-center">
                    <label className="block mb-1 text-gray-600">Ảnh đại diện</label>

                    {/* Message for file size or error */}
                    {/* Hidden input file */}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        id="avatarInput"
                    />

                    {/* Avatar preview click to trigger file */}
                    <img
                        src={avatarPreview}
                        alt="Avatar"
                        onClick={() => document.getElementById("avatarInput")?.click()}
                        className="w-15 h-15 rounded-full object-cover border-2 border-gray-300 cursor-pointer hover:border-indigo-500 transition"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-2 rounded text-white transition ${loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                >
                    {loading ? "loading..." : "Đăng ký"}
                </button>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Bạn đã có tài khoản?{" "}
                    <Link to='/login' className="text-indigo-500 hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Register;