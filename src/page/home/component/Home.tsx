import { NavHome } from ".."
import Products from "../../products"
import Filter from "./Filter/Filter"

const Home = () => {
    return (
        <div className="bg-gray-100">
            <div className="mx-auto flex max-w-[1300px]  p-4">
                <div className="max-w-[300px] hidden md:block"><Filter /></div>
                <div className="max-w-[1000px] min-h-[800px] mx-auto">
                    <div className="px-4"><NavHome /></div>
                    <Products />
                </div>
            </div>
        </div>
    )
}

export default Home
