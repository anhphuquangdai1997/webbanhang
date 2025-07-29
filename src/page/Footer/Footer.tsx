import playStore from "../../assets/playstore.png";
import appStore from "../../assets/Appstore.png";

const Footer = () => {
    return (
        <footer className="p-[1vmax] bg-[#222121] text-white flex items-center justify-between flex-wrap">
            <div className="w-1/5 flex flex-col items-center">
                <h4 className="font-['Roboto'] text-[1vmax]">DOWNLOAD OUR APP</h4>
                <p className="text-center text-[1.2vmax] font-[Lucida_Sans]">
                    Download App for Android and IOS mobile phone
                </p>
                <img src={playStore} alt="playstore" className="w-[10vmax] my-[1vmax] cursor-pointer" />
                <img src={appStore} alt="Appstore" className="w-[10vmax] my-[1vmax] cursor-pointer" />
            </div>

            <div className="w-3/5 text-center">
                <h1 className="text-[4vmax] font-['Roboto'] text-[#eb4034]">Shop Mobile</h1>
                <p className="max-w-[60%] mx-auto my-[1vmax] font-[Gill_Sans]">Địa chỉ: 57a Hoàng Hữu Nam Q9 Tp.HCM</p>
                <p className="max-w-[60%] mx-auto my-[1vmax] font-[Gill_Sans]">SDT: 0382520045</p>
                <p className="max-w-[60%] mx-auto my-[1vmax] font-[Gill_Sans]">Email: daiphu094@gmail.com</p>
            </div>
            
            <div className="w-1/5 flex flex-col items-center">
                <h4 className="font-['Roboto'] text-[1.4vmax] underline">Follow Us</h4>
                <a
                    href="https://studio.youtube.com/channel/UCvY_g_NxZc4tEq2DElQv_ZQ"
                    className="no-underline text-[1.3vmax] font-[Gill_Sans] text-white transition-all duration-500 hover:text-[#eb4034] my-[0.5vmax]"
                >
                    Instagram
                </a>
                <a
                    href="https://studio.youtube.com/channel/UCvY_g_NxZc4tEq2DElQv_ZQ"
                    className="no-underline text-[1.3vmax] font-[Gill_Sans] text-white transition-all duration-500 hover:text-[#eb4034] my-[0.5vmax]"
                >
                    Youtube
                </a>
                <a
                    href="https://studio.youtube.com/channel/UCvY_g_NxZc4tEq2DElQv_ZQ"
                    className="no-underline text-[1.3vmax] font-[Gill_Sans] text-white transition-all duration-500 hover:text-[#eb4034] my-[0.5vmax]"
                >
                    Facebook
                </a>
            </div>
        </footer>
    )
}

export default Footer
