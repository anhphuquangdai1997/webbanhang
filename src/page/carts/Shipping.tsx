import { Fragment } from "react/jsx-runtime";
import MetaData from "../../components/layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import MenuBar from "../../components/layout/MenuBar";
import { FaBuilding, FaGlobe, FaHome, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useState } from "react";


const Shipping:React.FC = () => {
    const [address, setAddress] = useState('');
    const [ward, setWard] = useState('');
    const [pinCode, setPinCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');

    const navigate = useNavigate()
    const shippingSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        navigate('/order/confirm');
    }
    return (
        <Fragment>
            <MetaData title="Shipping" />
            <CheckoutSteps progress={10} />
            <div className="max-w-xl mx-auto px-4 py-6 mt-2">
                <MenuBar title="Thông Tin" />
                <form onSubmit={shippingSubmit} className="space-y-4 mt-6">
                    <div className="flex items-center border-none rounded px-3 py-2">
                        <FaGlobe className="text-gray-500 mr-3" />
                        <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                            className="flex-1 outline-none rounded-lg bg-transparent"
                        >
                            <option value="">Country</option>
                            <option value="Vietnam">Vietnam</option>
                            <option value="USA">USA</option>
                            <option value="Japan">Japan</option>
                        </select>
                    </div>
                    <div className="flex items-center border-none rounded px-3 py-2">
                        <FaHome className="text-gray-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="flex-1 outline-none rounded-lg bg-transparent"
                        />
                    </div>
                    <div className="flex items-center border-none rounded px-3 py-2">
                        <FaBuilding className="text-gray-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Ward"
                            value={ward}
                            onChange={(e) => setWard(e.target.value)}
                            required
                            className="flex-1 outline-none rounded-lg bg-transparent"
                        />
                    </div>
                    <div className="flex items-center border-none rounded px-3 py-2">
                        <FaMapMarkerAlt className="text-gray-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Pin Code"
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                            required
                            className="flex-1 outline-none rounded-lg bg-transparent"
                        />
                    </div>
                    <div className="flex items-center border-none rounded px-3 py-2">
                        <FaPhone className="text-gray-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            className="flex-1 outline-none rounded-lg bg-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition"
                    >
                        Continue
                    </button>
                </form>
            </div>
        </Fragment>
    )
}
export default Shipping;