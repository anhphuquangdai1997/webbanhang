import { useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

interface Product {
  id: number;
  name: string;
  Stock: number;
}

interface Order {
  id: number;
  totalPrice: number;
  status: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - Admin Panel";
  }, []);

  const products: Product[] = [
    { id: 1, name: "iPhone 14", Stock: 5 },
    { id: 2, name: "Samsung Galaxy S23", Stock: 0 },
    { id: 3, name: "MacBook Pro", Stock: 3 },
    { id: 4, name: "AirPods Pro", Stock: 0 },
    { id: 5, name: "iPad Air", Stock: 7 },
    { id: 6, name: "Dell XPS 13", Stock: 2 },
    { id: 7, name: "Sony WH-1000XM4", Stock: 0 },
    { id: 8, name: "Nintendo Switch", Stock: 4 },
  ];

  const orders: Order[] = [
    { id: 1, totalPrice: 999, status: "Delivered" },
    { id: 2, totalPrice: 1299, status: "Processing" },
    { id: 3, totalPrice: 499, status: "Delivered" },
    { id: 4, totalPrice: 799, status: "Shipped" },
    { id: 5, totalPrice: 1599, status: "Delivered" },
    { id: 6, totalPrice: 299, status: "Processing" },
    { id: 7, totalPrice: 899, status: "Delivered" },
    { id: 8, totalPrice: 399, status: "Shipped" },
    { id: 9, totalPrice: 1199, status: "Delivered" },
    { id: 10, totalPrice: 599, status: "Processing" },
  ];

  const users: User[] = [
    { id: 1, name: "Nguyễn Văn A", email: "a@gmail.com" },
    { id: 2, name: "Trần Thị B", email: "b@gmail.com" },
    { id: 3, name: "Lê Văn C", email: "c@gmail.com" },
    { id: 4, name: "Phạm Thị D", email: "d@gmail.com" },
    { id: 5, name: "Hoàng Văn E", email: "e@gmail.com" },
    { id: 6, name: "Vũ Thị F", email: "f@gmail.com" },
    { id: 7, name: "Đỗ Văn G", email: "g@gmail.com" },
    { id: 8, name: "Bùi Thị H", email: "h@gmail.com" },
    { id: 9, name: "Đinh Văn I", email: "i@gmail.com" },
    { id: 10, name: "Mai Thị K", email: "k@gmail.com" },
    { id: 11, name: "Chu Văn L", email: "l@gmail.com" },
    { id: 12, name: "Dương Thị M", email: "m@gmail.com" },
  ];

  const data = [8, 16, 12, 24, 32, 30, 28];
  const months = ["Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6", "Tháng 7"];

  const outOfStock = products.filter((item) => item.Stock === 0).length;
  const totalAmount = orders.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <>
      <div className="w-screen max-w-full grid grid-cols-1 lg:grid-cols-6 absolute">
        <div className="sticky top-0 h-screen ">
          <Sidebar />
        </div>
        <div className="lg:col-span-5 border-l border-gray-200 bg-white py-12">
          <h1 className="text-gray-700 font-light text-3xl text-center w-1/2 p-6 mx-auto">Dashboard</h1>

          {/* Tổng doanh thu */}
          <div className="flex bg-white justify-center">
            <p className="bg-blue-600 text-white font-light text-xl text-center p-6 w-full mx-8">
              Tổng Cộng <br /> ${totalAmount.toLocaleString("en-US")}
            </p>
          </div>

          {/* Tóm tắt */}
          <div className="flex justify-center items-center flex-wrap mt-8">
            <Link
              to="/admin/products"
              className="font-light text-2xl text-center no-underline p-6 w-32 h-32 m-4 rounded-full flex justify-center items-center flex-col bg-red-400 text-white hover:bg-red-500 transition-colors duration-300"
            >
              <p>Product</p>
              <p>{products.length}</p>
            </Link>

            <Link
              to="/admin/orders"
              className="text-black font-light text-2xl text-center bg-yellow-200 no-underline p-6 w-32 h-32 m-4 rounded-full flex justify-center items-center flex-col hover:bg-yellow-300 transition-colors duration-300"
            >
              <p>Orders</p>
              <p>{orders.length}</p>
            </Link>

            <Link
              to="/admin/users"
              className="font-light text-2xl text-center no-underline p-6 w-32 h-32 m-4 rounded-full flex justify-center items-center flex-col bg-gray-800 text-white hover:bg-gray-900 transition-colors duration-300"
            >
              <p>Users</p>
              <p>{users.length}</p>
            </Link>
          </div>

          {/* Biểu đồ doanh thu */}
          <div className="w-4/5 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-lg shadow-lg mt-10">
            <h3 className="text-white text-xl font-semibold mb-4">Doanh Thu</h3>
            <div className="bg-white p-4 rounded">
              <div className="flex justify-between items-end h-40">
                {data.map((height, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="bg-blue-500 w-8 rounded transition-all duration-500"
                      style={{ height: `${height * 4}px` }}
                    ></div>
                    <span className="mt-2 text-sm text-gray-600">{months[index]}</span>
                  </div>
                ))}
              </div>
              <div className="text-center mt-4">
                <span className="text-lg font-bold text-gray-800">
                  Tổng: ${totalAmount.toLocaleString("en-US")}
                </span>
              </div>
            </div>
          </div>

          {/* Biểu đồ tròn */}
          <div className="w-80 mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-gray-800 text-xl font-semibold mb-4 text-center">Tình Trạng Kho</h3>
            <div className="flex justify-center">
              <div className="relative w-48 h-48">
                <div className="w-full h-full border-8 border-cyan-500 rounded-full relative transition-all duration-500">
                  <div
                    className="absolute top-0 right-0 w-full h-full border-8 border-purple-600 rounded-full"
                    style={{
                      clipPath: `polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 0% 100%, 0% ${(outOfStock / products.length) * 100}%)`,
                    }}
                  ></div>
                  <div className="absolute inset-8 bg-white rounded-full flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-800">{products.length}</div>
                      <div className="text-sm text-gray-600">Sản phẩm</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-cyan-500 rounded mr-2"></div>
                <span className="text-sm">Còn Hàng: {products.length - outOfStock}</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-600 rounded mr-2"></div>
                <span className="text-sm">Hết Hàng: {outOfStock}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
