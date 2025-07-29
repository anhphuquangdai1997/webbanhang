import { Fragment } from "react/jsx-runtime";
import MetaData from "../../components/layout/MetaData";
import MenuBar from "../../components/layout/MenuBar";
import CheckoutSteps from "./CheckoutSteps";

const Payment: React.FC = () => {
    return (
        <Fragment>
            <MetaData title="Payment" />
            <CheckoutSteps progress={100} />
            <div className="max-w-5xl mx-auto">
                <MenuBar title="Thanh toán" />
                <div className="flex">
                    <div className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center p-8">
                        <form className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                            <h1 className="text-2xl font-bold text-gray-700 mb-6 text-center">Thanh toán</h1>
                            
                            <button type="submit" className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300 font-semibold">
                                Xác nhận thanh toán
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default Payment;