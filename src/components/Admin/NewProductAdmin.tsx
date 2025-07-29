import { Fragment } from "react/jsx-runtime";
import Sidebar from "./Sidebar"
import MetaData from "../layout/MetaData";

const NewProductAdmin: React.FC = () => {
    return (
        <Fragment>
            <MetaData title="Create Product" />
            <div className="flex">
                <Sidebar />
                <div className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center p-8">
                    <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                        <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Tạo sản phẩm</h1>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Tên sản phẩm"
                                required
                                className="w-full px-4 py-2 border-none bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="number"
                                placeholder="Giá sản phẩm"
                                required
                                className="w-full px-4 py-2 border-none bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <textarea
                                placeholder="Mô tả sản phẩm"
                                required
                                maxLength={500}
                                minLength={20}
                                rows={2}
                                className="w-full px-4 py-2 border-none bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <input
                                type="number"
                                placeholder="Tồn kho"
                                required
                                className="w-full px-4 py-2 border-none bg-gray-100 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="w-full"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}
export default NewProductAdmin;