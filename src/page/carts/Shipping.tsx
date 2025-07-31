import { Fragment, useEffect, useState } from "react";
import MetaData from "../../components/layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import { useNavigate } from "react-router-dom";
import { FaHome, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { saveShipping } from "../../redux/actions/cartActions";

const Shipping: React.FC = () => {
    const dispatch = useAppDispatch();
    const { shippingInfo } = useAppSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingInfo?.address || "");
    const [provinceCode, setProvinceCode] = useState("");
    const [districtCode, setDistrictCode] = useState("");
    const [wardName, setWardName] = useState("");
    const [postalCode, setPostalCode] = useState(shippingInfo?.postalCode || "");
    const [phonreNo, setPhonreNo] = useState(shippingInfo?.phonreNo || "");

    type Province = { code: number; name: string };
    type Ditrict = { code: number; name: string };
    const [provinces, setProvinces] = useState<Province[]>([]);
    const [districts, setDistricts] = useState<Ditrict[]>([]);
    const [wards, setWards] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/p/")
            .then(res => res.json())
            .then(data => setProvinces(data));
    }, []);

    useEffect(() => {
        if (provinceCode) {
            fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
                .then(res => res.json())
                .then(data => setDistricts(data.districts));
        }
    }, [provinceCode]);

    useEffect(() => {
        if (districtCode) {
            fetch(`https://provinces.open-api.vn/api/d/${districtCode}?depth=2`)
                .then(res => res.json())
                .then(data => setWards(data.wards));
        }
    }, [districtCode]);

    const shippingSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (!/^0[0-9]{9}$/.test(phonreNo)) {
            alert("Số điện thoại không hợp lệ. Vui lòng nhập đúng 10 chữ số bắt đầu bằng số 0.");
            return;
        }

        const selectedProvince = provinces.find((p: any) => p.code === +provinceCode)?.name || "";
        const selectedDistrict = districts.find((d: any) => d.code === +districtCode)?.name || "";
        const fullAddress = `${address}, ${wardName}, ${selectedDistrict}, ${selectedProvince}`;

        dispatch(saveShipping({
            address: fullAddress,
            state: selectedDistrict,
            city: wardName,
            postalCode,
            phonreNo,
            country: selectedProvince
        }));

        navigate("/order/confirm");
    };

    return (
        <Fragment>
            <MetaData title="Shipping" />
            <CheckoutSteps progress={5} />
            <div className="max-w-xl mx-auto px-4 py-6 mt-2">
                <div className="relative flex items-center justify-center h-12 border-b border-gray-300 bg-white">
                    <h2 className="font-semibold text-gray-600 text-md">Thông tin</h2>
                </div>
                <form onSubmit={shippingSubmit} className="space-y-4 mt-6">

                    <div className="flex items-center border-none rounded px-3 py-2">
                        <FaHome className="text-gray-500 mr-3" />
                        <select
                            value={provinceCode}
                            onChange={(e) => setProvinceCode(e.target.value)}
                            required
                            className="flex-1 outline-none rounded-lg bg-transparent"
                        >
                            <option value="">Chọn Tỉnh/Thành phố</option>
                            {provinces.map((item: any) => (
                                <option key={item.code} value={item.code}>{item.name}</option>
                            ))}
                        </select>
                    </div>

                    {provinceCode && (
                        <div className="flex items-center border-none rounded px-3 py-2">
                            <FaHome className="text-gray-500 mr-3" />
                            <select
                                value={districtCode}
                                onChange={(e) => setDistrictCode(e.target.value)}
                                required
                                className="flex-1 outline-none rounded-lg bg-transparent"
                            >
                                <option value="">Chọn Quận/Huyện</option>
                                {districts.map((item: any) => (
                                    <option key={item.code} value={item.code}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {districtCode && (
                        <div className="flex items-center border-none rounded px-3 py-2">
                            <FaHome className="text-gray-500 mr-3" />
                            <select
                                value={wardName}
                                onChange={(e) => setWardName(e.target.value)}
                                required
                                className="flex-1 outline-none rounded-lg bg-transparent"
                            >
                                <option value="">Chọn Phường/Xã</option>
                                {wards.map((item: any) => (
                                    <option key={item.code} value={item.name}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="flex items-center border-none rounded px-3 py-2">
                        <FaHome className="text-gray-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Số nhà, đường..."
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="flex-1 outline-none rounded-lg bg-transparent"
                        />
                    </div>

                    <div className="flex items-center border-none rounded px-3 py-2">
                        <FaMapMarkerAlt className="text-gray-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Mã bưu điện"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            required
                            className="flex-1 outline-none rounded-lg bg-transparent"
                        />
                    </div>

                    <div className="flex items-center border-none rounded px-3 py-2">
                        <FaPhone className="text-gray-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Số điện thoại"
                            value={phonreNo}
                            onChange={(e) => setPhonreNo(e.target.value)}
                            required
                            className="flex-1 outline-none rounded-lg bg-transparent"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition translate-0.5"
                    >
                        Tiếp tục
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

export default Shipping;
