import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import SideBar from "./Sidebar";
import axiosClient from "../../utils/axiosClient";

interface Order {
  _id: string;
  orderStatus: string;
  orderItems: any[];
  totalPrice: number;
}

const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const { data } = await axiosClient.get("/admin/orders");
      setOrders(data.orders);
      setLoading(false);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch orders");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrderHandler = (id: string) => {
    alert(`Bạn đã xóa đơn hàng với ID: ${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <Fragment>
      <div className="dashboard flex">
        <SideBar />
        <div className="flex-1 p-6 bg-gray-50 min-h-screen">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">ALL ORDERS</h1>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Items Qty</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order._id.length > 10 ? `${order._id.slice(0, 10)}...` : order._id}</td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${order.orderStatus === "Delivered"
                          ? "text-green-600"
                          : order.orderStatus === "Processing"
                            ? "text-red-600"
                            : order.orderStatus === "Shipped"
                              ? "text-blue-600"
                              : "text-gray-600"
                        }`}
                    >
                      {order.orderStatus}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{order.orderItems.length}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${order.totalPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-3">
                      <Link
                        to={`/admin/order/${order._id}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        <FiEdit size={18} />
                      </Link>
                      <button
                        onClick={() => deleteOrderHandler(order._id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <FiTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderList;
