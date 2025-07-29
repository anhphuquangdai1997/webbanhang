import { Fragment } from "react/jsx-runtime";
import MetaData from "../../components/layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import MenuBar from "../../components/layout/MenuBar";

const Shipping = () => {
    const navigate=useNavigate()
    const shippingSubmit=()=>{
        navigate('/order/confirm')
    }
    return (
        <Fragment>
            <MetaData title="Shipping"/>
            <CheckoutSteps progress={5} />
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
export default Shipping;