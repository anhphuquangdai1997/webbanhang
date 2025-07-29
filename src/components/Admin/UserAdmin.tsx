import { useEffect, useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteUser, getAllUsers, updateUser } from "../../redux/actions/userAction";
import SideBar from "./Sidebar";
import Modal from "../layout/Modal";
import { User } from "../../interface/User";

const UsersList = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.user);

  // State mở modal update
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // State mở modal confirm xóa
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string>("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  // Mở modal update
  const openUpdateModal = (user: User) => {
    setCurrentUser(user);
    setIsUpdateModalOpen(true);
  };

  // Hàm update user (fake demo)
  const handleUpdateUser = () => {
    if (!currentUser) return;

    // Gọi dispatch updateUser
    dispatch(updateUser(currentUser._id, {
      name: currentUser.name,
      email: currentUser.email,
      role: currentUser.role,
    })).then(() => {
      setIsUpdateModalOpen(false);
    });
  };

  // Xử lý xóa
  const handleDelete = () => {
    dispatch(deleteUser(deleteId));
    setIsConfirmOpen(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Đang tải danh sách người dùng...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">Lỗi: {error}</p>
      </div>
    );
  }

  return (
    <div className="dashboard flex">
      <SideBar />
      <div className="flex-1 p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-700">ALL USERS</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">User ID</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Avatar</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{`${user._id.slice(0, 10)}...`}</td>
                  <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-700">
                    <img
                      className="w-10 h-10 rounded-full object-cover border border-gray-300"
                      src={user.avatar?.url || "/default-avatar.png"}
                      alt="Avatar"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.name}</td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${user.role === "admin" ? "text-green-600" : "text-red-600"
                      }`}
                  >
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-3">
                    <button
                      onClick={() => openUpdateModal(user)}
                      className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      onClick={() => {
                        setDeleteId(user._id);
                        setIsConfirmOpen(true);
                      }}
                      className="text-red-600 hover:text-red-800 transition cursor-pointer"
                      disabled={user.role === "admin"}
                    >
                      {user.role === "admin" ? "" : <FiTrash size={18} />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal update user */}
      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Cập nhật User</h2>
        <label className="block mb-2">Tên</label>
        <input
          type="text"
          value={currentUser?.name || ""}
          onChange={(e) => setCurrentUser({ ...currentUser!, name: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-3"
        />

        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={currentUser?.email || ""}
          onChange={(e) => setCurrentUser({ ...currentUser!, email: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-3"
        />

        <label className="block mb-2">Role</label>
        <select
          value={currentUser?.role || ""}
          onChange={(e) => setCurrentUser({ ...currentUser!, role: e.target.value })}
          className="w-full px-3 py-2 border rounded mb-4"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <div className="flex justify-end space-x-3">
          <button
            onClick={() => setIsUpdateModalOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={handleUpdateUser}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Lưu
          </button>
        </div>
      </Modal>

      {/* Modal confirm xóa */}
      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Xác nhận xóa</h2>
        <p>Bạn có chắc chắn muốn xóa người dùng này?</p>
        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={() => setIsConfirmOpen(false)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Hủy
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Xóa
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default UsersList;
