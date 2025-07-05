import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import SideBar from "./Sidebar";
import axiosClient from "../../utils/axiosClient";

interface Product {
  _id: string;
  name: string;
  Stock: number;
  price: number;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [sortField, setSortField] = useState<keyof Product | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const deleteProductHandler = (id: string) => {
    alert(`Bạn đã xóa sản phẩm có ID: ${id}`);
    // TODO: Gọi API xóa thật nếu muốn
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get( `/admin/products`);
        setProducts(res.data.products);
      } catch (err: any) {
        setError(err.response?.data?.message || "Có lỗi xảy ra");
      }
    };

    fetchProducts();
  }, []);

  // Xử lý sort
  const handleSort = (field: keyof Product) => {
    const order = field === sortField && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (!sortField) return 0;
    if (typeof a[sortField] === "string") {
      return sortOrder === "asc"
        ? (a[sortField] as string).localeCompare(b[sortField] as string)
        : (b[sortField] as string).localeCompare(a[sortField] as string);
    }
    if (typeof a[sortField] === "number") {
      return sortOrder === "asc"
        ? (a[sortField] as number) - (b[sortField] as number)
        : (b[sortField] as number) - (a[sortField] as number);
    }
    return 0;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <Fragment>
      <div className="dashboard flex flex-col md:flex-row">
        <SideBar />
        <div className="flex-1 p-6 bg-gray-50 min-h-screen">
          <h1 className="text-2xl text-center font-bold mb-6 text-gray-700">
            ALL PRODUCTS
          </h1>
          {error && <p className="text-red-500">{error}</p>}

          <div className="w-full overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th
                    onClick={() => handleSort("_id")}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                  >
                    Product ID {sortField === "_id" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    onClick={() => handleSort("name")}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                  >
                    Name {sortField === "name" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    onClick={() => handleSort("Stock")}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                  >
                    Stock {sortField === "Stock" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th
                    onClick={() => handleSort("price")}
                    className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider cursor-pointer whitespace-nowrap"
                  >
                    Price {sortField === "price" && (sortOrder === "asc" ? "▲" : "▼")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item._id.length > 15 ? `${item._id.slice(0, 10)}...` : item._id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.name.length > 30 ? `${item.name.slice(0, 30)}...` : item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{item.Stock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">${item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 flex space-x-3">
                      <Link to={`/admin/product/${item._id}`} className="text-blue-600 hover:text-blue-800 transition">
                        <FiEdit size={18} />
                      </Link>
                      <button onClick={() => deleteProductHandler(item._id)} className="text-red-600 hover:text-red-800 transition">
                        <FiTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-white text-gray-700"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
