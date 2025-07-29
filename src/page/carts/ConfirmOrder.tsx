import { Fragment } from "react/jsx-runtime";
import MetaData from "../../components/layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import MenuBar from "../../components/layout/MenuBar";
import { useNavigate } from "react-router-dom";

const ConfirmOrder: React.FC = () => {
    const navigate = useNavigate()
    const shippingSubmit = () => {
        navigate('/order/payment')
    }
    return (
        <Fragment>
            <MetaData title="Confirm" />
            <CheckoutSteps progress={50} />
            <div className="max-w-5xl mx-auto">
                <MenuBar title="xác nhận" />
                <div className="flex">
                    <div className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center p-8">
                        <button onClick={shippingSubmit} className="bg-gray-300 rounded p-2 flex mx-auto">xác nhận</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}
export default ConfirmOrder;