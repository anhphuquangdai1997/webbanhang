import { NavHome } from ".."
import TabMobile from "../../../components/layout/TabMobile"
import Footer from "../../Footer/Footer"
import Products from "../../products"
import Filter from "./Filter/Filter"

const Home = () => {
    return (
        <div className="bg-gray-100">
            <div className="mx-auto flex max-w-[1300px]  p-4">
                <div className="max-w-[300px] hidden md:block"><Filter /></div>
                <div className="max-w-[1000px] min-h-[800px] mx-auto">
                    <div><NavHome /></div>
                    <Products />
                </div>
            </div>
            <div className="hidden md:block">
                <Footer/>
            </div>
            <div className="block md:hidden fixed bottom-0 w-full z-50">
                <TabMobile/>
            </div>
        </div>
    )
}

export default Home
